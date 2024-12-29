<template>
  <!-- <view class="content"> -->
  <view>
    <view class="search-bar" >
      <!--      search -bar-->

      <u-input v-model="username" height="60" actionText="Go" placeholder="Please input username" >
      </u-input>
      <u-gap height="20" bgColor="#f3f3f3"></u-gap>

      <u-button type="primary" size="small" @click="getUser">Search</u-button>
    </view>
    <u-gap height="50" bgColor="#f3f3f3"></u-gap>

    <template>
      <uni-card class="tag-bar">

        <view class="facility-info">
          <u-form>
          <u-form-item prop="userInfo.name" borderBottom ref="item1" >
            <u-text size='30' text="UserID:"></u-text>
            <u-text border="none" size="30" :text="this.user.id"></u-text>
          </u-form-item>
          <u-form-item prop="userInfo.name" borderBottom ref="item1" >
            <u-text size='30' text="Username:"></u-text>
            <u-input v-model="user.username" border="none" size="50" :placeholder="this.username"></u-input>
          </u-form-item>
          <u-form-item prop="userInfo.name" borderBottom ref="item1" >
            <u-text size='30' text="Password:"></u-text>
            <u-input border="none" size="50" placeholder=""></u-input>
          </u-form-item>
          <u-form-item prop="userInfo.name" borderBottom ref="item1" >
            <u-text size='30' text="Email:"></u-text>
            <u-input v-model="user.email" border="none" size="50" :placeholder="this.user.email"></u-input>
          </u-form-item>
          <u-form-item prop="userInfo.name" borderBottom ref="item1" >
            <u-text size='30' text="Phone:"></u-text>
            <u-input v-model="user.phone" border="none" size="50" :placeholder="this.user.phone"></u-input>
          </u-form-item>
          <u-form-item prop="userInfo.name" borderBottom ref="item1" >
            <u-text size='30' text="Glender:"></u-text>
            <u-input v-model="user.gender" border="none" size="50" :placeholder="this.user.gender"></u-input>
          </u-form-item>
          <u-form-item prop="userInfo.name" borderBottom ref="item1" >
            <u-text size='30' text="Role:"></u-text>
            <u-input v-model="user.role" border="none" size="50" :placeholder="this.user.role"></u-input>
          </u-form-item>
            <u-form-item prop="userInfo.name" borderBottom ref="item1" >
              <u-text size='30' text="updateTime:"></u-text>
              <u-text border="none" size="30" :text="this.user.updateTime"></u-text>
            </u-form-item>
            <u-form-item prop="userInfo.name" borderBottom ref="item1" >
              <u-text size='30' text="loginTime:"></u-text>
              <u-text border="none" size="30" :text="this.user.loginTime"></u-text>
            </u-form-item>
          </u-form>
          <u-button type="primary" size="large" @click="updateUser">Update</u-button>
        </view>
      </uni-card>
    </template>
    <view class="cards" v-if="searched">
      <u-text size='50' text="Content:"></u-text>
    </view>
    <view v-else>
    </view>
    <!--    </view>-->

  </view>
  <!-- </view> -->
</template>

<script>

import {getUser, getUserByName, updateUser} from "@/api/account";

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
      username:"",
      searched: false,
      facility: [],
      loadingFacility: true,
      announcement: [],
      tags: [],
      user:{},
      tagName: [],
      isLoading: true,
      announcementImages:[],
      announcementText:[],

    }
  },
  methods: {
    async updateUser(){
      if(this.user.role === "normal user"){
      this.user.role = 0;
    }else if(this.user.role === "admin"){
      this.user.role = 1;
    }else if(this.user.role === "manager"){
      this.user.role = 2;
    }
      if(this.user.gender === "male"){
        this.user.gender = 1
      }else{
        this.user.gender = 2
      }
      let res = await updateUser(this.user);
      await this.getUser()
      alert("修改成功");
    },
    async getUser(){
      let res = await getUserByName(this.username);
      if(res.data.user===null){
        return;
      }
      this.user = res.data.user[0];
      if(this.user.role === 0){
        this.user.role = "normal user";
      }else if(this.user.role === 1){
        this.user.role = "admin";
      }else if(this.user.role === 2){
        this.user.role = "manager";
      }
      if(this.user.gender === 1){
        this.user.gender = "male"
      }else{
        this.user.gender = "female"
      }
    },
    // 跳转到详情页
    goDetail(e) {
      uni.navigateTo({
        url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id
      })
    },
    processImages(images) {
      let res = [];
      // split the images string into an array
      let imageArray = images.split(',');
      // loop through the array and add the url to the image object
      imageArray.forEach((image, index) => {
        res.push({
          url: 'http://101.42.160.53:16800/' + image,
          id: index
        })
      })
      return res;

    },

  },
  onLoad() {
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
