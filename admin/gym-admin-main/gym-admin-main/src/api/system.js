import request from '@/utils/request'

export function getLogs(data) {
  return request({
    url: '/api/v1/logs',
    method: 'POST',
    data
  })
}
