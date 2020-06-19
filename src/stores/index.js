import Vue from 'vue'
import Vuex from 'vuex'
import leave from './modules/leave'
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
    leave
  },
})
