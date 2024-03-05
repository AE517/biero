//Pages
import Home from '../pages/Home.vue'
import ListViews from '../pages/ListViews.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: Home },
  {
    path: '/:listType',
    name: 'Lists',
    component: ListViews,
    beforeEnter: (to: Object, _from: Object, next: Function) => {
      const types: Array<String> = ['categories', 'glasses', 'ingredients']
      const isValid = (param: string) => {
        return types.includes(param) ? true : false
      }
      return !isValid(to.params.listType) ? next({ name: 'Home' }) : next()
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
