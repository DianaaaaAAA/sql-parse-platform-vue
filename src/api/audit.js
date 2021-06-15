import request from '@/utils/request'

export function fetchAuditList() {
  return request({
    url: '/tisp/audit',
    method: 'get'
  })
}
