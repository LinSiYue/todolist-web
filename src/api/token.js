import request from '@/utils/request'
export function checkToken(userName, token) {
  return request({
    url: '/token?userName =' + userName + '&token=' + token,
    method: 'get'
  })
}
