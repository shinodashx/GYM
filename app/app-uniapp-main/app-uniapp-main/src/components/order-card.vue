<template>
  <view class="card">
    <u-row>
      <u-text bold :text="order.order.orderCode" size="30"></u-text>
      <u-text align="right" :text="convertStatus(order.order.status)" size="30"></u-text>
    </u-row>
    <u-divider></u-divider>
    <u-row>
      <u-text :text="order.place.name" size="35"></u-text>
    </u-row>
    <br />
    <u-row>
      <u-col span="6">
        <u-text text="Time Range" size="28"></u-text>
      </u-col>
      <u-col span="6">
        <view>

        </view>
        <u-text margin-right color="grey" :text="order.order.startTime + '-' + order.order.endTime" size="28"></u-text>
      </u-col>

    </u-row>

    <u-row>
      <u-text :text="'Time of booking:'" size="28"></u-text>
      <u-text color="grey" :text=" order.order.time" align="right" size="28"></u-text>

    </u-row>
    <u-row>
      <u-text :text="'Actual paid:'" size="30"></u-text>
      <u-text color="grey" align="right" :text=" order.order.amount + '￥'" size="30"></u-text>
    </u-row>
    <!-- actions(detail, refund) -->
    <u-row>
      <u-button class="btn" type="primary" size="30" @click="toDetail">Detail</u-button>
      <u-button class="btn" type="primary" size="30" @click="toRefund" v-if="order.order.status!==3 && order.order.status !== 5">Refund</u-button>
      <u-button class="btn" type="primary" size="30"  v-if="order.order.status === 5">Refunded</u-button>
      <u-button class="btn" type="primary" size="30" @click="evaluate" v-if="order.order.status===3">Evaluate</u-button>
    </u-row>
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
          return "Pending"
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
    evaluate() {
      uni.navigateTo({
        url: '/pages/order/rate?orderCode=' + this.order.order.orderCode
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
</style>