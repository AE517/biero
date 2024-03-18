import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/index.ts'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faSearch, faX } from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faSearch, faX)

createApp(App)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
