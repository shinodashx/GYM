<template>
  <view class="card" @click="toDetail">
    <view class="bg">
      <u-row style="background-color: #007aff; border-radius: 10rpx">
        <view style="margin-left: 10rpx">
          <u-text margin-left="10rpx" color="white" :text="order.place.name" size="35" ></u-text>
        </view>

      </u-row>
    </view>
    <u-row>
      <u-col span="9">
        <u-text text="Time Range" size="28"></u-text>
      </u-col>
      <u-col span="3">
        <u-text align="right" color="grey" :text="order.order.startTime + '-' + order.order.endTime" size="28"></u-text>
      </u-col>

    </u-row>
    <u-row>
      <u-text bold :text="order.order.orderCode" size="30"></u-text>
      <u-text align="right" :text="convertStatus(order.order.status)" size="30"></u-text>
    </u-row>
    <!-- actions(detail, refund) -->
  </view>
</template>



<script>
import { refund } from '../api/order'

export default {
  // OrderStatusWaitingPayment = 0 // waiting for payment
  // OrderStatusPending        = 1 // waiting for use
  // OrderStatusDoing          = 2 // using
  // OrderStatusDone           = 3 // done
  // OrderStatusCancelled      = 4 // canceled
  // OrderStatusRefunded       = 5 // refunded
  name: "OrderCard",
  props: {
    order: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    convertStatus(status) {
      switch (status) {
        case 0:
          return "Waiting for payment"
        case 1:
          return "Pending use"
        case 2:
          return "Doing"
        case 3:
          return "Done"
        case 4:
          return "Cancelled"
        case 5:
          return "Refunded"
      }
    },

    toDetail() {
      uni.navigateTo({
        url: '/pages/order/detail?orderCode=' + this.order.order.orderCode
      })
    },
    async toRefund() {
      console.log("refund")
      await refund(this.order.order.orderCode).then(res => {
        console.log(res)
        if (res.code == 0) {
          uni.showToast({
            title: 'Refund successfully',
            icon: 'none',
            duration: 2000
          })
        } else {
          uni.showToast({
            title: 'Refund failed',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    setTime(){
      // 只显示到分钟
      let startTime = this.order.order.startTime.split(" ")[1].substring(0,5)
    }
  },
}

</script>

<style scoped>
.card {
  padding: 20rpx;
  height: 20%;
  border-radius: 20rpx;
  background-color: white;
  margin: 20rpx;
}

.btn {
  margin: 10rpx;
}
.bg{
  background-color: #007aff;
  border-radius: 20rpx;
  padding: 0;
  margin: 0;
}
</style>