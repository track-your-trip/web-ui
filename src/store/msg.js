export default {
  namespaced: true,

  state: {
    show: false,
    message: ''
  },

  mutations: {
    show(state, data) {
      state.show = true
      state.message = data.message
    },
    hide(state) {
      state.show = false
    },
    update(state, data) {
      state.show = !!data.show
    }
  },

  actions: {
    show({ commit, state }, data) {
      commit('show', data)
    }
  },

  getters: {
    show: state => state.show,
    message: state => state.message
  }
}
