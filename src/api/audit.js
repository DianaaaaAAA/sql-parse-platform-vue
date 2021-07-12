import request from '@/utils/request'

export function fetchAuditList() {
  return request({
    url: '/tisp/audit',
    method: 'get'
  })
}

export function auditSql(data) {
  return request({
    url: 'tispector/checksql',
    method: 'post',
    headers: { 'Content-Type': 'text/plain' },
    data
  })
}
