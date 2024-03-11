<script setup lang="ts">
import api from '../api/main.ts'
import { onBeforeMount, ref } from 'vue'

const props = defineProps(['drinkID'])
const loaded = ref(false)
const drink = ref()

/**
 * Organizes all data received from the lookup method from API and returns it as a new object
 *
 * @param data - all data received from the API response
 * @returns object contained all organized data
 */

function organizeData(data): Object {
  const drinkRequirements: Array<Object> = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = data['strIngredient' + i]
    const measurement = data['strMeasure' + i]

    drinkRequirements.push({
      ingredient:
        ingredient !== null && ingredient !== undefined ? ingredient : null,
      measurement:
        measurement !== null && measurement !== undefined ? measurement : null,
    })
  }

  return {
    name: data.strDrink,
    image: data.strDrinkThumb,
    category: data.strCategory,
    alcoholic: data.strAlcoholic,
    glass: data.strGlass,
    iba: data.strIBA,
    tags:
      data.strTags !== undefined && data.strTags !== null
        ? data.strTags.split(',')
        : null,
    requirements: drinkRequirements,
    instructions: [
      data.strInstructions,
      data.strInstructionsES,
      data.strInstructionsDE,
      data.strInstructionsFR,
      data.strInstructionsIT,
      data.strInstructionsZH,
    ],
  }
}

onBeforeMount(async () => {
  const res = await api.methods.lookup(props.drinkID)
  drink.value = organizeData(res)
  loaded.value = true
})
</script>

<!-- TODO complete all data rendering -->
<template>
  <div class="wrapper">
    <div v-if="loaded">
      <div v-for="item in drink.requirements">
        <span v-if="item.ingredient !== null">{{ item.ingredient }}</span>
        <span v-if="item.measurement !== null">: {{ item.measurement }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
