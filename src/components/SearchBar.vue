<template>
  <div>
    <div class="search-wrapper">
      <div class="input-field">
        <input type="text" v-model="model" placeholder="Search drink here" />
      </div>
      <button class="lucky-button" @click="goToRandomDrink()">
        Feeling Lucky?
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import API from '../api/main'

const route = useRouter()

const model = defineModel()

const goToRandomDrink = async () => {
  const res = await API.methods.random()
  return route.push(`/drinks/${res.idDrink}`)
}
</script>

<style scoped lang="scss">
@import '../styles/_variables.scss';

* {
  margin: 0;
  padding: 0;
}

.search-wrapper {
  display: flex;
  justify-items: center;
  align-content: center;
  justify-content: space-between;

  .input-field {
    border-radius: 15px;
    width: 80%;

    input {
      background-color: #d6ebe015;
      color: $white;

      font-size: 1.15rem;
      padding-left: 2em;

      border-radius: 10px;
      height: 3em;
      width: 100%;

      outline: none;
      border: none;

      &:focus {
        border: none;
        outline: none;
      }

      -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
      -moz-box-sizing: border-box; /* Firefox, other Gecko */
      box-sizing: border-box; /* Opera/IE 8+ */

      @media screen and (max-width: 480px) {
        text-align: center;
        padding: 0;
      }
    }

    @media screen and (max-width: 1200px) {
      width: 70%;
    }

    @media screen and (max-width: 750px) {
      width: 50%;
    }

    @media screen and (min-width: 500px) {
      transition: width 0.5s ease-in;
    }

    @media screen and (max-width: 480px) {
      width: 100%;
    }
  }

  .lucky-button {
    background-color: $green;
    color: $primary;

    font-size: 1.15rem;
    padding: 0 1em;

    border-radius: 10px;

    height: 3em;
  }

  @media screen and (max-width: 480px) {
    flex-direction: column;
    flex-wrap: wrap;

    & > div {
      margin-bottom: 10px;
    }
  }
}
</style>
