<script setup lang="ts">
import api from '../api/main.ts'
import { onBeforeMount, ref } from 'vue'

const props = defineProps(['drinkID'])
const loaded = ref(false)
const drink = ref()

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
    instructions: [
      data.strInstructions,
      data.strInstructionsES,
      data.strInstructionsDE,
      data.strInstructionsFR,
      data.strInstructionsIT,
      data.strInstructionsZH,
    ],
  }
}

onBeforeMount(async () => {
  const res = await api.methods.lookup(props.drinkID)
  console.log(organizeData(res))
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
        <section class="instructions"></section>
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
  padding: 3em 1em;

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
            color: $blue;
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
