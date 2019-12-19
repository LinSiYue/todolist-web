const state = {
  projectId: 8,
  taskId: 14
}

const mutations = {
  ADD_PROJECT_ID: (state) => {
    state.projectId += 1
  },
  ADD_TASK_ID: (state) => {
    state.taskId += 1
  }
}

const actions = {
  addProjectId({ commit }) {
    commit('ADD_PROJECT_ID')
  },
  addTaskId({ commit }) {
    commit('ADD_TASK_ID')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
