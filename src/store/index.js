
import Vue from 'vue'
import Vuex from 'vuex'
import employeeStore from './employeeStore.js'
import reviewStore from './reviewStore.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    employee: employeeStore,
    review: reviewStore
  }
})
