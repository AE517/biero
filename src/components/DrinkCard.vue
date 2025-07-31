<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'

const props = defineProps(['drink', 'fromList'])
const data = ref()

function validadeData() {
  return {
    id: props.drink.idDrink,
    name: props.drink.strDrink,
    image: props.drink.strDrinkThumb,
    category:
      props.drink.strCategory !== undefined ? props.drink.strCategory : null,
    glass: props.drink.strGlass !== undefined ? props.drink.strGlass : null,
    tags:
      props.drink.strTags !== undefined && props.drink.strTags !== null
        ? props.drink.strTags.split(',')
        : '',
    alcoholic:
      props.drink.strAlcoholic !== undefined ? props.drink.strAlcoholic : null,
  }
}

onBeforeMount(() => {
  data.value = validadeData()
})
</script>

<template>
  <div>
    <router-link :to="`/drinks/${data.id}`">
      <div class="card" :class="{ 'card-from-list': fromList }">
        <div class="card__image">
          <figure>
            <img
              loading="lazy"
              width="370"
              height="370"
              :src="data.image"
              :alt="data.name"
            />
          </figure>
        </div>
        <div class="card__content">
          <div class="card__content__heading">
            <h1 class="drink-name">{{ data.name }}</h1>
            <h3
              class="is-alcoholic"
              v-if="data.alcoholic !== null && !data.alcoholic.includes('Non')"
            >{{ data.alcoholic }}
            </h3>
          </div>
          <div class="card__content__body" v-if="data.category !== null">
            <p class="category" v-if="!data.category.includes('Other')">
              {{ data.category }}
            </p>
            <p class="category" v-else>Various</p>
            <p class="glass">{{ data.glass }}</p>
          </div>
          <div class="card__content__tags" v-if="data.tags !== null">
            <div class="tag" v-for="tag in data.tags">
              <p v-if="tag !== 'Alcoholic'">{{ tag }}</p>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/variables';

* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}

.card {
  width: 420px;
  height: 570px;
  background-color: $secondary;

  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  box-sizing: border-box;

  padding: 1em;

  border-radius: 30px;

  &__image {
    border-radius: 30px;
    overflow: hidden;

    figure {
      img {
        width: 370px;
        height: 370px;

        transition: scale 0.2s ease-in;
      }
    }
  }

  &__content {
    margin-top: 1em;

    display: flex;
    flex-direction: column;
    &__heading {
      color: $white;
      display: flex;
      width: 375px;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .drink-name {
        overflow: hidden;
        width: 175px;
        max-height: 75px;

        font-size: 2rem;
        text-overflow: ellipsis;
        text-align: left;
      }
      .is-alcoholic {
        opacity: 50%;
        font-size: 1.5rem;
        font-style: italic;
      }
    }
    &__body {
      margin-top: 0.75em;
      text-align: justify;
      color: $white;
      font-size: 1.25rem;
    }

    &__tags {
      margin: 1em 0;

      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      column-gap: 5px;
      row-gap: 10px;

      .tag {
        p {
          font-size: 0.8em;

          color: $primary;
          background-color: $green;

          border-radius: 5px;

          padding: 8px 1em;
        }
      }
    }
  }

  &.card-from-list {
    height: 500px;
    h1 {
      font-size: 2.3rem;
      width: 100%;
    }

    .card__content {
      &__heading {
        .drink-name {
          text-align: center;
        }
      }
    }
  }

  @media screen and (max-width: 35em) {
    width: 320px;
    height: auto;

    &.card-from-list {
      height: 455px;
    }

    &__image {
      figure > img {
        width: 300px;
        height: 300px;
      }
    }

    &__content {
      &__heading {
        width: 280px;
      }
    }
  }

  &:hover {
    /* scale: 1.055; */
    transform: translateY(-10px);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  &:hover > &__image > figure > img {
    scale: 1.075;
  }

  & {
    transition:
      transform 0.2s ease-in,
      box-shadow 0.2s ease-in;
  }
}
</style>
