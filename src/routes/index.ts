import { createRouter, createWebHistory } from 'vue-router'

//Pages
const Home = () => import('../pages/Home.vue')
const ListViews = () => import('../pages/ListViews.vue')
const DrinkPage = () => import('../pages/DrinkPage.vue')

const routes = [
  { path: '/', name: 'Home', component: Home },
  {
    path: '/:listType',
    name: 'Lists',
    component: ListViews,
    beforeEnter: (to: any, _from: Object, next: Function) => {
      const types: Array<String> = ['categories', 'glasses', 'ingredients']
      const isValid = (param: string) => {
        return types.includes(param) ? true : false
      }
      return !isValid(to.params.listType) ? next({ name: 'Home' }) : next()
    },
  },
  {
    path: '/drinks/:drinkID',
    name: 'DrinkPage',
    component: DrinkPage,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
