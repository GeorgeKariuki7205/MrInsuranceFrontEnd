import Vue from 'vue'
import Vuex from 'vuex'
import NavigationModule from './modules/NavigationModule'
import InsuranceCoverCostBreakdown from './modules/InsuranceCoverCostBreakdown'
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
    InsuranceCoverCostBreakdown
  }
})
