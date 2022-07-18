import SUBTASK_ACTIONS from "./subtask-actions"

const SUBTASK_STORE = {
  state: () => ({
    subtaskList: []
  }),

  actions: {
    changeSubtaskList({ commit }, newSubtaskList) {
      commit(SUBTASK_ACTIONS.changeSubtaskList, newSubtaskList)
    },
  },

  mutations: {
    changeSubtaskList(state, newSubtaskList) {
      state.subtaskList = [...newSubtaskList]
    }
  },

  getters: {
    subtaskList: state => state.subtaskList
  }
}

export default SUBTASK_STORE