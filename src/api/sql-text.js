import request from '@/utils/request'

export function fetchSQLTextList() {
  return request({
    url: '/tisp/sql-text',
    method: 'get'
  })
}

export function addSQLText() {
  return request({
    url: '/tisp/sql-text',
    method: 'post'
  })
}
