import AUTHENTICATION_ACTIONS from "./authentication-actions"

const AUTHENTICATION_STORE = {
  state: () => ({
    userInfo: {}
  }),

  actions: {
    login({ commit }, userInfo) {
      commit(AUTHENTICATION_ACTIONS.login, userInfo)
    },

    logout({ commit }) {
      commit(AUTHENTICATION_ACTIONS.logout)
    }
  },

  mutations: {
    login(state, userInfo) {
      state.userInfo = userInfo
    },

    logout(state) {
      state.userInfo = {}
    }
  },

  getters: {
    userInfo: state => state.userInfo
  }
}

export default AUTHENTICATION_STORE