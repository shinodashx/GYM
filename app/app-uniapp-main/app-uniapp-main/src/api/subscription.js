import request from "@/utils/request";

export function getSubscription() {
  return request({
    url: "/api/v1/subscription/get",
    method: "post",
    data: {}
  });
}

export function addSubscription(data) {
  return request({
    url: "/api/v1/subscription/add",
    method: 'post',
    data
  })
}

export function cancelSubscription(data) {
  return request({
    url: "/api/v1/subscription/cancel",
    method: 'post',
    data
  })
}