import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(userName, token) {
  return request({
    url: '/user/getInfo',
    method: 'get',
    params: { userName, token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
