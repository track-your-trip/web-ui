import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vee-validate'
import './plugins/jquery'
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
