import request from '@/utils/request'

export function fetchInstanceList() {
  return request({
    url: '/tispector/cluster/list',
    method: 'get'
  })
}

export function addInstance(data) {
  return request({
    url: '/tispector/cluster/add',
    method: 'post',
    headers: { 'Content-Type': 'text/plain' },
    data
  })
}

export function deleteInstanceByID(id) {
  return request({
    url: '/tispector/cluster/del',
    method: 'post',
    params: { id }
  })
}
