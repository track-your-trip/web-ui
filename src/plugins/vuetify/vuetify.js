import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import icons from './icons'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'md',
    values: icons
  }
})
