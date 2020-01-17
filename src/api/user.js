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
    url: 'user/getName/' + query,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
