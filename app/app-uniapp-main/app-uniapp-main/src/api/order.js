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

export function evaluate(data) {
    return request({
        url: '/api/v1/evaluation/add',
        method: 'post',
        data: data
    })
}

export function createRegularOrder(data) {
    return request({
        url: '/api/v1/order/create-regular',
        method: 'post',
        data
    })
}

export function getRegularOrders(orderCode) {
    return request({
        url: '/api/v1/order/regular-info',
        method: 'post',
        data: {
            orderCode: orderCode
        }
    })
}

export function refund(orderCode) {
    return request({
        url: '/api/v1/order/refund',
        method: 'post',
        data: {
            orderCode: orderCode
        }
    })
}

