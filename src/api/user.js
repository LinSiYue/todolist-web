import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(name, token) {
  return request({
    url: '/user/getInfo',
    method: 'get',
    params: { name, token }
  })
}

export function getName(query) {
  return request({
    url: '/user/getName/' + query,
    method: 'get'
  })
}

export function getAll() {
  return request({
    url: '/user/getAll',
    method: 'get'
  })
}

export function resetPassWordByName(name, passWord) {
  return request({
    url: '/user/resetPassWord',
    method: 'post',
    params: { name, passWord }
  })
}

export function changePassWord(name, oldPassWord, newPassWord) {
  return request({
    url: '/user/changePassWord',
    method: 'post',
    params: { name, oldPassWord, newPassWord }
  })
}

export function deleteUserByName(name) {
  return request({
    url: '/user/delete/' + name,
    method: 'delete'
  })
}

export function saveUser(data) {
  console.log(data)
  return request({
    url: '/user/save',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
