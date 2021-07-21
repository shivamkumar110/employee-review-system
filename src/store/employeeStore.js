
import employeeApis from '@/api/employeeApis'

export default {
  namespaced: true,
  state: {
    userType: null,
    employeesList: [],
    employee: null,
    loggedInUser: null
  },
  getters: {
    userType: (state) => state.userType,
    employeesList: (state) => state.employeesList,
    employee: (state) => state.employee,
    loggedInUser: (state) => state.loggedInUser
  },
  mutations: {
    SET_LOGIN_DETAILS: (state, data) => {
      state.loggedInUser = data
    },
    SET_USER_TYPE: (state, data) => {
      state.userType = data
    },
    SET_ALL_EMPLOYEES: (state, data) => {
      state.employeesList = data
    },
    SET_EMPLOYEE: (state, data) => {
      state.employee = data
    }
  },
  actions: {
    async getLoginDetails ({ commit }, id) {
      const { data } = await employeeApis.getEmployee(id)
      commit('SET_LOGIN_DETAILS', data.data)
      return data
    },
    async listAllEployees ({ commit }) {
      const { data } = await employeeApis.listAllEployees()
      commit('SET_ALL_EMPLOYEES', data.data)
      return data
    },
    async createEmployee ({ commit }, { payload, callback } = {}) {
      const { data } = await employeeApis.createEmployee(payload)
      if (data.success) {
        callback()
      }
    },
    async getEmployee ({ commit }, id) {
      const { data } = await employeeApis.getEmployee(id)
      commit('SET_EMPLOYEE', data.data)
      return data
    },
    async updateEmployee ({ commit }, { payload, callback } = {}) {
      const { data } = await employeeApis.updateEmployee(payload)
      if (data.success) {
        callback()
      }
    },
    async deleteEmployee ({ commit }, { id, callback } = {}) {
      const { data } = await employeeApis.deleteEmployee(id)
      if (data.success) {
        callback()
      }
    }
  }
}
