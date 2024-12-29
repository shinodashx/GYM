import request from '@/utils/request'

export function getBankList() {
  return request({
    url: '/api/v1/bank/banks',
    method: 'get'
  })
}

export function UpdateBank(data) {
  return request({
    url: '/api/v1/bank/update',
    method: 'post',
    data
  })
}

export function DeleteBank(data) {
  return request({
    url: '/api/v1/bank/delete',
    method: 'post',
    data
  })
}

export function AddBank(data) {
  return request({
    url: '/api/v1/bank/add',
    method: 'post',
    data
  })
}
