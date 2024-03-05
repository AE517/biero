<template>
  <div>
    <div class="list-card" v-for="item in typeList">
      <p>{{ item }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import api from '../api/main.ts'

const route = useRoute()

const type = ref()
const typeList = ref()

watch(
  () => route.params.listType,
  async (newType) => {
    type.value = newType
    loadList(newType.toString())
  },
  { immediate: true },
)

/**
 * Return the organized (alphabetically) items provided from the API response of the current list type
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
</script>

<style lang="scss" scoped>
@import '../styles/variables';
* {
  color: $white;
}
</style>
