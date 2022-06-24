import { getClient } from './http'

export async function login (email, password) {
  const client = getClient()
  const { data } = await client.post('https://gestao-projetos-sociais.herokuapp.com/login/', {
    email,
    password
  })
  if (data.token) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('permissoes', data.roles)
    localStorage.setItem('id', data.usuario.id)
  }
}

export function getToken() {
  return localStorage.getItem('token')
}

export function getLogado(){
  return localStorage.getItem('id')
}

export async function saveProfile (profile) {
  const { data } = await getClient().post('https://gestao-projetos-sociais.herokuapp.com/usuario/criar-usuario', profile)
  return data
}
export async function updatePassword (passwords) {
  const { data } = await getClient().put('https://gestao-projetos-sociais.herokuapp.com/@me/password', passwords)
  return data
}

export async function getProfile() {
  const { data } = await getClient().get('https://gestao-projetos-sociais.herokuapp.com/usuario/')
  return data
}

export function logout (callback) {
  localStorage.removeItem('token')
  localStorage.removeItem('permissoes')
  localStorage.removeItem('id')
  if (callback) {
    callback()
  }
}

export function isLogged () {
  return !!localStorage.getItem('token')
}
