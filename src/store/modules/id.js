const state = {
  projectId: 0,
  taskId: 0
}

const mutations = {
  SET_PROJECT_ID: (state, id) => {
    state.projectId = id
  },
  SET_TASK_ID: (state, id) => {
    state.taskId = id
  }
}

const actions = {
  setProjectId({ commit }, id) {
    commit('SET_PROJECT_ID', id)
  },
  setTaskId({ commit }, id) {
    commit('SET_TASK_ID', id)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
