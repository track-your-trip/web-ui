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
import LayoutApp from './layouts/LayoutApp.vue'
import LayoutAppDefault from './layouts/LayoutAppDefault.vue'
import LayoutAppFullscreen from './layouts/LayoutAppFullscreen.vue'

Vue.component('layout-app', LayoutApp)
Vue.component('layout-app-default', LayoutAppDefault)
Vue.component('layout-app-fullscreen', LayoutAppFullscreen)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
