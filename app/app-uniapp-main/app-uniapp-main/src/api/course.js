import request from "@/utils/request";

export function getCourseList() {
    return request({
        url:'/api/v1/course/list',
        method:'get',
    });
}


export function getCourseDetail(courseId) {
    return request({
        url:'/api/v1/course/get',
        method:'get',
        params:{
            id:courseId
        }
    });
}