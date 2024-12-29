<template xmlns="">
  <view class="main" v-if="isLogin && isLoading === false">
    <!-- <u-loading-page loading-mode="spinner"></u-loading-page> -->

    <view class="header">
      <image src="user.profile" mode="" class="setting-btn"></image>
      <view class="uni-flex uni-row" style="align-items: center;">
        <u-row>
          <u-col span="4">
            <view class="img-profile">
              <image :src="user.avatar" mode="" @click="changeAvatar">

              </image>
              <u-popup :show="avatarModalShow" mode="center" @close="avatarModalShow = false"
                @open="avatarModalShow = true">
                <u-upload :fileList="avatar" @afterRead="afterRead" name="1" :maxCount="1"></u-upload>
              </u-popup>
            </view>
          </u-col>
          <u-col span="8">
            <view>
              <view class="nikename">
                {{ user.username }}
                <view class="usertag">{{ VIP }}
                </view>
              </view>
              <view class="nikename1">
                <view class="usertag1">{{ credit_desc }}
                </view>
              </view>
            </view>
          </u-col>
        </u-row>
      </view>
      <u-gap height="20"></u-gap>
      <view class="card-vip">
        <image src="user.profile" mode="" class="setting-btn"></image>
        <view class="uni-flex uni-row" style="align-items: center;">
          <u-row>

            <u-col span="8">
              <view>
                <view class="vip-sub">
                  <!--                  {{ user.username }}-->
                  <view class="usertag2">{{ role }}
                  </view>
                </view>
                <view class="vip-sub" @click="toVip">
                  <view class="usertag2">{{ Renewal }}
                  </view>
                </view>
              </view>
            </u-col>
            <u-col span="4">
              <view class="img-profile-vip">
                <image :src="cardUrl" mode="">
                </image>
              </view>
            </u-col>
          </u-row>
        </view>
      </view>
    </view>


    <view class="card-item">
      <u-row class="card-item-content ">
        <u-col span="3.5" v-for="( item, index ) in orderList" :key="index">
          <view class="icon-wrap" @click="goOrder(index)">
            <image :src="'../../static/kitty-PersonalCenter/' + item.icon + '.png'" mode=""></image>
            <view class="badge" v-if="item.padge > 0">{{ item.padge }}</view>
          </view>
          <view @click="goOrder(index)">{{ item.text }}</view>
        </u-col>
        <u-col span="3">
          <view class="icon-wrap" @click="toOrder">
            <image src="../../static/kitty-PersonalCenter/dingdan.png" mode=""></image>
          </view>
          <view @click="toOrder">All</view>
        </u-col>
      </u-row>
    </view>




    <view style="margin-top: 0">
      <u-grid col="2" class="third-card">
        <u-grid-item style="margin-top: 0">
          <uni-card class="credit-card">
            <u-row>
              <u-col span="6">
                <u-tag text="credit:" type="warning"></u-tag>
              </u-col>
              <u-col span="7">
                <view class="credit">
                  <!--                  <u-text color="black" size="25" align="left" :text="credit.credit"></u-text>-->
                  <u-count-to :startVal="1" :endVal="credit.credit"></u-count-to>
                </view>
              </u-col>
            </u-row>

          </uni-card>
        </u-grid-item>
        <u-grid-item>
          <uni-card class="credit-card">
            <u-row>
              <u-col span="6">
                <u-tag text="wallet:" type="warning"></u-tag>
              </u-col>
              <u-col span="7">
                <view class="credit">
                  <!--                  <u-text color="black" size="25" align="left" :text="credit.credit"></u-text>-->
                  <u-count-to :startVal="1" :endVal="wallet.wallet.amount" :decimals="2"></u-count-to>
                </view>
              </u-col>
            </u-row>

          </uni-card>
        </u-grid-item>
        <!--        <u-grid-item>-->
        <!--          <u-cell-group>-->
        <!--            <u-text color="black" size="25" align="left" :text="wallet.wallet.amount"></u-text>-->
        <!--          </u-cell-group>-->
        <!--        </u-grid-item>-->
      </u-grid>
    </view>
    <view class="bot">
      <u-row>
        <u-col span="3">
          <view class="img-service" @click="toBot">
            <image src="../../static/bot.svg" mode="" style="height: 80rpx; width: 80rpx;"></image>
          </view>
        </u-col>
        <u-col span="9">
          <u-row>
            <u-text color="#694617" size="25" align="left" :text="'Intelligent customer service'" @click="toBot"></u-text>
          </u-row>
          <u-row>
            <u-text color="#694617" size="25" align="left" :text="'Online 24 hours a day'" @click="toBot"></u-text>
          </u-row>
        </u-col>
      </u-row>
    </view>
    <view class="actions">
      <u-cell-group>
        <u-cell icon="../../static/setting.svg" title="Setting" isLink @click="toSettings"></u-cell>
      </u-cell-group>
    </view>
    <u-gap height="20" bgColor="#f3f3f3"></u-gap>
    <view class="actions">
      <u-cell-group>
        <!--        <u-cell icon="setting-fill" title="Profile Setting" @click="toSetting" isLink></u-cell>-->
        <u-cell icon="../../static/wallet.svg" title="Wallet" @click="toWallet" isLink></u-cell>
        <u-cell icon="../../static/card.svg" title="Card" @click="toCard" isLink></u-cell>
        <u-cell icon="../../static/order.svg" title="Order" @click="toOrder" isLink></u-cell>
        <!--        <u-cell icon="integral-fill" title="Order" isLink></u-cell>-->
      </u-cell-group>
    </view>

    <u-gap height="20" bgColor="#f3f3f3"></u-gap>
    <view class="actions">
      <u-cell-group>
        <!--        <u-cell icon="setting-fill" title="Profile Setting" @click="toSetting" isLink></u-cell>-->
        <u-cell icon="../../static/VIP.svg" title="VIP center" @click="toVip" isLink></u-cell>
        <u-cell icon="../../static/service.svg" title="Service" @click="toBot" isLink></u-cell>
        <!--        <u-cell icon="integral-fill" title="Order" isLink></u-cell>-->
      </u-cell-group>
    </view>

    <u-gap height="80" bgColor="#f3f3f3"></u-gap>
    <u-button class="logout" type="error" @click="confirmLogout">Logout</u-button>
  </view>
  <view v-else-if="isLoading === false ||  isLogin === false">
    <unLoginProfile></unLoginProfile>
  </view>
</template>

<script>
import { getProfile, logout, updateAvatar } from '../../api/account'
import { getSubscription } from '../../api/subscription'
import { getCredit } from "@/api/credit";
import { getWallet } from '../../api/account';



import calendar from "@/components/uni-calendar/uni-calendar"
import UniCalendar from "@/components/uni-calendar/uni-calendar.vue";
import unLoginProfile from './unLoginProfile.vue';


export default {
  components: {
    UniCalendar,
    calendar,
    unLoginProfile
  },

  data() {
    return {
      user: {},
      subscription: {},
      isLogin: false,
      role: '',
      credit: {},
      wallet: {},
      isLoading: true,
      cardUrl: '../../static/gymmmio-business-card-by-naeem-maya-dribbble.png',
      subscriptionData: [],
      date: '2019-03-10',
      orderList: [
        { icon: 'yinhangka', text: 'InPay', padge: 0 },
        { icon: 'rili', text: 'Unuse', padge: 0 },
        { icon: 'anquan', text: 'Used', padge: 0 }
      ],
      VIP: '',
      credit_desc: 'Excellent credit',
      Renewal: 'Renewal',
      avatarModalShow: false,
      avatar: [],
      avatarUrl: '',
    }
  },
  methods: {
    change(e) {
      console.log(e);
    },
    toClick(e) {
      console.log(e);
    },
    toBot() {
      uni.navigateTo({
        url: '/pages/bot/bot'
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
        // console.log(this.subscription[0].subscriptionType)
        this.role = 'Free'
        this.VIP = 'Free'
        this.Renewal = 'Buy VIP now'
        for (let i = 0; i < this.subscription.length; i++) {
          // this.subscriptionData.push({
          //   name: this.subscription[i].subscriptionType,
          //   value: this.subscription[i].subscriptionType
          // })
          if (this.subscription[i].subscriptionType === 1 && this.subscription[i].status === 0) {
            this.role = 'Monthly subscription'
            this.VIP = 'VIP'
            this.Renewal = '20% discount for booking'
          } else if (this.subscription[i].subscriptionType === 2 && this.subscription[i].status === 0) {
            this.role = 'Yearly subscription'
            this.VIP = 'VIP'
            this.Renewal = '30% discount for booking'
          } else {
            this.role = 'Free'
            this.VIP = 'Free'
            this.Renewal = 'Buy VIP now'
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
        this.isLogin = false
        this.user = {}
        this.subscription = {}
        this.role = ''
        this.credit = {}
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
    toSettings() {
      uni.navigateTo({
        url: '/pages/profile/settings'
      })
    },
    toVip() {
      uni.navigateTo({
        url: '/pages/profile/vip'
      })
    },
    toCard() {
      uni.navigateTo({
        url: '/pages/profile/card'
      })
    },
    goOrder(e) {
      console.log(e)
      if (e === 0) {
        uni.navigateTo({
          url: '/pages/profile/inpay'
        })
      } else if (e === 1) {
        uni.navigateTo({
          url: '/pages/profile/unuse'
        })
      } else if (e === 2) {
        uni.navigateTo({
          url: '/pages/profile/used'
        })
      } else {
        uni.navigateTo({
          url: '/pages/profile/order'
        })
      }
    },
    changeAvatar() {
      this.avatarModalShow = true
    },
    async changeAvatarReq() {
      await updateAvatar({
        "Avatar": this.avatarUrl
      }).then(res => {
        console.log(res)
        this.avatarModalShow = false
        this.getUserProfile()
      }).catch(err => {
        console.log(err)
      })
    },
    async afterRead(event) {
      console.log(event)
      let file = event.file
      let url = file.path
      let res = await this.uploadFilePromise(file.thumb)
      console.log(res)
      this.avatarUrl = res
      await this.changeAvatarReq()


    },
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: 'http://101.42.160.53:16800/api/v1/upload/avatar',
          filePath: url,
          name: 'file',
          success: (res) => {
            setTimeout(() => {
              let url = JSON.parse(res.data).data.url
              // push into array

              resolve(url)
            }, 1000)
          }
        });
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

    } else {
      // uni.navigateTo({
      //   url: '/pages/profile/unLoginProfile'
      // })
    }

  },
  onShow() {
    this.getLoginStatus()
    console.log(this.isLogin)
    if (this.isLogin) {
      this.getUserProfile()
      this.getSubscription()
      this.getCredit()
      this.getWallet()

    } else {
      // uni.navigateTo({
      //   url: '/pages/profile/unLoginProfile'
      // })
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

.vip-card {
  margin-left: 20 rpx;
  margin-right: 20 rpx;
  margin-top: 20 rpx;
  margin-bottom: 0;
  border-radius: 20 rpx;

}

.vip-photo {
  justify-content: center;
  align-content: center;
  display: flex;
  padding: 40 rpx;
  margin-top: 0;
  margin-bottom: 2rpx;
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

.vip-info {
  margin-left: 60 rpx;
  margin-right: 0 rpx;
  margin-top: 0;
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

.credit {
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
  margin-top: 20rpx;
  border-radius: 20rpx;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  height: 200rpx;
}
</style>

<style lang="scss" scoped>
$item-margin-bottom: 30upx;
$item-margin-side: 20upx;
$line-color: #f9f9f9;
$border-color: #aa833e;

page {
  background-color: #f6f6f6;
}

.header {
  color: $uni-text-color-inverse;
  //background-image: linear-gradient( 40deg, rgb(95,210,183) 0%, rgb(231,239,142) 100%);
  //background-color: #e4f0e5;
  // 渐变,上面是#e4f0e5,下方透明
  //background: linear-gradient(to bottom, #e4f0e5, rgba(0,0,0,0));
  background: linear-gradient(175deg, #86d45f, rgba(0, 0, 0, 0));
  padding: 50rpx 30rpx;
  margin-bottom: 0;
  margin-top: 0;
  position: relative;

  .img-profile {
    margin-top: 0;
    width: 140rpx;

    //margin-right: 30upx;
    image {
      margin-top: 0;
      width: 140rpx;
      height: 140rpx;
      border-radius: 50%;
      vertical-align: middle;
      border: 2px solid;
    }
  }

  .img-profile-vip {
    width: 140rpx;
    //margin-right: 30upx;
    background-color: rgba(0, 0, 0, 0);

    image {
      width: 160rpx;
      height: 100rpx;
      vertical-align: middle;
      //border: 2px solid ;
      background-color: rgba(0, 0, 0, 0);
    }
  }

  .card-vip {
    margin-left: 60rpx;
    margin-right: 60rpx;
    margin-top: 20rpx;
    background-image: linear-gradient(40deg, rgb(95, 210, 183) 0%, rgb(231, 239, 142) 100%);
    border-radius: 20rpx;

    .img-vip {
      width: 140rpx;
      background-image: linear-gradient(40deg, rgb(95, 210, 183) 0%, rgb(231, 239, 142) 100%);

      //margin-right: 30upx;
      image {
        width: 220rpx;
        height: 170rpx;
        vertical-align: middle;
        border: 2px solid;
      }
    }
  }


  .usertag {
    padding: 0 20rpx;
    background-color: #f7b42b;
    border-radius: 30rpx;
    font-size: 24rpx;
    margin-right: 20rpx;
    border: 1px solid;
    line-height: 1.6;
    margin-top: 5rpx;
  }

  .usertag1 {
    padding: 0 20rpx;
    background-color: #579586;
    border-radius: 30rpx;
    font-size: 24rpx;
    margin-right: 20rpx;
    border: 1px solid;
    line-height: 1.6;
  }

  .usertag2 {
    padding: 0 20rpx;
    background-color: #579586;
    border-radius: 30rpx;
    font-size: 24rpx;
    margin-right: 20rpx;
    border: 1px solid;
    line-height: 1.6;
    margin-top: 5rpx;
  }

  .nikename {
    margin-top: 20rpx;
    font-size: 30rpx;
    margin-bottom: 10rpx;
    color: black;
    margin-left: 20rpx;
    padding-right: 20rpx;

    .usertag {
      margin-top: 5rpx;
      color: white;
      margin-left: 20rpx;
      border: none;
      display: inline-block;
    }
  }

  .nikename1 {
    font-size: 30rpx;
    margin-bottom: 10rpx;
    color: black;
    margin-left: 20rpx;
    padding-right: 20rpx;

    .usertag1 {
      color: white;
      border: none;
      display: inline-block;
    }
  }

  .nikename2 {
    margin-top: 20rpx;
    font-size: 30rpx;
    margin-bottom: 10rpx;
    color: black;
    margin-left: 20rpx;
    padding-right: 20rpx;

    .usertag2 {
      margin-top: 5rpx;
      color: #694617;
      margin-left: 20rpx;
      border: none;
      display: inline-block;
    }
  }

  .vip-sub {
    padding: 5rpx;
    margin-top: 5rpx;
    font-size: 30rpx;
    margin-bottom: 10rpx;
    color: black;
    margin-left: 20rpx;

    .usertag2 {
      background-image: linear-gradient(40deg, #f8e0c2 0%, #f3bd73 100%);
      color: #694617;
      margin-top: 5rpx;
      margin-left: 20rpx;
      border: none;
      display: inline-block;
    }
  }

  .setting-btn {
    width: 60rpx;
    height: 60rpx;
    position: absolute;
    top: 40rpx;
    right: 40rpx;
  }
}

.bot{
  background-image: linear-gradient(40deg, #f8e0c2 0%, #f3bd73 100%);
  height: 110rpx;
  margin-left: 30rpx;
  margin-right: 30rpx;
  margin-bottom: 10rpx;
  border-radius: 20rpx;
  padding: 20rpx;
  .img-service{
    width: 60rpx;
    height: 60rpx;
    margin-top: 10rpx;
    margin-left: 20rpx;
    margin-right: 20rpx;
    margin-bottom: 20rpx;
  }

}
.card-item {
  background-color: #fff;
  border-radius: 20rpx;
  //margin: 0 $item-margin-side $item-margin-bottom $item-margin-side;
  margin: 0 40rpx 0 40rpx;
  text-align: center;

  .text-bold {
    font-weight: 900;
    font-size: 1.2em;
  }

  .icon-wrap {
    width: 60rpx;
    position: center;

    image {
      width: 60rpx;
      height: 60rpx;
      vertical-align: top;
      position: center;
    }

    .badge {
      font-size: 20rpx;
      width: 30rpx;
      height: 30rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background-color: #dd524d;
      border-radius: 50%;
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  .card-item-header {
    text-align: left;
    font-size: 1.1em;
    font-weight: 600;
    border-bottom: 1px solid $line-color;
    padding: 15rpx 30rpx;
  }

  .card-item-content {
    // in the center
    display: flex;
    padding: 30rpx;
    justify-content: space-between;
  }

  .card-item-block {
    border-bottom: 1px solid $line-color;
    padding: 30rpx 0;
    align-items: center;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }

    &>view:first-child {
      width: 100rpx;
    }

    &-title {
      font-size: 1.1em;
      font-weight: 600;
    }

    &-title,
    &-disc {
      margin-left: 30upx;
      width: 340upx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    button {
      width: 150upx;
      margin-right: 0
    }
  }
}

.suggestion-title {
  justify-content: center;
  align-items: center;

  &>view:first-child,
  &>view:last-child {
    width: 100upx;
    height: 2upx;
    background-color: #ccc;
    margin: 0 20upx;
  }
}

.underlinetext {
  font-size: 24upx;
  color: #999;
  text-align: center;
  margin: 20upx;
}
</style>