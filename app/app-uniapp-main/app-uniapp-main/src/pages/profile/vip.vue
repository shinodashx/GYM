 <template>
  <view class="main" v-if="isLogin && isLoading === false">
    <u-loading-page loading-mode="spinner"></u-loading-page>

    <view class="header">
      <image src="user.profile" mode="" class="setting-btn"></image>
      <view class="uni-flex uni-row" style="align-items: center;">
        <u-row>
          <u-col span="4">
            <view class="img-profile">
              <image :src="user.avatar" mode="">

              </image>
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
    </view>



    <view class="select-bar2">
      <template>
        <u-subsection bold fontSize="22" :list="list" :current="curNow"  :animation="true" @change="changeType" style="border-radius: 20rpx 20rpx 0 0; font-size: 24;"></u-subsection>
      </template>
    </view>
    <view class="monthly-card" v-if="curNow === 0">

      <view style="margin-left: 20rpx; padding: 20rpx">
        <view>
          <u-text :text="'Rights and interests of members'" align="left" size="30" color="white" margin-top="20rpx" ></u-text>
        </view>
      </view>

      <view class="ricard">
        <u-gap height="20" ></u-gap>
        <view class='viptext'>
          <view>
            <u-text :text="'Identity mark'" align="left" size="30" color="#aa833e" margin-top="20rpx" ></u-text>
          </view>
        </view>
        <u-gap height="10" ></u-gap>
        <view class='viptext'>
          <view>
            <u-text :text="'Discount: Reserve 20% off'" align="left" size="30" color="#aa833e" margin-top="20rpx" ></u-text>
          </view>
        </view>
        <u-gap height="10" ></u-gap>
        <view class='viptext'>
          <view>
            <u-text :text="'Higher credit score calculation.'" align="left" size="30" color="#aa833e" margin-top="20rpx" ></u-text>
          </view>
        </view>
        <u-gap height="10" ></u-gap>
        <view class='viptext'>
          <view>
            <u-text :text="'Pre-order interest'" align="left" size="30" color="#aa833e" margin-top="20rpx" ></u-text>
          </view>
        </view>
        <u-gap height="20" ></u-gap>
      </view>
    </view>
    <view class="monthly-card" v-if="curNow === 1">
      <view style="margin-left: 20rpx; padding: 20rpx">
        <view>
          <u-text :text="'Rights and interests of members'" align="left" size="30" color="white" margin-top="20rpx" font-weight="bold" ></u-text>
        </view>
      </view>

      <view class="ricard">
        <u-gap height="20" ></u-gap>
        <view class='viptext'>
          <view>
            <u-text :text="'Identity mark'" align="left" size="30" color="#aa833e" margin-top="20rpx" ></u-text>
          </view>
        </view>
        <u-gap height="10" ></u-gap>
        <view class='viptext'>
          <view>
            <u-text :text="'Discount: Reserve 30% off'" align="left" size="30" color="#aa833e" margin-top="20rpx" ></u-text>
          </view>
        </view>
        <u-gap height="10" ></u-gap>
        <view class='viptext'>
          <view>
            <u-text :text="'Higher credit score calculation.'" align="left" size="30" color="#aa833e" margin-top="20rpx" ></u-text>
          </view>
        </view>
        <u-gap height="10" ></u-gap>
        <view class='viptext'>
          <view>
            <u-text :text="'Pre-order interest'" align="left" size="30" color="#aa833e" margin-top="20rpx" ></u-text>
          </view>
        </view>
        <u-gap height="20" ></u-gap>
      </view>
    </view>
    <u-gap height="40" bgColor="#f3f3f3"></u-gap>
    <view class="select-bar">
      <u-button @click="showPayment = true" class="select-bar1">pay</u-button>
    </view>

    <u-gap height="20" ></u-gap>
    <view class="select-bar">
      <u-button @click="cancel">cancel</u-button>
    </view>
    <u-gap height="80" bgColor="#f3f3f3"></u-gap>

      <view>
        <u-popup :show="showPayment" :round="10" mode="bottom" @close="showPayment=false" class="item">
          <view class="modal-view">
            <u-form label-position="left" label-width="200">
              <u-form-item label="Payment Type" borderBottom @click="showType = true">
                <u-input @click="showType = true" v-model="paymentType" disabled
                  placeholder="Please select payment type"></u-input>
                <u-icon slot="right" name="arrow-right"></u-icon>
              </u-form-item>
              <u-form-item label="Card" borderBottom v-if="paymentType === 'Card'" @click="showCards = true">
                <u-input @click="showCards = true" v-model="paymentCard" disabled
                  placeholder="Please select card"></u-input>
                <u-icon slot="right" name="arrow-right"></u-icon>
              </u-form-item>
            </u-form>
            <u-button type="primary" text="Pay" :loading="isLoading" @click="comfirmSubscription"></u-button>
          </view>
        </u-popup>
        <u-action-sheet @select="typeSelect" :show="showType" :actions="actions" title="Please select payment type"
          @close="showType = false">
        </u-action-sheet>
        <u-action-sheet @select="cardSelect" :show="showCards" :actions="cards" title="Please select card"
          @close="showCards = false">
        </u-action-sheet>

      </view>
    </view>
</template>

<script>
import { getProfile, logout } from '../../api/account'
import { getSubscription, addSubscription,cancelSubscription } from '../../api/subscription'
import { getCredit } from "@/api/credit";
import { getWallet } from '../../api/account';



import calendar from "@/components/uni-calendar/uni-calendar"
import UniCalendar from "@/components/uni-calendar/uni-calendar.vue";


export default {
  components: {
    UniCalendar,
    calendar
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
      VIP: 'VIP',
      credit_desc: 'Excellent credit',
      Renewal: 'Renewal',
      list: ['Monthly', 'Yearly'],
      vipType: 1,
      showType: false,
      showCards: false,
      showPayment: false,
      paymentCard: '',
      paymentType: '',
      cards: [],
      actions: [
        {
          name: 'Card',
          value: '1'
        },
        {
          name: 'Wallet',
          value: '2'
        }
      ],
      curNow: 0
    }
  },
  methods: {
    change(e) {
      console.log(e);
    },
    toClick(e) {
      console.log(e);
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
    typeSelect(e) {
      console.log(e)
      this.paymentType = e.name
      this.showType = false
    },
    async getUserWallet() {
      await getWallet().then(res => {
        console.log(res)
        this.wallet = res.data.info
        for (let i = 0; i < this.wallet.cards.length; i++) {
          this.cards.push({
            name: this.wallet.cards[i].cardAccount,
            value: this.wallet.cards[i].id
          })
        }
        console.log(this.cards)
      }).catch(err => {
        console.log(err)
      })
    },
    async cancel() {
      // a toast show up to confirm
      
      await cancelSubscription().then(res=>{
        console.log(res)
        uni.showToast({
            title: 'Cancel Successfully',
            icon: 'none',
            duration: 2000
          })
        this.getSubscription()
        this.getCredit()
        this.getWallet()
      }).catch(err=>{
        console.log(err)
      })

    },
    changeType(e){
      console.log(e)
      this.vipType = e + 1
      this.curNow = e
    },
    async comfirmSubscription() {
      let payT = 0
      if(this.paymentType === "Card"){
        payT = 1
      } else if(this.paymentType === "Wallet"){
        payT = 2
      }
      await addSubscription({
        "type": this.vipType,
        "payment_type": payT,
        "card_id": this.paymentCard,
      }).then(res => {
        uni.showToast({
            title: 'Subscribe Successfully',
            icon: 'none',
            duration: 2000
          })
        this.showPayment = false
        this.getSubscription()
        this.getCredit()
        this.getWallet()
      }).catch(err => {
        console.log(err)
      })
    },
    async getSubscription() {
      await getSubscription().then(res => {
        this.subscription = res.data.subscription
        console.log(this.subscription[0].subscriptionType)
        for (let i = 0; i < this.subscription.length; i++) {
          // this.subscriptionData.push({
          //   name: this.subscription[i].subscriptionType,
          //   value: this.subscription[i].subscriptionType
          // })
          if (this.subscription[i].subscriptionType === 1 && this.subscription[i].status === 0) {
            this.role = 'Monthly Subscription'
            this.VIP = 'VIP'
          } else if (this.subscription[i].subscriptionType === 2 && this.subscription[i].status === 0) {
            this.role = 'Yearly Subscription'
            this.VIP = 'VIP'
          } else {
            this.role = 'Free'
            this.VIP = 'Free'
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
          url: '/pages/profile/unLoginProfile'
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
    toSettings() {
      uni.navigateTo({
        url: '/pages/profile/settings'
      })
    },
    toProfile() {
      uni.navigateTo({
        url: '/pages/profile/profile'
      })
    },
    cardSelect(e) {
      console.log(e)
      this.paymentCard = e.name
      this.showCards = false
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
      this.getUserWallet()

    } else {
      uni.navigateTo({
        url: '/pages/profile/unLoginProfile'
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
.ricard{

  background-color: white;
  border-radius: 20rpx;
  padding: 20 rpx;
  /*  hide border*/
  border: 0;
}
.select-bar{
  /*background-color: linear-gradient(40deg, #f8e0c2 0%, #f3bd73 100%);*/
  background: linear-gradient(40deg,#f8e0c2, #f3bd73);
  margin-left: 20rpx;
  margin-right: 20rpx;
  border-radius: 20rpx;
}

.select-bar2{
  /*background-color: linear-gradient(40deg, #f8e0c2 0%, #f3bd73 100%);*/
  margin-left: 20rpx;
  margin-right: 20rpx;
  border-top-right-radius: 20rpx;
  border-top-left-radius: 20rpx;
}
.select-bar1{
  /*background-color: linear-gradient(40deg, #f8e0c2 0%, #f3bd73 100%);*/
  background: linear-gradient(40deg,#f8e0c2, #f3bd73);
  color: #694617;
  font-size: 30rpx;
  border-radius: 20rpx;
}
.viptext{
  margin-left: 20rpx;
  margin-right: 20rpx;
  padding: 20rpx;
  font-size: 24rpx;
  border-width: 5rpx;
  border-color: #f3bd73;
  border-style: solid;
  border-radius: 10rpx;
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


.monthly-card{
  margin-left: 20rpx;
  margin-right: 20rpx;
  background-color: navy;
  border-radius: 20rpx;
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
      color: white;
      margin-left: 20rpx;
      border: none;
      display: inline-block;
    }
  }

  .vip-sub {
    font-size: 30rpx;
    margin-bottom: 10rpx;
    color: black;
    margin-left: 20rpx;

    .usertag2 {
      color: white;
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