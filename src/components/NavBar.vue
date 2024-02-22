<template>
  <div>
    <div class="nav">
      <div class="nav__links">
        <router-link v-for="link in options" :to="link.path">
          {{ link.routeName }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'

const options: Array<{ routeName: String; path: RouteLocationRaw }> = [
  { routeName: 'Home', path: '/' },
  //TODO: Add remaining routes -> routes.ts
  //{ routeName: 'Ingredients', path: 'ingredients' },
  //{ routeName: 'Categories', path: 'categories' },
  //{ routeName: 'Glasses', path: 'glasses' },
]
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.nav {
  padding: 5px;
  border-radius: 20px;

  background-color: #161624;

  width: auto;
  height: auto;

  font-size: 24px;
  &__links {
    margin: 0.5em;
    display: flex;

    align-content: center;
    justify-content: space-between;

    a {
      border-radius: 10px;
      margin: 0 5px;
      padding: 10px;

      color: #d6ebe0;
      text-decoration: none;

      transition: all 0.75s ease;

      &.router-link-active {
        color: #0c0c14;
        background-color: #acceaa;
      }
    }
  }
}
</style>
