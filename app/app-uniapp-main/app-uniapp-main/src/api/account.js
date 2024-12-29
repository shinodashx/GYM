import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/api/v1/user/login',
        method: 'post',
        data
    })
}

export function register(data) {
    return request({
        url: '/api/v1/user/register',
        method:'post',
        data
    })
}

export function getProfile() {
    return request({
        url: '/api/v1/user/profile',
        method: 'post',
        data: {}
    })
}

export function logout() {
    return request({
        url: '/api/v1/user/logout',
        method: 'get'
    })
}

export function getWallet() {
    return request({
        url: '/api/v1/wallet/wallet',
        method: 'post',
        data: {}
    })

}

export function updateProfile(data) {
    return request({
        url: '/api/v1/user/profile/update',
        method: 'post',
        data
    })
} 


export function updateAvatar(data) {
    return request({
        url:'/api/v1/user/avatar/update',
        method: 'post',
        data
    })
}

export function changePassword(data) {
    return request({
        url:'/api/v1/change-passwd',
        method: 'post',
        data
    })
}