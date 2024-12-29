import requests from '@/utils/request'

export function getDailyIncome(data) {
  return requests({
    url: '/api/v1/visualize/income/daily',
    method: 'POST',
    data
  })
}
