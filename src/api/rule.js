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
    method: 'get',
    params: { item }
  })
}

export function updateRules(data) {
  return request({
    url: '/tispector/rule/update',
    method: 'post',
    headers: { 'Content-Type': 'text/plain' },
    data
  })
}
