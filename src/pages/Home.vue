<script setup lang="ts">
import drinksAPI from '../api/main.ts'
import SearchBar from '../components/SearchBar.vue'
import DrinkCard from '../components/DrinkCard.vue'

import { ref } from 'vue'

const query = ref('')
const drinks = ref()

const searchDrinks = async (drink: String) => {
  drinks.value = await drinksAPI.methods.search(drink)
}
</script>

<template>
  <section>
    <div>Home</div>
    <div class="search_field">
      <SearchBar v-on:keyup.enter="searchDrinks(query)" v-model="query" />
    </div>
  </section>
  <section>
    <div class="cards-container">
      <DrinkCard v-for="drink in drinks" :key="drink.idDrink" :drink="drink" />
    </div>
  </section>
</template>

<style lang="scss">
.cards-container {
  margin-top: 3em;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(425px, 1fr));
  row-gap: 2em;
  place-items: center;
}
</style>
