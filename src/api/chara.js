import request from '@/utils/request'

export function fetchCharaList() {
  return request({
    url: '/tisp/chara',
    method: 'get'
  })
}
export function createChara(data) {
  return request({
    url: '/tisp/chara',
    method: 'post',
    msg
  })
}
export function updateChara(data) {
  return request({
    url: '/tisp/chara',
    method: 'put',
    msg
  })
}
