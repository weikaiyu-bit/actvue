import { add, servicerunTime, serviceFindPage, serviceTask } from "@/service/leave";
const state = () => ({
  items: [],
  checkoutStatus: null,
  data: [],
  tableData: [],
  tasks: []
})

// getters
const getters = {

}

const mutations = {
  add(state, item) {
    state.data = item;
  },
  // leaverun(state,params){
  //   state
  // }
  findPage(state, item) {
    state.tableData = item
  },
  leavetask(state, item) {
    state.tasks = item
  }
}

// actions
const actions = {
  leaveAdd({ commit }, params) {
    return add(params).then(res => {
      commit("leaverun", params)
      return res
    })
  },

  runTime({ commit }, params) {
    return servicerunTime(params).then(res => {
      commit("leaverun", params)
      return res
    })
  },


  findPage({ commit }, params) {
    return serviceFindPage(params).then(res => {
      commit("findPage", res.data)
      return res
    })
  },

  leavetask({ commit },params) {
    return serviceTask(params).then(res => {
      commit("leavetask", res.data)
      return res
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}