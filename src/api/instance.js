import request from '@/utils/request'

export function fetchInstanceList() {
  return request({
    url: '/tisp/instance',
    method: 'get'
  })
}
