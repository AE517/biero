<script setup lang="ts">
import api from '../api/main.ts'
import { onBeforeMount, ref } from 'vue'

const props = defineProps(['drinkID'])
const loaded = ref(false)
const drink = ref()
const drinkInstructions = ref([])

/**
 * Organizes all data received from the lookup method from API and returns it as a new object
 *
 * @param data - all data received from the API response
 * @returns object contained all organized data
 */

function organizeData(data): Object {
  const drinkRequirements: Array<Object> = Array.from(
    { length: 20 },
    (_, i) => ({
      ingredient: data[`strIngredient${i + 1}`] ?? null,
      measurement: data[`strMeasure${i + 1}`] ?? null,
    }),
  )

  return {
    name: data.strDrink,
    image: data.strDrinkThumb,
    category: data.strCategory,
    alcoholic: data.strAlcoholic,
    glass: data.strGlass,
    iba: data.strIBA,
    tags:
      data.strTags !== undefined && data.strTags !== null
        ? data.strTags.split(',')
        : null,
    requirements: drinkRequirements.filter(
      (item) => item.ingredient !== null && item.ingredient !== '',
    ),
    instructions: {
      EN: data.strInstructions,
      ES: data.strInstructionsES,
      DE: data.strInstructionsDE,
      FR: data.strInstructionsFR,
      IT: data.strInstructionsIT,
      ZH: data.strInstructionsZH,
    },
  }
}

function displayInstructions(language: string) {
  let organizedInstructions
  switch (language) {
    case 'ES':
      organizedInstructions = drink.value.instructions.ES
      break
    case 'DE':
      organizedInstructions = drink.value.instructions.DE
      break
    case 'FR':
      organizedInstructions = drink.value.instructions.FR
      break
    case 'IT':
      organizedInstructions = drink.value.instructions.IT
      break
    case 'ZH':
      organizedInstructions = drink.value.instructions.ZH
      break
    default:
      organizedInstructions = drink.value.instructions.EN
      break
  }

  drinkInstructions.value = organizedInstructions.split('\r\n')
}

onBeforeMount(async () => {
  const res = await api.methods.lookup(props.drinkID)
  drink.value = organizeData(res)
  loaded.value = true
})
</script>

<template>
  <div>
    <Transition name="fadeUp">
      <div class="wrapper" v-if="loaded">
        <section class="presentation">
          <div class="presentation__content">
            <div class="drink-name">
              <h1>{{ drink.name }}</h1>
              <h2>
                {{ drink.iba }} |
                <span> {{ drink.alcoholic }} </span>
              </h2>
            </div>
            <div class="drink-details">
              <h3>{{ drink.category }}</h3>
              <h3>{{ drink.glass }}</h3>
            </div>
            <div class="drink-tags">
              <ul>
                <li v-for="tag in drink.tags">
                  <p :class="{ alcoholic: tag.includes('Alcoholic') }">
                    {{ tag }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="presentation__image">
            <figure>
              <img
                :src="drink.image"
                :alt="drink.name"
                width="550"
                height="550"
                loading="lazy"
              />
            </figure>
          </div>
        </section>
        <section class="ingredients">
          <h1>INGREDIENTS</h1>
          <div class="ingredients__details">
            <ul>
              <li v-for="requirement in drink.requirements">
                <p>
                  {{ requirement.ingredient
                  }}<span v-if="requirement.measurement !== null">
                    | {{ requirement.measurement }}</span
                  >
                </p>
              </li>
            </ul>
          </div>
        </section>
        <section class="instructions">
          <h1>INSTRUCTIONS</h1>
          <div class="language-options">
            <div class="item" v-for="key in Object.keys(drink.instructions)">
              <input
                type="radio"
                name="rd-language"
                :value="key"
                :id="key"
                :disabled="drink.instructions[`${key}`] == null"
                @input="displayInstructions(key)"
              />
              <label :for="key">
                {{ key }}
              </label>
            </div>
          </div>
          <div class="text-container">
            <p v-for="instruction in drinkInstructions">
              {{ instruction }}
            </p>
            <br />
          </div>
        </section>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
@import '../styles/variables';
* {
  color: $white;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
}

.wrapper {
  padding: 3em;

  display: grid;
  grid-template-areas:
    'presentation'
    'ingredients'
    'instructions';

  align-content: center;

  row-gap: 5em;
}

.presentation {
  grid-area: presentation;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: left;

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .drink-name {
      h1 {
        font-size: 6rem;
      }

      h2 {
        font-size: 2rem;
        opacity: 75%;

        span {
          font-style: italic;
        }
      }
    }

    .drink-details {
      h3 {
        font-size: 3rem;
        font-style: italic;
        opacity: 75%;
      }
    }

    .drink-tags {
      ul {
        list-style: none;
        display: flex;
        gap: 1em;
        li {
          p {
            font-size: 1.5rem;
            color: $primary;
            background-color: $green;

            padding: 0.5em;
            border-radius: 10px;
          }
        }
      }
    }
  }

  &__image {
    figure {
      border-radius: 30px;
      overflow: hidden;
      img {
        max-width: 100%;
        height: auto;
        border-radius: inherit;
      }
    }
  }
}

.ingredients {
  grid-area: ingredients;

  display: flex;
  flex-direction: column;
  gap: 2em;

  h1 {
    text-align: center;
    font-size: 5rem;
  }

  ul {
    li {
      text-align: left;
      font-size: 3rem;

      p {
        span {
          opacity: 45%;
        }
      }
    }
  }
}

.instructions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3em;
  h1 {
    text-align: center;
    font-size: 5em;
  }

  .language-options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 2em;

    border-radius: 5px;
    .item {
      text-align: center;

      input[type='radio'] {
        visibility: hidden;
        width: 0;
        height: 0;

        &:checked + label {
          color: $primary;
          background-color: $green;

          transition: all 0.4s ease;
        }

        &:disabled + label {
          cursor: default;
          opacity: 50%;
        }
      }

      label {
        border-radius: 5px;

        background-color: $secondary;
        color: $green;

        padding: 0.5em 1em;
        cursor: pointer;
        font-size: 2rem;
        transition: all 0.4s ease;

        &.unavailable {
          cursor: default;
        }
      }
    }
  }

  .text-container {
    margin-top: 3em;

    border-left: 3px solid $white;
    width: 100%;

    p {
      text-align: left;
      margin: 0 1em;
      font-size: 2.5rem;
      text-wrap: wrap;

      &:not(:first-of-type) {
        margin-top: 1em;
      }
    }
  }
}

@media (max-width: 64em) {
  .wrapper {
    justify-content: center;
  }
}

@media (max-width: 48em) {
  .wrapper {
    padding: 1.5em;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    justify-content: center;
  }

  .presentation {
    flex-direction: column;
    align-items: center;
    row-gap: 1em;

    &__content {
      width: 100%;
      .drink-name {
        text-align: center;
        h1 {
          font-size: 3.5rem;
        }

        h2 {
          margin-top: 1em;
          font-size: 2.5rem;
        }
      }

      .drink-details {
        margin-top: 1em;
        text-align: center;
        h3 {
          font-size: 2rem;
        }
      }

      .drink-tags {
        margin-top: 1.5em;

        ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          li > p {
            border-radius: 5px;
            font-size: 1em;
          }
        }
      }
    }

    &__image {
      margin-top: 1em;
      figure {
        border-radius: 15px;
      }
    }
  }

  .ingredients {
    h1 {
      font-size: 3rem;
    }

    &__details {
      ul > li {
        text-align: left;
        font-size: 2rem;
      }
    }
  }

  .instructions {
    h1 {
      font-size: 3rem;
    }

    .language-options {
      flex-wrap: wrap;
      .item > label {
        padding: 0.3em 0.7em;
        font-size: 1.7rem;
      }
    }

    .text-container {
      p {
        font-size: 1.5rem;
      }
    }
  }
}

.fadeUp-enter-active,
fadeUp-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.fadeUp-enter-from,
.fadeUp-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
</style>
