import request from "@/utils/request";

export function getSubscription() {
  return request({
    url: "/api/v1/subscription/get",
    method: "post",
    data: {}
  });
}