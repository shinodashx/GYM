import request from '@/utils/request'

export function getFacilityList() {
  return request({
    url: '/api/v1/facility/facility',
    method: 'POST'
  })
}
export function modifyFacilityById(id, name, description, loca, image) {
  return request({
    url: '/api/v1/facility/update',
    method: 'POST',
    data: {
      'id': id,
      'name': name,
      'description': description,
      'location': loca,
      'image': image
    }
  })
}

export function addFacilityPlace(place) {
  return request({
    url: '/api/v1/facility/place/add',
    method: 'POST',
    data: place
  })
}

export function modifyFacilityPlace(data) {
  return request({
    url: '/api/v1/facility/place/update',
    method: 'POST',
    data
  })
}

export function addFacility(data) {
  return request({
    url: '/api/v1/facility/add',
    method: 'POST',
    data
  })
}

export function DeleteFacility(data) {
  return request({
    url: '/api/v1/facility/delete',
    method: 'POST',
    data
  })
}

export function DeletePlace(data) {
  return request({
    url: '/api/v1/facility/place/delete',
    method: 'POST',
    data
  })
}

export function GetFacilityDetail(data) {
  return request({
    url: '/api/v1/facility/detail',
    method: 'POST',
    data
  })
}

export function ModifyFacility(data) {
  return request({
    url: '/api/v1/facility/update',
    method: 'POST',
    data
  })
}

export function ModifyFacilityPlace(data) {
  return request({
    url: '/api/v1/facility/place/update',
    method: 'POST',
    data
  })
}

export function GetOccupiedPlace(data) {
  return request({
    url: '/api/v1/facility/place/occupied',
    method: 'POST',
    data
  })
}
