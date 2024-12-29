import request from '@/utils/request'

export function getTags() {
    return request({
        url: '/api/v1/tag/all',
        method: 'get'
    })
}