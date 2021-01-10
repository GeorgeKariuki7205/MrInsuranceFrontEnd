import Vue from 'vue'
import Vuex from 'vuex'
import NavigationModule from './modules/NavigationModule'
import UserAccount from './modules/UserAccount'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    NavigationModule,
    UserAccount
  }
})
