import request from '@/utils/request'

export function findAllProject() {
  return request({
    url: '/project/all',
    method: 'get'
  })
}

export function findProjectByName(name) {
  return request({
    url: '/project/by-member/' + name,
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

export function deleteProject(id) {
  return request({
    url: '/project/' + id,
    method: 'delete'
  })
}
