<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div>
    <div id="navbar">
      <NavBar />
    </div>
    <router-view> </router-view>
  </div>
</template>

<style scoped></style>
