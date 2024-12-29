import request from "@/utils/request";

export function getAnnouncements() {
  return request({
    url: "/api/v1/announcement/announcements",
    method: "get",
    data: {}
  });
}
  export function addAnnouncement(title,content,image) {
    return request({
      url: "/api/v1/announcement/add",
      method: "post",
      data: {
        title:title,
        content:content,
        images:image,
      }
    });
  }
export function modifyAnnouncements(submitData) {
  return request({
    url: "/api/v1/announcement/modify",
    method: "Post",
    data: {
      id: submitData.id,
      title: submitData.title,
      content: submitData.content,
      images: submitData.images,
    }
  });
}
export function deleteAnnouncement(id) {
  return request({
    url: "/api/v1/announcement/delete",
    method: "post",
    data: {
      id: id,
    }
  });
}