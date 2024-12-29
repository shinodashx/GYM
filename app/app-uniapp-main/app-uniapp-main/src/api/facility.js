import request from '@/utils/request'

export function getFacilities() {
    return request({
        url: '/api/v1/facility/facility',
        method: 'post'
    })
}

export function getFacilityDetail(id) {
    return request({
        url: '/api/v1/facility/detail',
        method: 'post',
        data: {
            id: id
        }
    })
}

export function getOccupiedTime(id) {
    return request(
        {
            url: '/api/v1/facility/place/occupied',
            method: 'post',
            data: {
                place_id: id
            }
        }
    )

}

export function getFacilityByTag(tag) {
    return request({
        url: '/api/v1/facility/tag',
        method: 'post',
        data: {
            tag: tag
        }
    })
}

export function getFacilityByTagName(tag) {
    return request({
        url: '/api/v1/facility/tag/name',
        method: 'post',
        data: {
            name: tag
        }
    })
}

export function getFacilityBySearch(search) {
    return request({
        url: '/api/v1/facility/search',
        method: 'post',
        data: {
            search: search
        }
    })
}

export function getFacilityEvaluations(id) {
    return request({
        url: '/api/v1/evaluation/user/get',
        method: 'post',
        data: {
            facility_id: id
        }
    })
}

export function searchFacilityByName(name) {
    return request({
        url: '/api/v1/facility/search',
        method:'post',
        data: {
            name: name,
        }
    })
}

export function getAllEvaluation() {
    return request({
        url: '/api/v1/evaluation/get',
        method: 'post',
        data:{}
    
    })
}