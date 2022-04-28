import { getClient } from './http'

export async function login (email, password) {
  const client = getClient()
  const { data } = await client.post('/auth/signin', {
    email,
    password
  })
  if (data.token) {
    localStorage.setItem('token', data.token)
  }
}

export function getToken() {
  return localStorage.getItem('token')
}

export async function saveProfile (profile) {
  const { data } = await getClient().put('/@me', profile)
  return data
}
export async function updatePassword (passwords) {
  const { data } = await getClient().put('/@me/password', passwords)
  return data
}

export async function getProfile() {
  const { data } = await getClient().get('/auth/@me')
  return data
}

export function logout (callback) {
  localStorage.removeItem('token')
  if (callback) {
    callback ()
  }
}

export function isLogged () {
  return !!localStorage.getItem('token')
}
