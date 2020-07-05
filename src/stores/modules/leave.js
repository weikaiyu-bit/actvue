import {
  add, servicerunTime, serviceFindPage,
  serviceTask, serviceListInfo, serviceCompleteTask,
  serviceClaim, serviceMyTask,
  servicehistory,
  servicedeleteRunTime
} from "@/service/leave";
const state = () => ({
  items: [],
  checkoutStatus: null,
  data: [],
  tableData: [],
  tasks: [],
  listinfo: [],
  mytask: []
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
  },
  MyLeaveTask(state, item) {
    state.mytask = item
  },

  ListInfo(state, item) {

    state.listinfo = item
  },
  listhistory(state, item) {
    console.log(state, item)
  }
}

// actions
const actions = {
  listhistory({ commit }, params) {
    return servicehistory(params).then(res => {
      commit("listhistory", params)
      return res
    })
  },

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

  deleteRunTime({ commit }, params) {
    return servicedeleteRunTime(params).then(res => {
      return res
    })
  },
  findPage({ commit }, params) {
    return serviceFindPage(params).then(res => {
      commit("findPage", res.data)
      return res
    })
  },

  leavetask({ commit }, params) {
    return serviceTask(params).then(res => {
      commit("leavetask", res.data)
      return res
    })
  },

  MyLeaveTask({ commit }, params) {
    return serviceMyTask(params).then(res => {
      commit("MyLeaveTask", res.data)
      return res
    })
  },

  listinfo({ commit }, params) {
    return serviceListInfo(params).then(res => {
      commit("ListInfo", res.data)
      return res
    })
  },
  completeTask({ commit }, params) {
    return serviceCompleteTask(params).then(res => {
      return res;
    })
  },
  claim({ commit }, params) {
    return serviceClaim(params).then(res => {
      return res;
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