
import reviewApis from '@/api/reviewApis'

export default {
  namespaced: true,
  state: {
    reviewsList: [],
    employeesList: [],
    employee: {}
  },
  getters: {
    reviewsList: (state) => state.reviewsList,
    employeesList: (state) => state.employeesList,
    employee: (state) => state.employee
  },
  mutations: {
    SET_REVIEWS_LIST: (state, data) => {
      state.reviewsList = data
    },
    SET_ALL_EMPLOYEES: (state, data) => {
      state.employeesList = data
    },
    SET_EMPLOYEE: (state, data) => {
      state.employee = data
    }
  },
  actions: {
    async getReviews ({ commit }, { id, type } = {}) {
      const { data } = await reviewApis.getReviews(id, type)
      commit('SET_REVIEWS_LIST', data.data)
      return data
    },
    async createReview ({ commit }, {payload, callback} = {}) {
      const { data } = await reviewApis.createReview(payload)
      if (data.success) {
        callback()
      }
    },
    async submitReview ({ commit }, {payload, callback} = {}) {
      const { data } = await reviewApis.submitReview(payload)
      if (data.success) {
        callback()
      }
    },
   
  }
}
