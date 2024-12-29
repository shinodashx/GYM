import request from '@/utils/request'

export function getConfig() {
  return request({
    url: '/api/v1/config/get',
    method: 'get'
  })
}

export function updateConfig(data) {
  return request({
    url: '/api/v1/config/update',
    method: 'post',
    data
  })
}
