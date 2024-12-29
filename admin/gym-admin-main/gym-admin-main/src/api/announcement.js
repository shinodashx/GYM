import request from '@/utils/request'

export function getAnnouncement() {
  return request({
    url: '/api/v1/announcement/announcements',
    method: 'GET'
  })
}

export function addAnnouncement(data) {
  return request({
    url: '/api/v1/announcement/add',
    method: 'POST',
    data
  })
}

export function modifyAnnouncement(data) {
  return request({
    url: '/api/v1/announcement/modify',
    method: 'POST',
    data
  })
}

export function deleteAnnouncement(data) {
  return request({
    url: '/api/v1/announcement/delete',
    method: 'POST',
    data
  })
}
