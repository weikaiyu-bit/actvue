import { add } from "@/service/leave";
const state = () => ({
  items: [],
  checkoutStatus: null,
  data: []
})

// getters
const getters = {

}

const mutations = {
  add(state, item) {
    state.data = item;
  }
}

// actions
const actions = {
  leaveAdd(commit, item) {
   return add(item).then(res => {
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