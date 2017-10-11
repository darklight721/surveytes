import axios from 'axios'

export function createRegistration({ name, username, password }) {
  return axios.post(
    '/api/admin/registrations',
    { user: { name, username, password } }
  )
}
