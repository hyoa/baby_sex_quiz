import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faMars)
library.add(faVenus)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
