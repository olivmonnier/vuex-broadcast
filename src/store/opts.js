export default {
  state: {
    count: 0,
    text: ''
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    editText(state, value) {
      state.text = value
    }
  },
  actions: {
    increment({ commit }) {
      commit('increment', true)
    },
    editText({ commit }, text) {
      commit('editText', text)
    }
  }
}