import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/routes.ts'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faSearch)

createApp(App)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
