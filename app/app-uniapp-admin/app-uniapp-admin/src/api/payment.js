import request from '@/utils/request'

export function createPayment(data) {
    return request({
        url: '/api/v1/order/payment/create',
        method: 'post',
        data
    })
}
