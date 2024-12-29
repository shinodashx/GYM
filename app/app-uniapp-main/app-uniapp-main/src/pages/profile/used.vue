<template>

  <view class="order-list">

    <u-list>
      <u-list-item
          v-for="(item, index) in orders"
          :key="index"
          :arrow="true"
          hight="200"
      >
        <OrderCard :order="item"></OrderCard>
      </u-list-item>
    </u-list>

  </view>
</template>

<script>

import {getOrders} from '../../api/order';
import OrderCard from '../../components/order-card';

export default {
  components: {
    OrderCard
  },
  data() {
    return {
      orders: [],
      isLoading: true,
      list: ['All','UnPay', 'To use', 'Payed'],
      current: 1,
      orderTag: 'All',
      curNow: 0
    }
  },
  methods: {
    async getOrdersList() {
      this.isLoading = true;
      await getOrders().then(res => {
        this.orders = res.data.order;
        this.isLoading = false;
        // sort by time
        this.orders.sort((a, b) => {
          return new Date(b.time) - new Date(a.time);
        });
        // reverse the order
        this.orders.reverse();
      }).catch(err => {
        this.isLoading = false;
        console.log(err);
      })

      // 设置每个order的startTime和endTime 只显示到分钟
      for (let i = 0; i < this.orders.length; i++) {
        let startTime = this.orders[i].order.startTime.split(" ")[1].substring(0,5)
        let endTime = this.orders[i].order.endTime.split(" ")[1].substring(0,5)
        startTime = this.orders[i].order.startTime.split(" ")[0] + " " + startTime
        this.orders[i].order.startTime = startTime
        this.orders[i].order.endTime = endTime
      }
      let item;
      let tmp = []
      for(item in this.orders){
        if(this.orders[item].order.status === 3){
          //remove the order
          tmp.push(this.orders[item])
        }
      }
      this.orders = tmp
    },

    async getOrderByTag(e){
      this.curNow = e;
      console.log(e)
      this.isLoading = true;
      await getOrders().then(res => {
        this.orders = res.data.order;
        this.isLoading = false;
        // sort by time
        this.orders.sort((a, b) => {
          return new Date(b.time) - new Date(a.time);
        });
        // reverse the order
        this.orders.reverse();
      }).catch(err => {
        this.isLoading = false;
        console.log(err);
      })

      // 设置每个order的startTime和endTime 只显示到分钟
      for (let i = 0; i < this.orders.length; i++) {
        let startTime = this.orders[i].order.startTime.split(" ")[1].substring(0,5)
        let endTime = this.orders[i].order.endTime.split(" ")[1].substring(0,5)
        startTime = this.orders[i].order.startTime.split(" ")[0] + " " + startTime
        this.orders[i].order.startTime = startTime
        this.orders[i].order.endTime = endTime
      }
      if (e === 0) {
        this.orderTag = 'All'
      } else if (e === 1) {
        // if status is not 0, remove the order
        let item;
        let tmp = []
        for(item in this.orders){
          if(this.orders[item].order.status === 0){
            //remove the order
            tmp.push(this.orders[item])
          }
        }
        this.orders = tmp
      } else if (e === 2) {
        // status = 1
        let item;
        let tmp = []
        for(item in this.orders){
          if(this.orders[item].order.status === 1){
            //remove the order
            tmp.push(this.orders[item])
          }
        }
        this.orders = tmp
      } else if (e === 3) {
        // status =2 || status = 3
        let item;
        let tmp = []
        for(item in this.orders){
          if(this.orders[item].order.status === 2 || this.orders[item].order.status === 3){
            //remove the order
            tmp.push(this.orders[item])
          }
        }
        this.orders = tmp
      }
      let item;
      for(item in this.orders){
        console.log(this.orders[item].order.status)
      }
    },
  },
  onLoad() {
    this.getOrdersList();
  }

}
</script>

<style scoped>

.order-list {
  padding: 20rpx;
}
</style>

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