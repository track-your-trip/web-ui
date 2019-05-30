import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth.js'
import settings from './modules/settings.js'
import trips from './modules/trips.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    settings,
    trips
  }
})
