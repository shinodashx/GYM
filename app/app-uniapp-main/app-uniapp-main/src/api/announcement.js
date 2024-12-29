import request from "@/utils/request";

export function getAnnouncements() {
  return request({
    url: "/api/v1/announcement/announcements",
    method: "get",
    data: {}
  });
}