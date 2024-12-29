import request from '@/utils/request'

export function getCredit() {
  return request({
    url: '/api/v1/credit/get',
    method: 'get',
    data: {}
  })
}