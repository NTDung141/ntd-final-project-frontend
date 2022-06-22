import SIDEBAR_ACTIONS from "./sidebar-actions"

const SIDEBAR_STORE = {
  state: () => ({
    currentTabIndex: 1
  }),

  actions: {
    changeTabIndex({ commit }, tabIndex) {
      commit(SIDEBAR_ACTIONS.changeTabIndex, tabIndex)
    },
  },

  mutations: {
    changeTabIndex(state, tabIndex) {
      state.currentTabIndex = tabIndex
    }
  },

  getters: {
    currentTabIndex: state => state.currentTabIndex
  }
}

export default SIDEBAR_STORE