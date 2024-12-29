import request from '@/utils/request'

export function createOrder(data) {
    return request({
        url: '/api/v1/order/create',
        method: 'post',
        data: data
    })
}

export function getOrders() {
    return request({
        url: '/api/v1/order/own',
        method: 'post',
        data: {}
    })
}

export function getAllOrders() {
    return request({
        url: '/api/v1/order/all',
        method: 'post',
        data: {}
    })
}
export function getOrdersById(id) {
    return request({
        url: '/api/v1/order/user',
        method: 'post',
        data: {
            userId:id,
        }
    })
}
export function getOrderById(code) {
    return request({
        url: '/api/v1/order/code',
        method: 'post',
        data: {
            orderCode: code,
        }
    })
}
export function startOrderByOrderCode(code) {
    return request({
        url: '/api/v1/order/start',
        method: 'post',
        data: {
            orderCode: code,
        }
    })
}
export function refundOrderByOrderCode(code) {
    return request({
        url: '/api/v1/order/refund',
        method: 'post',
        data: {
            orderCode: code,
        }
    })
}
export function payOrderByOrderCode(code) {
    return request({
        url: '/api/v1/order/pay-cash',
        method: 'post',
        data: {
            orderCode: code,
        }
    })
}
export function getOrderDetail(orderCode) {
    console.log(orderCode)
    return request({
        url: '/api/v1/order/code',
        method: 'post',
        data: {
            orderCode: orderCode
        }
    })
}