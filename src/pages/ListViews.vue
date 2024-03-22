<script setup lang="ts">
import { useRoute } from 'vue-router'
import { defineAsyncComponent, ref, watch } from 'vue'
import api from '../api/main.ts'

const DrinkCard = defineAsyncComponent(
  () => import('../components/DrinkCard.vue'),
)

const route = useRoute()

const type = ref() //Current list type [Categories, Glasses, Ingredients]
const typeList = ref()
const selectedType = ref('Click on an option to start')
const drinks = ref()

const asideVisible = ref(false)
const cardsLoaded = ref(false)

watch(
  () => route.params.listType,
  async (newType) => {
    asideVisible.value = false
    await loadList(newType.toString())
    type.value = newType
    asideVisible.value = true
  },
  { immediate: true },
)

/**
 * Returns the organized (alphabetically) items provided from the API response of the current list type
 * @param type - The list type to be used
 * @returns void
 */
async function loadList(type: String): Promise<void> {
  const res: Array<object> = await api.methods.list(type)
  typeList.value = res
    .map((item) => {
      return Object.values(item).join()
    })
    .sort()
}

async function fetchDrinksByType(type: String, query: string): Promise<void> {
  cardsLoaded.value = false
  const res: Array<object> = await api.methods.filter(type.charAt(0), query)
  drinks.value = res
  selectedType.value = query
  cardsLoaded.value = true
}
</script>

<template>
  <div class="wrapper">
    <Transition>
      <aside v-show="asideVisible">
        <div class="list-container">
          <h1>{{ type }}</h1>
          <div class="list-container__items">
            <button
              v-for="item in typeList"
              @click="fetchDrinksByType(type, item)"
            >
              {{ item }}
            </button>
          </div>
        </div>
      </aside>
    </Transition>
    <section class="cards-area">
      <Transition>
        <h1 v-if="asideVisible">{{ selectedType }}</h1>
      </Transition>
      <Transition name="fadeUp">
        <Suspense>
          <div class="cards-area__content" v-if="cardsLoaded">
            <DrinkCard
              v-for="drink in drinks"
              :key="drink.idDrink"
              :drink="drink"
              :from-list="true"
            />
          </div>
        </Suspense>
      </Transition>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/variables';

* {
  margin: 0;
  padding: 0;
  color: $white;
}

.wrapper {
  display: grid;
  grid-template-areas: 'aside cards';
  grid-template-columns: 400px 1fr;

  .cards-area {
    grid-area: cards;
    width: 100%;

    h1 {
      text-align: center;
    }

    &__content {
      margin-top: 3em;

      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(425px, 1fr));
      row-gap: 2em;
      place-items: center;
    }
  }

  aside {
    grid-area: aside;
    position: sticky;

    .list-container {
      width: 400px;

      background-color: $secondary;

      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.3em;

      border-radius: 10px;

      padding: 1em;
      box-sizing: border-box;

      h1 {
        text-transform: capitalize;

        margin: 0.3em 0;
      }

      &__items {
        display: flex;
        flex-direction: column;
        gap: 0.4em;

        width: 340px;
        max-height: 700px;
        overflow-y: scroll;

        button {
          height: 60px;

          color: $white;

          display: flex;
          align-items: center;

          font-size: 1.8rem;
          text-align: left;

          background: none;

          padding: 0.3em 0 0.3em 0.4em;
          margin-right: 0.3em;

          &:hover {
            color: $primary;
            background: $green;

            padding-left: 0.6em;
          }

          transition:
            background-color 0.5s ease,
            color 0.3s ease,
            padding-left 0.5s ease;
        }
      }
    }
  }
}

@media (max-width: 64em) {
  .wrapper {
    justify-content: center;

    grid-template-columns: 300px 1fr;

    aside {
      .list-container {
        width: 100%;

        &__items {
          width: 100%;
          max-height: 300px;
        }
      }
    }
  }
}

@media (max-width: 48em) {
  .wrapper {
    grid-template-areas:
      'aside'
      'cards';

    justify-content: center;

    grid-template-columns: auto;

    aside {
      width: 100%;
    }

    .cards-area {
      margin-top: 1em;
      &__content {
        justify-content: center;
      }
    }
  }
}

@media (max-width: 35em) {
  .wrapper {
    grid-template-columns: 350px;
  }
}

.fadeUp-enter-from {
  opacity: 0;
  transform: translateY(100px);
}

.fadeUp-enter-to {
  transition:
    opacity 1s ease,
    transform 0.6s ease;
}

.fadeUp-leave-from,
.fadeUp-leave-to {
  transform: translateY(-50px);
  opacity: 0;
  transition:
    opacity 1s ease,
    transform 0.6s ease;
}
</style>
