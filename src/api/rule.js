import request from '@/utils/request'

export function fetchRuleList() {
  return request({
    url: '/tisp/rule',
    method: 'get'
  })
}
