import PROJECT_ACTIONS from "./project-actions"

const PROJECT_STORE = {
  state: () => ({
    project: {}
  }),

  actions: {
    updateProject({ commit }, project) {
      commit(PROJECT_ACTIONS.updateProject, project)
    }
  },

  mutations: {
    updateProject(state, project) {
      state.project = project
    }
  },

  getters: {
    project: state => state.project
  }
}

export default PROJECT_STORE