import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'

import Dashboard from './views/Dashboard.vue'

import Trips from './views/Trips.vue'
import TripCreate from './views/TripCreate.vue'

import Login from './views/Login.vue'
import Register from './views/Register.vue'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', component: Dashboard },

    { path: '/trips', component: Trips },
    { path: '/trips/create', component: TripCreate },

    { path: '/login', component: Login, meta: { public: true } },
    { path: '/register', component: Register, meta: { public: true } },
    { path: '*', component: NotFound, meta: { public: true } }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.public)) {
    next()
  } else if (!store.getters['auth/authenticated']) {
    next('/login')
  } else {
    next()
  }
})

export default router
