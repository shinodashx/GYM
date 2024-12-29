import request from '@/utils/request'
import {sub} from "@dcloudio/vue-cli-plugin-uni/packages/postcss/tags";

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

export function editFacility(submitData) {
    return request({
        url: '/api/v1/facility/update',
        method: 'post',
        data: {
            id: submitData.id,
            name: submitData.FacilityName,
            description: submitData.Description,
            location: submitData.location,
            image: submitData.image,
            tags: submitData.tag,
            long: submitData.long,
            lat: submitData.lat,
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