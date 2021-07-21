import apiCall from './apiUtil/makeApiCall.js'
const BASE_PATH = '/api/'

export default {
  async listAllEployees () {
    const path = `${BASE_PATH}employee`
    return await apiCall.makeGetRequest(path)
  },
  async createEmployee (payload) {
    const path = `${BASE_PATH}employee`
    return await apiCall.makePostRequest(path, payload)
  },
  async updateEmployee (payload) {
    const path = `${BASE_PATH}employee/${payload.id}`
    return await apiCall.makePutRequest(path, payload)
  },
  async deleteEmployee (id) {
    const path = `${BASE_PATH}employee/${id}`
    return await apiCall.makeDeleteRequest(path, id)
  },
  async getEmployee (id) {
    const path = `${BASE_PATH}employee/${id}`
    return await apiCall.makeGetRequest(path)
  }
}
