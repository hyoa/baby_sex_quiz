import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faMars, faVenus, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faMars, faVenus, faSpinner)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireNonVisited) && localStorage.getItem('sex_quiz_answered') === '1') {
    next({
      name: 'result'
    })
  } else {
    next()
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
