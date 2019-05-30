import TripApi from '../../api/trips.js'

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
    success(state) {
      state.status = 'success'
    },
    error(state) {
      state.status = 'error'
    },
    setTrips(state, trips) {
      state.trips = trips
    },
    addTrip(state, trip) {
      state.trips.push(trip)
    },
    updateTrip(state, trip) {
      let index = state.trips.findIndex(e => e.id === trip.id)
      state.trips[index] = trip
    },
    removeTrip(state, id) {
      let index = state.trips.findIndex(e => e.id === id)
      state.trips.splice(index, 1)
    }
  },

  actions: {
    load({ commit }) {
      commit('request')
      TripApi.list()
        .then(trips => {
          commit('setTrips', trips)
          commit('success')
        })
        .catch(() => commit('error'))
    },

    add({ commit, dispatch }, trip) {
      return new Promise((resolve, reject) => {
        commit('request')

        TripApi.store(trip).then(trip => {
          commit('addTrip', trip)
          commit('success')
          resolve(trip)
        })
      })
    },

    update({ commit, dispatch }, trip) {
      return new Promise((resolve, reject) => {
        commit('request')

        TripApi.update(trip).then(trip => {
          commit('updateTrip', trip)
          commit('success')
          resolve(trip)
        })
      })
    },

    delete({ commit, dispatch }, id) {
      commit('request')

      TripApi.destroy(id).then(() => {
        commit('removeTrip', id)
        commit('success')
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
