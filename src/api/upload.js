import request from '@/utils/request'

export function uploadText(data) {
  return request({
    url: '/vue-element-admin/upload/text', // 后端接口url
    method: 'post',
    data
  })
}

export function uploadFile(token) {
  return request({
    url: '/vue-element-admin/upload/info',
    method: 'get',
    params: { token }
  })
}
