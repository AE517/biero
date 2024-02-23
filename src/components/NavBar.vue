<template>
  <div>
    <div class="nav">
      <div class="nav__links" :class="{ active: isVisible }">
        <router-link
          v-for="link in options"
          :to="link.path"
          @click="isVisible = !isVisible"
        >
          {{ link.routeName }}
        </router-link>
      </div>
      <button
        class="nav__button"
        @click="showBar"
        :class="{ active: !isVisible }"
      >
        <font-awesome-icon icon="bars" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'
import { ref } from 'vue'

const isVisible = ref(false)

const options: Array<{ routeName: String; path: RouteLocationRaw }> = [
  { routeName: 'Home', path: '/' },
  { routeName: 'Ingredients', path: 'ingredients' },
  { routeName: 'Categories', path: 'categories' },
  { routeName: 'Glasses', path: 'glasses' },
]

const showBar = () => {
  isVisible.value = !isVisible.value
}
</script>

<style lang="scss" scoped>
@import '../styles/_variables.scss';

* {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.nav {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  margin-top: 20px;
  padding: 5px;
  border-radius: 20px;

  background-color: #161624;

  width: auto;
  height: auto;

  font-size: 24px;

  &__links {
    color: $font-white;
    margin: 0.5em;
    display: flex;

    align-content: center;
    justify-content: space-between;

    a {
      border-radius: 10px;
      margin: 0 5px;
      padding: 5px;

      color: #d6ebe0;
      text-decoration: none;

      transition: all 0.75s ease;

      &.router-link-active {
        color: #0c0c14;
        background-color: #acceaa;
      }
    }

    @media screen and (max-width: 480px) {
      display: none;
      margin: 2em;
      height: auto;
      flex-direction: column;
      justify-content: flex-start;
      gap: 1em;

      &.active {
        display: flex;

        a {
          padding: 5px 10px;
          font-size: 32px;
        }
      }
    }
  }

  &__button {
    display: none;
    padding: 5px;

    background-color: $bg2-blue;
    color: $font-white;

    @media screen and (max-width: 480px) {
      display: block;
    }
  }

  @media screen and (max-width: 720px) {
    margin-top: 0;
    border-radius: 0;
    width: 100%;
  }

  @media screen and (max-width: 480px) {
    z-index: 2;
    transform: translateX(0);
    left: 0;
    margin-top: 10px;
    margin-left: 10px;
    border-radius: 10px;
    width: auto;
  }
}
</style>
