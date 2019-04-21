import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'

import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/authenticated']) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
