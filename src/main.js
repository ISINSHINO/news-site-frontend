import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.axios = axios

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
