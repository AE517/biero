<template>
  <div>
    <nav class="nav" :class="{ expanded: isVisible }">
      <div class="nav__logo">
        <router-link to="/">
          <img
            src="../assets/biero_logo.svg"
            alt="navbar_logo"
            width="150"
            height="70"
          />
        </router-link>
      </div>
      <button
        name="bt-navbar"
        aria-expanded="false"
        aria-controls="links"
        @click="isVisible = !isVisible"
      >
        <span v-if="!isVisible">
          <FontAwesomeIcon icon="fa-solid fa-bars" />
        </span>
        <span v-else> <FontAwesomeIcon icon="fa-solid fa-x" /> </span>
      </button>
      <div class="wrapper" :data-visible="isVisible" id="links">
        <div class="wrapper__links">
          <a class="veisla" target="_blank" href="https://veisla.vercel.app"
            >Hungry?</a
          >
          <router-link
            v-for="link in options"
            :to="link.path"
            :aria-label="link.label"
            @click="isVisible = false"
          >
            {{ link.routeName }}
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { RouteLocationRaw } from 'vue-router'
import { ref } from 'vue'

const isVisible = ref(false)

const options: Array<{
  routeName: String
  path: RouteLocationRaw
  label: String
}> = [
  { routeName: 'Home', path: '/', label: 'Biero Main page' },
  {
    routeName: 'Categories',
    path: '/categories',
    label: 'Search drinks by their different categories',
  },
  {
    routeName: 'Glasses',
    path: '/glasses',
    label: 'Search drinks by their different glasses',
  },
  {
    routeName: 'Ingredients',
    path: '/ingredients',
    label: "Search drinks by it's main ingredient",
  },
]
</script>

<style lang="scss" scoped>
@import '../styles/_variables.scss';

* {
  margin: 0;
  padding: 0;
}

.nav {
  z-index: 5;
  top: 0;
  right: 0;

  margin-top: 0.5em;

  padding: 5px;

  background-color: transparent;

  width: 100%;
  height: auto;

  font-size: 24px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */

  &__logo {
    margin-top: 0.6em;
  }
  button {
    display: none;
  }
  .wrapper {
    z-index: 5;
    position: fixed;
    right: 0;
    background-color: #0c0c1470;

    @supports (backdrop-filter: blur(1rem)) {
      background-color: #0c0c1480;
      backdrop-filter: blur(1rem);
    }
    &__links {
      color: $white;
      margin: 0.5em;

      display: flex;

      align-content: center;
      justify-content: flex-end;
      column-gap: 2em;

      a {
        margin: 0 5px;
        padding: 5px 15px;

        color: $white;
        text-decoration: none;

        &.router-link-active {
          border-bottom: 2px solid $green;
        }

        &.veisla {
          border-radius: 0;
          color: #ee4905;
          transition: none;
        }
      }
    }
  }
}

@media (max-width: 64em) and (min-width: 48em) {
  .nav {
    font-size: 20px;
    .wrapper {
      &__links {
        column-gap: 0.5em;
      }
    }
  }
}

@media (max-width: 48em) {
  .nav {
    position: fixed;
    height: 50px;
    margin: 0;
    padding: 0;

    &__logo {
      height: 60px;
      img {
        height: 60px;
      }
    }
    button {
      position: absolute;
      top: 0.5em;
      right: 0.5em;
      display: block;
      width: 50px;
      height: 50px;
      border: none;
      border-radius: none;
      margin-left: 10px;
      span {
        font-size: 2rem;
        color: $white;
      }
      background: none;
      z-index: 10;
    }

    .wrapper {
      position: relative;
      &[data-visible='true'] {
        transform: translate(0%);
      }
      transform: translateX(100%);
      width: 100%;
      &__links {
        margin: 0;

        padding: min(30vh, 5rem) 0 0 0;
        height: 100%;
        flex-direction: column;
        justify-content: flex-start;
        row-gap: 1em;

        a {
          font-size: 1.7rem;
          text-align: left;
          padding: 0;
          margin-left: 20px;
          width: 6em;

          transition: padding-left 0.3s ease-in-out;

          &.router-link-active {
            padding-left: 10px;
            border-bottom: none;
            border-left: 2px solid $green;
            transition: padding-left 0.3s ease-in-out;
          }
        }
      }
      & {
        transition: transform 0.3s ease-in;
      }
    }
    &.expanded {
      transition: height 0.4s ease;
      height: 100%;
    }
    
    &{
      transition: height 0.8s ease;
    }
  }
}
</style>
