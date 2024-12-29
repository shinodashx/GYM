<template>
  <view class="card">
    <!--    <u-row>-->
    <!--      <u-text bold :text="order.order.orderCode" size="30"></u-text>-->
    <!--      <u-text align="right" :text="convertStatus(order.order.status)" size="30"></u-text>-->
    <!--    </u-row>-->
    <!--    <u-divider></u-divider>-->
    <view>

    </view>
    <u-text :text="order.place.name" size="35"></u-text>
    <u-divider></u-divider>
    <u-text :text="order.order.startTime + '-' + order.order.endTime" size="30"></u-text>
    <br />
    <u-row>
      <u-text color="grey" :text=" order.order.time" size="30"></u-text>
      <u-text align="right" :text="'Amount ' + order.order.amount" size="30"></u-text>
    </u-row>
    <!-- actions(detail, refund) -->
    <u-row>
      <u-button class="btn" type="primary" size="20" @click="toDetail">Detail</u-button>
    </u-row>
  </view>
</template>



<script>

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
    toRefund() {
      console.log("refund")
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