import { add, findPage, addRole } from "@/service/user";
const state = () => ({
    userData: []
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
        state.userData = item
    },
    addRole(state, item) {

    }
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
    addRole({ commit }, params) {
        return addRole(params).then(res => {
            commit("addRole", res.data)
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