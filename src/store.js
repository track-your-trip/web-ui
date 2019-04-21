import Vue from 'vue'
import Vuex from 'vuex'

import auth from './store/auth.js'
import msg from './store/msg.js'
import settings from './store/settings.js'
import trips from './store/trips.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    msg,
    settings,
    trips
  }
})
