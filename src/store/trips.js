import axios from 'axios'

export default {
  namespaced: true,

  state: {
    status: '',
    trips: []
  },

  mutations: {
    request(state) {
      state.status = 'loading'
    },
    trips(state, trips) {
      state.status = 'success'
      state.trips = trips
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
          .get(process.env.VUE_APP_API_URL + '/trips')
          .then(res => {
            commit('trips', res.data.data)
            resolve(res)
          })
          .catch(err => {
            commit('error')
            reject(err)
          })
      })
    },

    delete({ commit, dispatch }, id) {
      return new Promise((resolve, reject) => {
        commit('request')

        axios
          .delete(process.env.VUE_APP_API_URL + '/trips/' + id)
          .then(res => {
            dispatch('load')
            resolve(res)
          })
          .catch(err => {
            commit('error')
            reject(err)
          })
      })
    }
  },

  getters: {
    status: state => state.status,
    loading: state => state.status === 'loading',
    success: state => state.status === 'success',
    error: state => state.status === 'error',
    trips: state => state.trips
  }
}
