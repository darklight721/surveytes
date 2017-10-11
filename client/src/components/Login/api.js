import axios from 'axios'

export function createSession({ username, password }) {
  return axios.post('/api/admin/sessions', { username, password })
}
