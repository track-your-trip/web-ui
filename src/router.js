import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'

import Dashboard from '@/views/Dashboard.vue'

import Trips from '@/views/Trips.vue'
import Trip from '@/views/Trip.vue'

import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: { name: 'dashboard' } },
    { path: '/dashboard', name: 'dashboard', component: Dashboard },

    { path: '/trips', name: 'trips', component: Trips },
    { path: '/trips/:id', name: 'trip', component: Trip },

    { path: '/login', name: 'login', component: Login, meta: { public: true } },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { public: true }
    },
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
