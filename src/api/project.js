import request from '@/utils/request'

export function findAllProject() {
  return request({
    url: '/project/all',
    method: 'get'
  })
}

export function saveProject(data) {
  return request({
    url: '/project/save',
    method: 'post',
    data
  })
}
