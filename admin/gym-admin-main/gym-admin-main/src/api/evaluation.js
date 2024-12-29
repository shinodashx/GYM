import request from '@/utils/request'

export function getEvaluation(data) {
  return request({
    url: '/api/v1/evaluation/admin/get',
    method: 'POST',
    data
  })
}
