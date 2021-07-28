import request from '@/utils/request'

export function fetchAuditList() {
  return request({
    url: '/tisp/audit',
    method: 'get'
  })
}

export function auditSqlWithText(data) {
  return request({
    url: 'tispector/checksqlbyrules',
    method: 'post',
    headers: { 'Content-Type': 'text/plain' },
    data
  })
}

export function auditSqlWithFile(data) {
  return request({
    url: 'tispector/file/checksqlfile',
    method: 'post',
    headers: { 'Content-Type': 'text/plain' },
    data
  })
}
