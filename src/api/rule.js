import request from '@/utils/request'

export function fetchRuleList() {
  return request({
    url: '/tispector/rule/list',
    method: 'get'
  })
}
