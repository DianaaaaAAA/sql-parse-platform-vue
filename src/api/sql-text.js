import request from '@/utils/request'

export function fetchSQLTextList() {
  return request({
    url: `/tispector/file/list`,
    method: 'get'
  })
}

export function uploadSQLText(formData) {
  return request({
    url: `/tispector/file/upload`,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function deleteSQLText(name) {
  return request({
    url: `/tispector/file/del?name=${name}`,
    method: 'get'
  })
}
