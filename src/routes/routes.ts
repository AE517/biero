//Pages
import Home from '../pages/Home.vue'
import Categories from '../pages/Categories.vue'
import Glasses from '../pages/Glasses.vue'
import Ingredients from '../pages/Ingredients.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/ingredients', component: Ingredients },
  { path: '/glasses', component: Glasses },
  { path: '/categories', component: Categories },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
