import request from '@/utils/request'

export function fetchSQLTextList() {
  return request({
    url: `/tispector/file/list`,
    method: 'get'
  })
}

export function addSQLText() {
  return request({
    url: `/tisp/sql-text`,
    method: 'post'
  })
}

export function deleteSQLText(name) {
  return request({
    url: `/tispector/file/del?name=${name}`,
    method: 'get'
  })
}
