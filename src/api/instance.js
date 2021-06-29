import request from '@/utils/request'

export function fetchInstanceList() {
  return request({
    url: '/tispector/cluster/list',
    method: 'get'
  })
}

export function addInstance() {
  return request({
    url: '/tispector/cluster/list',
    method: 'post'
  })
}
