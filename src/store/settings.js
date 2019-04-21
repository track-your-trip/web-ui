import axios from 'axios'

export default {
  namespaced: true,

  state: {
    status: '',
    register: false
  },

  mutations: {
    request(state) {
      state.status = 'loading'
    },
    success(state, data) {
      state.status = 'success'
      state.register = data.register
    },
    error(state) {
      state.status = 'error'
    }
  },

  actions: {
    load({ commit }) {
      return new Promise((resolve, reject) => {
        commit('request')

        axios
          .get(process.env.VUE_APP_API_URL + '/settings')
          .then(res => {
            commit('success', res.data.data)
            resolve(res)
          })
          .catch(err => {
            commit('error')
            reject(err)
          })
      })
    },
  },

  getters: {
    status: state => state.status,
    register: state => state.register
  }
}
