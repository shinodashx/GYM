import request from '@/utils/request'

export function getWallet() {
    return request({
        url: '/api/v1/wallet/wallet',
        method: 'post',
        data: {}
    })
}

export function getBank() {
    return request({
        url: '/api/v1/bank/banks',
        method: 'get'
    })
}

export function bindCard(data) {
    return request({
        url: "/api/v1/card/bind",
        method: "post",
        data
    })
}