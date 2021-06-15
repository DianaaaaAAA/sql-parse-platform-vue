import request from '@/utils/request'

export function fetchCharaList() {
  return request({
    url: '/tisp/chara',
    method: 'get'
  })
}

