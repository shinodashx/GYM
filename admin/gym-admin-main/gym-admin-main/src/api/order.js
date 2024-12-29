import request from '@/utils/request'

export function getOrderList() {
  return request({
    url: '/api/v1/order/all',
    method: 'post'
  })
}

export function createOrder(data) {
  return request({
    url: '/api/v1/order/create',
    method: 'post',
    data
  })
}

export function RefundOrder(data) {
  return request({
    url: '/api/v1/order/refund',
    method: 'post',
    data
  })
}

export function getOrderDetailByOrderCode(data) {
  return request({
    url: '/api/v1/order/code',
    method: 'post',
    data
  })
}

export function StartOrderByOrderCode(data) {
  return request({
    url: '/api/v1/order/start',
    method: 'post',
    data
  })
}
