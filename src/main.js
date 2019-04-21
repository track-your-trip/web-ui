import Vue from 'vue'
import './plugins/axios'
import './plugins/jquery'
import './plugins/vee-validate'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// Import layouts
import LayoutDefault from './layouts/LayoutDefault.vue'

Vue.component('layout-default', LayoutDefault)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
