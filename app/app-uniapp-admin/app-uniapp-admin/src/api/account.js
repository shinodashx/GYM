import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/api/v1/user/login',
        method: 'post',
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
export function getUserByName(username) {
    return request({
        url: '/api/v1/user/search',
        method: 'post',
        data:{
            Username:username,
        }
    })
}
export function getUserByID(id) {
    return request({
        url: '/api/v1/user/get',
        method: 'post',
        data:{
            Id : id,
        }
    })
}0
export function updateUser(user) {
    return request({
        url: '/api/v1/user/update',
        method: 'post',
        data:{
            id: user.id,
            role: user.role,
            username: user.username,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
        }
    })
}