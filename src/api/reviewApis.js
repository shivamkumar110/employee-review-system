import apiCall from './apiUtil/makeApiCall.js'
const BASE_PATH = '/api/'

const USER_TYPE_MAPPING = {
  employee: 'reviewerID',
  admin: 'employeeID'
}
export default {
  async getReviews (id, type) {
    const path = BASE_PATH + 'review'
    const params = {
      [USER_TYPE_MAPPING[type]]: id
    }
    return await apiCall.makeGetRequest(path, params)
  },
  async createReview (payload) {
    const path = `${BASE_PATH}review`
    return await apiCall.makePostRequest(path, payload)
  },
  async submitReview (payload) {
    const path = `${BASE_PATH}review/${payload.id}`
    return await apiCall.makePutRequest(path, payload.feedback)
  }
}
