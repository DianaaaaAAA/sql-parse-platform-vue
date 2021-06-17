import request from '@/utils/request'

export function fetchUsersList() {
  return request({
    url: '/tisp/user',
    method: 'get'
  })
}
