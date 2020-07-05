import Vue from 'vue'
import Vuex from 'vuex'
import leave from './modules/leave'
import user from './modules/user'
import role from './modules/role'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    loading: {}
  },
  mutations: {

  },
  actions: {

  },

  modules: {
    leave,
    user,
    role
  },
})
