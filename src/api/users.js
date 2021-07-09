import request from '@/utils/request'

export function fetchUsersList(query) {
  return request({
    url: '/tisp/user',
    method: 'get',
    params: query
  })
}

export function createUser(data) {
  return request({
    url: '/tisp/user',
    method: 'post',
    msg
  })
}

export function updateUser(data) {
  return request({
    url: '/tisp/user',
    method: 'put',
    msg
  })
}
