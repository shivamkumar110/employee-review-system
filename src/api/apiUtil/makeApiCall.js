import axios from 'axios'
export default {
  async makeGetRequest (path, params = {}) {
    const response = await axios.get(path, { params })
    return response
  },
  async makePostRequest (path, payload) {
    const response = await axios.post(path, payload)
    return response
  },
  async makePutRequest (path, payload) {
    const response = await axios.put(path, payload)
    return response
  },
  async makeDeleteRequest (path) {
    const response = await axios.delete(path)
    return response
  }
}
