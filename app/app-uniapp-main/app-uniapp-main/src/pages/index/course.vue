<template>
  <view>

    <u-gap height="20" bgColor="#f3f3f3"></u-gap>

    <view class="cards" v-if="courseList.length>0">
      <uni-card padding="0" spacing="0" v-for="item in courseList" :key="item.id">
        <template v-slot:cover>
          <view class="custom-cover" @click="goVideo" :data-id="item.id">
            <image class="cover-image" mode="aspectFill" :src="item.images[0].url">
            </image>
            <view class="cover-content">
              <text>{{ item.title }}</text>
            </view>
          </view>
        </template>
        <view class="text-list">
          <u-text :text="item.description" color="black" size="35"></u-text>
        </view>

      </uni-card>
    </view>
    <view v-else>
      <u-empty text="No result" icon="search" title="No Result" description="No Result"></u-empty>
    </view>
    <!--    </view>-->

  </view>
</template>

<script>
import {getFacilities, getFacilityByTagName} from "@/api/facility";
import {getAnnouncements} from "@/api/announcement";
import {getTags} from "@/api/tag";
import { getCourseList } from "../../api/course";

export default {
  data() {
    return {
      images: [{
        url: 'https://media.gettyimages.com/id/1385900794/zh/%E7%85%A7%E7%89%87/athletics-track.jpg?s=612x612&w=0&k=20&c=D61r_Ewr-RUi7JBq6jynRFujpNqOdc6Ew2WTpQ8eDmE=',
      }, {
        url: 'https://media.gettyimages.com/id/183252976/zh/%E7%85%A7%E7%89%87/stadium-ground-level.jpg?s=612x612&w=0&k=20&c=B57J8wyoin1JrVMtCjZ3FeNYn3F5j_VInCI-vB6qAT0=',
      }, {
        url: 'https://media.gettyimages.com/id/122155497/zh/%E7%85%A7%E7%89%87/grammar-school.jpg?s=612x612&w=0&k=20&c=Kr8DtgTUSOW6quSZjFFd_-0JoySxEhqcdG94ty0PmVA=',
      }],
      facility: [],
      loadingFacility: true,
      announcement: [],
      tags: [],
      tagName: [],
      isLoading: true,
      announcementImages:[],
      announcementText:[],
      courseList: [],
      loadingCourse: true,
    }
  },
  methods: {
    goDetail(e) {
      uni.navigateTo({
        url: '/pages/index/courseVideo'
      })
    },
    goVideo(e) {
      uni.navigateTo({
        url: '/pages/index/courseVideo?id=' + e.currentTarget.dataset.id
      })
    },
    processImages(images) {
      let res = [];
      // split the images string into an array
      let imageArray = images.split(',');
      // loop through the array and add the url to the image object
      imageArray.forEach((image, index) => {
        if ('http' !== image.substring(0, 4)) {
          
        res.push({
          url: 'http://101.42.160.53:16800/' + image,
          id: index
        })
      } else {
        res.push({
          url: image,
          id: index
        })
      }})
      return res;

    },
    async getFacility() {
      await getFacilities().then(res => {
        this.facility = res.data.facility;
        this.facility.forEach(item => {
          item.facility.images = this.processImages(item.facility.images);
        })
        this.loadingFacility = false;
        console.log(this.facility);
        // rand generate the human name for each facility
        this.facility.forEach(item => {
          item.facility.description = item.facility.name + " Course"
        })
      })
    },

    async fetchCourseList() {
      await getCourseList().then(res => {
        this.courseList = res.data.courses;
        this.courseList.forEach(item => {
          item.images = this.processImages(item.image);
        })
        this.loadingCourse = false;
        console.log(this.courseList);
      })
    },

    async getTags() {
      await getTags().then(res => {
        this.tags = res.data.tags;
        this.loadingTags = false;
        this.tagName.push(
            {
              name:'All'
            }
        )
        this.tagName.push({
          name: 'basketball'
        })
        this.tagName.push({
          name: 'football'
        })
        this.tagName.push({
          name: 'tennis'
        })
        this.tagName.push({
          name: 'swimming'
        })
        this.tagName.push({
          name: 'badminton'
        })
        this.tagName.push({
          name: 'table tennis'
        })
        this.tagName.push({
          name: 'volleyball'
        })


        console.log(this.tagName);
      })
    },
    async getFacilityByTagName(e){
      if (e.name == 'All'){
        await this.getFacility();
        return;
      }
      await getFacilityByTagName(e.name).then(res => {
        this.facility = res.data.facility;
        this.facility.forEach(item => {
          item.facility.images = this.processImages(item.facility.images);
        })
        this.loadingFacility = false;
        console.log(this.facility);
      })
    },

  },
  onLoad() {
    this.fetchCourseList();
  },
}
</script>

<style scoped>

.text-list {
  padding: 20 rpx;
  margin: 20rpx;
}

.search-bar{
  margin-left: 0;
  margin-top: 20rpx;
  padding: 20rpx;
  margin-right: 20rpx;
  border-top-right-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
  background-color: white;
  height: 70rpx;
  /*  shadow of the card*/
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
.tag-bar{
  border-radius: 20rpx;
}
</style>
<style lang="scss">

.container {
  overflow: hidden;
}

.custom-cover {
  flex: 1;
  flex-direction: row;
  position: relative;
  radius: 20 rpx;
}

.cover-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  width: 100%;
  // white background
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  font-size: 14px;
  color: #fff;
}

.card-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 45px;
  border-top: 1px #eee solid;
}

.card-actions-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.card-actions-item-text {
  font-size: 12px;
  color: #666;
  margin-left: 5px;
}

.cover-image {
  width: 100%;
  height: 120px;
}

.no-border {
  border-width: 0;
}
</style>
<style scoped>
.profile-card {
  margin-left: 0 rpx;
  margin-right: 0 rpx;
  margin-top: 20 rpx;
  margin-bottom: 20 rpx;
  border-radius: 20 rpx;
  /*background: linear-gradient(to bottom, #EAE5C9, #6CC6CB);*/
  /*background: linear-gradient(to bottom right, #EAD6EE, #A0F1EA);*/
  background-color: #e4f0e5;
  padding: 20 rpx;
}

.avatar-card {
  margin-left: 20 rpx;
  margin-right: 0 rpx;
  margin-top: 20 rpx;
  margin-bottom: 20 rpx;
  background-color: rgba(0, 0, 0, 0);
  padding: 20 rpx;
  /*  hide border*/
  border: 0;

}

.vip-card {
  margin-left: 20 rpx;
  margin-right: 20 rpx;
  margin-top: 20 rpx;
  margin-bottom: 0;
  border-radius: 20 rpx;

}

.vip-profile-card {
  /*background-color: white;*/
  /*background: linear-gradient(to bottom, #EAE5C9, #6CC6CB);*/
  /*background: linear-gradient(to bottom right, #EAD6EE, #A0F1EA);*/

}


.user-info {
  margin-left: 40 rpx;
  margin-right: 0 rpx;
  margin-top: 20 rpx;
  margin-bottom: 20 rpx;
  border-radius: 20 rpx;
  padding: 20 rpx;
  justify-content: center;
  align-content: center;
}

.user-name {
  margin-left: 100rpx;
}

.main {
  background-color: #f3f3f3;
}

.avatar {
  /* width: 100%; */
  justify-content: center;
  align-content: center;
  display: flex;
  padding: 40 rpx;
  margin-top: 20rpx;
  margin-bottom: 20rpx;
}

.credit{
  margin-left: 20rpx;
}
.username {
  display: flex;
  margin-top: 20 rpx;
}

.credit-card {
  margin-top: 0;
  width: 70%;
}


.third-card {
  margin-top: 0;
  width: 100%;
}


.actions {
  margin-top: 60 rpx;
  margin-left: 20 rpx;
  margin-right: 20 rpx;
  margin-bottom: 40 rpx;
  display: flex;
  flex-direction: column;

  background-color: white;
  border-radius: 20 rpx;
  padding: 40 rpx;
}

.disabled-cell {
  color: black;
  background-color: #f6f6f6;
}

.logout {
  width: 95%;
  margin-top: 20 rpx;
}

.vip-card-content {
  padding: 20rpx;
  margin: 20rpx;
  border-radius: 20rpx;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>