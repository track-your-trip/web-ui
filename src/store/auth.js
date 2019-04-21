import axios from 'axios'

export default {
  namespaced: true,

  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },

  mutations: {
    request(state) {
      state.status = 'loading'
    },
    success(state, token) {
      state.status = 'success'
      state.token = token
    },
    error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    }
  },

  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('request')

        axios
          .post(process.env.VUE_APP_API_URL + '/login', {
            username: user.username,
            password: user.password
          })
          .then(res => {
            let token = res.data.access_token
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token

            commit('success', token)
            resolve(res)
          })
          .catch(err => {
            commit('error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },

    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')

        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']

        axios
          .post(process.env.VUE_APP_API_URL + '/logout')
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },

  getters: {
    authenticated: state => !!state.token,
    status: state => state.status
  }
}
