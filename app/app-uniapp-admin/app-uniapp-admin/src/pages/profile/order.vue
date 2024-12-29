<template>

  <view class="order-list">
    <template>
      <u-subsection :list="list" mode="subsection" :current="1"></u-subsection>
    </template>
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
      list: ['未付款', '待评价', '已付款'],
      // 或者如下，也可以配置keyName参数修改对象键名
      // list: [{name: '未付款'}, {name: '待评价'}, {name: '已付款'}],
      current: 1
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
        console.log(this.orders);
      }).catch(err => {
        this.isLoading = false;
        console.log(err);
      })
    }
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
