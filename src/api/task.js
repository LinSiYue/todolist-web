import request from '@/utils/request'

export function findAllTask() {
  return request({
    url: '/task/all',
    method: 'get'
  })
}

export function findAllTaskByProjectId(projectId) {
  return request({
    url: '/task/by-projectId/' + projectId,
    method: 'get'
  })
}

export function updateTask(data) {
  return request({
    url: '/task/updateOrCreate',
    method: 'post',
    data
  })
}

export function delTaskById(id) {
  return request({
    url: '/task/' + id,
    method: 'delete'
  })
}
