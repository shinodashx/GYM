<template>
  <view>
    <view class="facility">
      <view class="facility-title">
        <p class="facility-text" >Announcement Edit</p>
      </view>
    </view>
    <u-button type="primary" size="large" @click="addAnnouncement">Add Anouncement</u-button>
    <view class="cards" v-if="this.announcement.length>0">
      <uni-card padding="0" spacing="0" v-for="item in this.announcement" :key="item.id">
        <template v-slot:cover>
          <view class="custom-cover" @click="goDetail" :data-id="item.id">
            <view class="text-list">
              <u-text :text="item.title" color="black" size="35"></u-text>
              <u-text :text="item.content" color="black" size="35"></u-text>
              <u-text :text="item.updateTime" align="right" color="grey" size="25" prefixIcon="home"></u-text>
            </view>
          </view>
        </template>
        <view slot="actions" class="card-actions no-border">
          <view class="button">
            <u-button type="warning" size="small" @click="deleteAnnouncement(item.id)">Delete</u-button>
          </view>
          <view class="button">
            <u-button type="primary" size="small" @click="goDetail(item)">Edit</u-button>
          </view>
        </view>
      </uni-card>
    </view>
    <view v-else>
      <u-empty text="No result" icon="search" title="No Result" description="No Result"></u-empty>
    </view>
  </view>
</template>

<script>
import { getProfile, logout } from '../../api/account'
import { getSubscription } from '../../api/subscription'
import { getCredit } from "@/api/credit";
import { getWallet } from '../../api/account';
import {deleteAnnouncement, getAnnouncements} from "@/api/announcement";

export default {
  name: "Announcement",
  data() {
    return {
      user: {},
      subscription: {},
      announcement: {},
      isLogin: false,
      role: '',
      credit: {},
      wallet: {},
      isLoading: true,
    }
  },
  methods: {
    addAnnouncement(){
      uni.navigateTo({
        url: '/pages/Announcement/detail?id=-1'
      })
    },
    async deleteAnnouncement(id){
      deleteAnnouncement(id).then(res=>{
        console.log(this.announcement)
        alert("删除成功");
        location.reload()
      })
      this.getLoginStatus()
      console.log(this.isLogin)
      await this.getAnnouncement()
    },
    goDetail(announcement) {
      uni.navigateTo({
        url: '/pages/Announcement/detail?id=' + announcement.id
      })
    },
    async getAnnouncement(){
      await getAnnouncements().then(res=>{
        this.announcement = res.data.announcement;
        console.log(this.announcement)
        this.announcement.forEach(item=>{
          item.images = this.processImages(item.images);
        })
        for (let i = 0; i < this.announcement.length; i++) {
          let announcementText = this.announcement[i].title + this.announcement[i].content;
          this.announcementText.push(announcementText);
        }
        this.loadingAnnouncement = false;
        console.log(this.announcement);
      })
    },
    getLoginStatus() {
      let token = uni.getStorageSync('token')
      if (token) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    },
    async getUserProfile() {
      await getProfile().then(res => {
        this.user = res.data.data
        console.log(this.user)
        this.user.avatar = 'http://101.42.160.53:16800/' + this.user.avatar
      }).catch(err => {
        console.log(err)
      })
    },
    async getSubscription() {
      await getSubscription().then(res => {
        this.subscription = res.data.subscription
        console.log(this.subscription[0].subscriptionType)
        if (this.subscription[0].subscriptionType) {
          if (this.subscription[0].subscriptionType === 1) {
            this.role = 'Monthly Subscription'
          } else if (this.subscription[0].subscriptionType === 2) {
            this.role = 'Yearly Subscription'
          } else {
            this.role = 'Free'
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    async getCredit() {
      await getCredit().then(res => {
        this.credit = res.data.credit
        console.log(this.credit)
      }).catch(err => {
        console.log(err)
      })
    },
    async getWallet() {
      // this.isLoading = true;
      await getWallet().then(res => {
        this.wallet = res.data.info;
        this.isLoading = false;
        console.log(this.wallet);
      }).catch(err => {
        this.isLoading = false;
        console.log(err);
      })
    },
    async confirmLogout() {
      await logout().then(res => {
        console.log(res)
        uni.removeStorageSync('token')
        uni.navigateTo({
          url: '/pages/login/login'
        })
      }).catch(err => {
        console.log(err)
      })
    },
    toSetting() {
      uni.navigateTo({
        url: '/pages/profile/setting'
      })
    },
    toOrder() {
      uni.navigateTo({
        url: '/pages/profile/order'
      })
    },
    toWallet() {
      uni.navigateTo({
        url: '/pages/profile/wallet'
      })
    },

  },
  onLoad() {
    this.getLoginStatus()
    console.log(this.isLogin)
    if (this.isLogin) {
      this.getUserProfile()
      this.getSubscription()
      this.getCredit()
      this.getWallet()
      this.getAnnouncement()

    } else {
      uni.navigateTo({
        url: '/pages/login/login'
      })
    }
  },
  computed: {
    subscriptionBackgroundColor() {
      if (this.subscription[0].subscriptionType === 1) {
        // console.log)
        // light blue to dark blue
        return 'background-color: #fafdac'
      } else if (this.subscription[0].subscriptionType === 2) {
        console.log('white')
        // gold to 
        return 'background-color: #fafdac'
      } else {
        return 'background-color:white'
      }
    }
  }
}
</script>

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
.tag-bar{
  border-radius: 20rpx;
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
.facility {
  margin-left: 20rpx;
  margin-right: 20rpx;
  padding: 10rpx;
  border-radius: 20rpx;
  margin-top: 10rpx;
  margin-bottom: 0rpx;
  background-color: #dfede7;
  border: 1px solid #dfede7;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  /*border-top: 5px solid white;*/

}

.facility-card {
  width: 45%;
  display: flex;

}

.facility-title{
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #dfede7;
}
.facility-text {
  margin-left: 40rpx;
  font-size: 40rpx;
  margin-top: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #dfede7;
}
.cards {
  margin: 20rpx;
  background-color: white;
  padding: 20rpx;
  border-radius: 20rpx;

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
  margin-bottom: 0;
}
.card-actions-item-text {
  font-size: 12px;
  color: #666;
  margin-left: 5px;
  margin-bottom: 0;
}
}

</style>