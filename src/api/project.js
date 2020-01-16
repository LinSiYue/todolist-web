import request from '@/utils/request'

export function findAllProject() {
  return request({
    url: '/project/all',
    method: 'get'
  })
}
