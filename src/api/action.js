import request from '@/utils/request'

export function fetchActionList() {
  return request({
    url: '/tisp/record',
    method: 'get'
  })
}

