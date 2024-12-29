<template>
  <view class="main" v-if="isLoading === false">
    <u-loading-page loading-mode="spinner"></u-loading-page>
    <view style="margin-left: 40rpx ">
      <u-text display="center" :text="convertStatus(order.order.status)" size="46"></u-text>
    </view>

    <view class="qrimg-border">
      <view class="qrimg">
        <tki-qrcode cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :icon="icon" :iconSize="iconsize"
          :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
      </view>
    </view>

    <view class="info">
      <u-row>
        <u-text text="Order Code" size="30"></u-text>
        <u-text :text="order.order.orderCode" align="right" size="30"></u-text>
      </u-row>
      <u-divider></u-divider>
      <u-row>
        <u-text text="Amount" size="30"></u-text>
        <u-text :text="order.order.amount" align="right" size="30"></u-text>
      </u-row>
      <u-row>
        <u-col span="4">
          <u-text text="Time Range" size="30"></u-text>
        </u-col>
        <u-col span="1.5">
          <u-row>
            <view class="start">
              <u-text :text="'start'" align="center" size="30" color="white"></u-text>
            </view>
          </u-row>
          <u-row>
            <view class="end">
              <u-text :text="'end'" align="center" size="30" color="white" position="center"></u-text>
            </view>
          </u-row>
        </u-col>
        <u-col span="6.5">
          <u-row>
            <u-text :text="order.order.startTime" align="right" size="30"></u-text>
          </u-row>
          <u-row>
            <u-text :text="order.order.endTime" align="right" size="30"></u-text>
          </u-row>
        </u-col>
      </u-row>
      <u-row>
        <u-text text="Facility" size="30"></u-text>
        <u-text :text="order.place.name" align="right" size="30"></u-text>
      </u-row>
      <u-row>
        <u-text text="Status" size="30"></u-text>
        <u-text :text="order.order.status" align="right" size="30"></u-text>
      </u-row>
    </view>
    <view class="btn">
      <u-button type="primary" @click="evaluate">Evaluate</u-button>
    </view>
  </view>
</template>

<script>
import { getOrderDetail, getRegularOrders } from '../../api/order';
import { getFacilityDetail } from '../../api/facility';
import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"

export default {
  components: {
    tkiQrcode
  },
  data() {
    return {
      id: '',
      val: '二维码',
      size: 200,
      unit: 'rpx',
      background: '#b4e9e2',
      foreground: '#309286',
      pdground: '#32dbc6',
      icon: '',
      iconsize: 40,
      lv: 3,
      onval: true,
      loadMake: true,
      src: '',
      order: {},
      isLoading: true,
      status: ''
    };
  },
  watch: {
    id(val) {
      if (!val) return
      this.getDetail()
    }
  },
  onLoad() {
    this.id = this.$route.query.orderCode
    console.log(this.id)
  },
  methods: {
    qrR(res) {
      this.src = res
    },
    async getDetail() {
      let length = this.id.length
      if (length === 17) {
        await getOrderDetail(this.id).then(res => {
          console.log(res)
          this.order = res.data.order
          this.val = this.order.order.orderCode
          this.isLoading = false
          // this.getFacilityDetails(res.data.order.order.facilityId)
        }).catch(err => {
          console.log(err)
        })

        let startTime = this.order.order.startTime.split(" ")[1].substring(0, 5)
        let endTime = this.order.order.endTime.split(" ")[1].substring(0, 5)
        startTime = this.order.order.startTime.split(" ")[0] + " " + startTime
        endTime = this.order.order.endTime.split(" ")[0] + " " + endTime
        this.order.order.startTime = startTime
        this.order.order.endTime = endTime
      } else if (length === 18) {
        await getRegularOrders(this.id).then(res=>{
          this.$router.push({
            path: '/pages/order/order',
          })
        })
      }

    },
    async getFacilityDetails(id) {
      await getFacilityDetail(id).then(res => {
        console.log(res)
        this.order.place = res.data.facility
      }).catch(err => {
        console.log(err)
      })
    },
    evaluate() {
      uni.navigateTo({
        url: '/pages/order/rate?orderCode=' + this.id
      })
    },
    convertStatus(status) {
      switch (status) {
        case 0:
          return "Waiting for payment"
        case 1:
          return "Pending Use"
        case 2:
          return "Using"
        case 3:
          return "Done"
        case 4:
          return "Cancelled"
        case 5:
          return "Refunded"
      }
    }
  }
}
</script>

<style scoped>
.main {
  height: 800rpx;
  background: linear-gradient(180deg, #86d45f, rgba(0, 0, 0, 0));
}

.qrimg-border {
  display: flex;
  justify-content: center;
  background-color: white;
  margin-left: 40rpx;
  margin-right: 40rpx;
  margin-top: 20rpx;
  border-radius: 20rpx;
}

.qrimg {
  display: flex;
  justify-content: center;
  background-color: white;
  margin-left: 40rpx;
  margin-right: 40rpx;
  margin-top: 20rpx;
  margin-bottom: 20rpx;
  border-radius: 20rpx;
}

.info {
  margin: 40rpx;
  background-color: white;
  border-radius: 20rpx;
  padding: 20rpx;
}

.start {
  background-color: #004098;
  border-radius: 50%;
  width: 90rpx;
  height: 40rpx;
}

.end {
  background-color: #004098;
  border-radius: 50%;
  width: 90rpx;
  height: 40rpx;
}
</style>