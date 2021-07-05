import request from '@/utils/request'

export function fetchRuleList() {
  return request({
    url: '/tispector/rule/list',
    method: 'get'
  })
}

export function fetchRuleByItem(item) {
  return request({
    url: '/tispector/rule/getrulebyitem',
    method: 'post',
    params: { item }
  })
}
