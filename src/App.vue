<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div>
    <header id="navbar">
      <NavBar />
    </header>
    <main>
      <router-view> </router-view>
    </main>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  display: block;
}

main {
  margin-top: 5em;
}
</style>
