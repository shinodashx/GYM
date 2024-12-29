<template>
  <view>
    <view class="facility">
      <view class="facility-title">
        <p class="facility-text" style="text-align: center">Order Editing</p>
      </view>
    </view>
    <view class="search-bar" >
      <!--      search -bar-->

      <u-input v-model="username" height="60" actionText="Go" placeholder="search by username" >
      </u-input>
      <u-gap height="20" bgColor="#f3f3f3"></u-gap>

      <u-button type="primary" size="small" @click="getUser">Search</u-button>
    </view>
    <view class="cards" v-if="this.orders.length>0">
      <uni-card padding="0" spacing="0" v-for="item in this.orders" :key="item.order.id">
        <template v-slot:cover>
          <view class="custom-cover" @click="goDetail" :data-id="item.id">
            <view class="text-list">
              <u-text :text="'Place: '+item.place.name" color="black" size="35"></u-text>
              <u-text :text="'Cost: '+item.order.amount" color="black" size="35"></u-text>
              <u-text :text="item.order.time" align="right" color="grey" size="25" prefixIcon="home"></u-text>
              <u-text :text="item.place.description" align="right" color="grey" size="25" prefixIcon="account"></u-text>
            </view>
          </view>
        </template>
        <view slot="actions" class="card-actions no-border">
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
import {getProfile, getUserByID, getUserByName, logout} from '../../api/account'
import { getSubscription } from '../../api/subscription'
import { getCredit } from "@/api/credit";
import { getWallet } from '../../api/account';
import {deleteAnnouncement, getAnnouncements} from "@/api/announcement";
import {getAllOrders, getOrders, getOrdersById} from "@/api/order";
import user from "@/pages/user/user.vue";

export default {
  name: "Announcement",
  data() {
    return {
      user: {},
      subscription: {},
      orders:{},
      isLogin: false,
      role: '',
      username:"",
      find: false,
      credit: {},
      wallet: {},
      isLoading: true,
    }
  },
  methods: {
    async getUser() {
      this.user = await getUserByName(this.username);
      if (this.user.data.user == null) {
        this.orders = {};
        this.find = false;
      } else {
        await this.getBOrders(this.user.data.user[0].id);
      }
    },
    async getBOrders(id){
      console.log(id)
      let res = await getOrdersById(id);
      this.orders = res.data.order;
      for(let i =0;i<this.orders.length;i++){
        let user = await getUserByID(this.orders[i].order.userId);
        this.orders[i].place.description = user.data.user.username;
      }
      this.find = true;
    },
    deleteAnnouncement(id){
      deleteAnnouncement(id).then(res=>{
        console.log(this.announcement)
      })
    },
    goDetail(order) {
      uni.navigateTo({
        url: '/pages/index/order?id=' + order.order.orderCode
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
    async getAOrders(){
      let res = await getAllOrders();
      this.orders = res.data.order;
      for(let i =0;i<this.orders.length;i++){
        let user = await getUserByID(this.orders[i].order.userId);
        this.orders[i].place.description = user.data.user.username;
      }
      this.find = true;
    }

  },
  onLoad() {
    this.getLoginStatus()
    if (this.isLogin) {
      this.getAOrders();
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