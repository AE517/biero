<template>
  <div>
    <div class="card">
      <div class="card__image">
        <figure>
          <img :src="drink.strDrinkThumb" :alt="drink.strDrink" />
        </figure>
      </div>
      <div class="card__content">
        <div class="card__content__heading">
          <h1 class="drink-name">{{ drink.strDrink }}</h1>
          <h3 class="is-alcoholic" v-if="!drink.strAlcoholic.includes('Non')">
            {{ drink.strAlcoholic }}
          </h3>
        </div>
        <div class="card__content__body">
          <p class="category" v-if="!drink.strCategory.includes('Other')">
            {{ drink.strCategory }}
          </p>
          <p class="category" v-else>Various</p>
          <p class="glass">{{ drink.strGlass }}</p>
        </div>
        <div class="card__content__tags">
          <div class="tag" v-if="drink.strTags !== null" v-for="tag in tags">
            <p v-if="tag !== 'Alcoholic'">{{ tag }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['drink'])

const tags: Array<String> =
  props.drink.strTags === null ? null : props.drink.strTags.split(',')
</script>

<style lang="scss" scoped>
@import '../styles/variables';

* {
  margin: 0;
  padding: 0;
}

.card {
  width: 420px;
  height: 570px;
  background-color: $blue2;

  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;

  box-sizing: border-box;

  padding: 1em;

  border-radius: 30px;

  &__image {
    height: 375px;
    width: 375px;

    border-radius: 30px;
    overflow: hidden;

    figure {
      img {
        width: 375px;
        height: 375px;

        transition: scale 0.2s ease-in;
      }
    }
  }

  &__content {
    margin-top: 1em;

    display: flex;
    flex-direction: column;
    justify-items: center;
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

      font-size: 1rem;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      column-gap: 5px;
      row-gap: 10px;

      .tag {
        p {
          font-size: 0.8em;

          color: $blue;
          background-color: $green;

          border-radius: 10px;

          padding: 10px 1em;
        }
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

  transition:
    transform 0.2s ease-in,
    box-shadow 0.2s ease-in;
}
</style>
