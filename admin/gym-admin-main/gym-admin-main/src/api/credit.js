import request from '@/utils/request'

export function getCredit() {
  return request({
    url: '/api/v1/credit/all',
    method: 'GET'
  })
}
