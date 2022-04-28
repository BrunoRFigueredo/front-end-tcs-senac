import axios from 'axios'
import { getToken, logout } from './auth'

export function getClient(auxHeaders = {}) {
  let headers = getToken() ? { 'Authorization': `Bearer ${getToken()}` } : {}
  headers = { ...headers, ...auxHeaders }

  const client = axios.create({
    baseURL: 'http://localhost:8080',
    headers
  })

  client.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    if (error && error.response && error.response.status === 401) {
      logout()
    }
    return Promise.reject(error)
  })

  return client
}
