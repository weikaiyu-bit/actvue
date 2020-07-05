import { add, findPage } from "@/service/role";
const state = () => ({
    roleData: []
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
        state.roleData = item
    },

}

// actions
const actions = {
    add({ commit }, params) {
        return add(params).then(res => {
            commit("add", res.data)
            return res
        })
    },
    findPage({ commit }, params) {
        return findPage(params).then(res => {
            commit("findPage", res.data)
            return res
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}