<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div>
    <div id="navbar">
      <NavBar />
    </div>
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
