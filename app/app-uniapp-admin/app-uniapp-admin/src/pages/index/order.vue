<template>
  <view>
    <template>
      <uni-card class="tag-bar">
        <view class="facility-info">
          <u-form>
            <u-form-item prop="userInfo.name" borderBottom ref="item1" >
              <u-text size='30' text="OrderID:"></u-text>
              <u-text border="none" size="30" :text="this.order.order.id"></u-text>
            </u-form-item>
            <u-form-item prop="userInfo.name" borderBottom ref="item1" >
              <u-text size='30' text="UserName:"></u-text>
              <u-text border="none" size="30" :text="this.user.username"></u-text>
            </u-form-item>
            <u-form-item prop="userInfo.name" borderBottom ref="item1" >
              <u-text size='30' text="PlaceName:"></u-text>
              <u-text border="none" size="30" :text="this.order.place.name"></u-text>
            </u-form-item>
            <u-form-item prop="userInfo.name" borderBottom ref="item1" >
              <u-text size='30' text="PlaceCost:"></u-text>
              <u-text border="none" size="30" :text="this.order.place.cost"></u-text>
            </u-form-item>
            <u-form-item prop="userInfo.name" borderBottom ref="item1" >
              <u-text size='30' text="discount:"></u-text>
              <u-text border="none" size="30" :text="this.order.order.discount"></u-text>
            </u-form-item>
            <u-form-item prop="userInfo.name" borderBottom ref="item1" >
              <u-text size='30' text="status:"></u-text>
              <u-text border="none" size="30" :text="this.order.order.status"></u-text>
            </u-form-item>
            <u-form-item prop="userInfo.name" borderBottom ref="item1" >
              <u-text size='30' text="amount:"></u-text>
              <u-text border="none" size="30" :text="this.order.order.amount"></u-text>
            </u-form-item>
            <u-form-item prop="userInfo.name" borderBottom ref="item1" >
              <u-text size='30' text="Time:"></u-text>
              <u-text border="none" size="30" :text="this.order.order.time"></u-text>
            </u-form-item>
            <u-form-item prop="userInfo.name" borderBottom ref="item1" >
              <u-text size='30' text="StartTime:"></u-text>
              <u-text border="none" size="30" :text="this.order.order.startTime"></u-text>
            </u-form-item>
          <u-button type="primary" size="large" @click="startOrder">Start</u-button>
          <u-button type="warning" size="large" @click="refundOrder">Refund</u-button>
            <u-button type="error" size="large" @click="payOrder">pay cash</u-button>
          </u-form>
        </view>
      </uni-card>
    </template>
  </view>
</template>

<script>
import {getFacilityDetail} from "@/api/facility";
import {
  createOrder,
  getOrderById,
  payOrderByOrderCode,
  refundOrderByOrderCode,
  startOrderByOrderCode
} from "@/api/order";
import {addAnnouncement, getAnnouncements, modifyAnnouncements} from "@/api/announcement";
import {getUserByID, getUserByName} from "@/api/account";

export default {
  data(){
    return{
      title: "",
      content: "",
      user:{},
      submitted: false,
      order: {},
      submitData: {},
      announcement: {},
      loadingAnnouncement: true,
    }
  },
  methods: {
    payOrder(){
      payOrderByOrderCode(this.order.order.orderCode);
    },
    startOrder(){
      startOrderByOrderCode(this.order.order.orderCode);
    },
    refundOrder(){
      refundOrderByOrderCode(this.order.order.orderCode);
    },
    async getById(){
      let res = await getOrderById(this.id);
      this.order = res.data.order;
      await this.getUser();
      if(this.order.order.status);
      console.log(this.order);
      console.log(this.order.order);
      if(this.order.order.status === 0){
        this.order.order.status = "WaitingPayment";
      }else if(this.order.order.status === 1){
        this.order.order.status = "Pending";
      }else if(this.order.order.status === 2){
        this.order.order.status = "Doing";
      }else if(this.order.order.status === 3){
        this.order.order.status = "Done";
      }else if(this.order.order.status === 4){
        this.order.order.status = "Cancelled";
      }else if(this.order.order.status === 5) {
        this.order.order.status = "Refunded";
      }
    },
    async getUser(){
      let res = await getUserByID(this.order.order.userId);
      if(res.data.user===null){
        return;
      }
      this.user = res.data.user;
      console.log(this.user);
    },
    getSpecifyAnnouncement(){
      for(let i=0;i<this.announcements.length;i++){
        if(this.announcements[i].id === this.id){
          this.announcement = this.announcements[i];
          this.title = this.announcement.title;
          this.content = this.announcement.content;
        }
      }
    },
    modifyAnnouncement(){
      getAnnouncements(submitData).then(res=>{
        console.log(this.announcement)
      })
    },
    processImages(images) {
      let res = [];
      // split the images string into an array
      let imageArray = images.split(',');
      // loop through the array and add the url to the image object
      imageArray.forEach((image, index) => {
        res.push({
          url: 'http://101.42.160.53:16800/' + image,
          id: index
        })
      })
      return res;

    },
    async getDetail() {
      await getFacilityDetail(this.facilityId).then(
          res => {
            console.log(res)
            this.facility = res.data.facility
            this.facility.facility.images = this.processImages(this.facility.facility.images)
            this.isLoading = false
          }
      ).catch(err => {
        console.log(err)
      })
    },
    change(e) {
      console.log(e)
    },
    closeTime() {
      this.startTimeShow = false
      this.endTimeShow = false
    },
    placeDetail(e) {
      let id = e.name
      this.modalData = this.facility.places.find(item => item.id == id)
      this.form.placeId = id
      this.form.startTime = 'Select'
      this.form.endTime = 'Select'
      this.show = true
      console.log(this.modalData)
    },
    close() {
      this.show = false
    },
    confirmTime() {
      this.startTimeShow = false
      this.endTimeShow = false
    },
    calculateTotalTime() {
      if (this.form.startTime == 'Select' || this.form.endTime == 'Select') {
        return 'Select Time First'
      }
      let start = this.form.startTime
      let end = this.form.endTime
      let startTime = new Date(start)
      let endTime = new Date(end)
      let diff = endTime.getTime() - startTime.getTime()
      let hours = Math.floor(diff / (1000 * 60 * 60))
      // let minutes = Math.floor(diff / (1000 * 60)) - hours * 60
      return hours
    },
    timestamp2time(timestamp) {
      if (timestamp == 'Select') {
        return 'Select'
      }
      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() + ' ';
      if (D < 10) {
        D = '0' + D
      }
      var h = date.getHours() + ':';
      if (h < 10) {
        h = '0' + h
      }
      var m = date.getMinutes() + ':';
      if (m < 10) {
        m = '0' + m
      }
      var s = date.getSeconds();
      if (s < 10) {
        s = '0' + s
      }
      return Y + M + D + h + m + s;
    },
    calculateTotalCost() {
      let hours = this.calculateTotalTime()
      if (hours == 'Select Time First') {
        return 'Select Time First'
      }
      hours = parseInt(hours)
      return hours * this.modalData.cost + ' RMB'
    },
    async confirmOrder() {
      let data = {
        placeId: this.form.placeId,
        startTime: this.form.startTime,
        endTime: this.form.endTime,
      }
      console.log(data)
      await createOrder(data).then(
          res => {
            let orderCode = res.data.orderCode
            uni.navigateTo({
              url: '/pages/payment/payment?code=' + orderCode
            })
          }
      ).catch(err => {
        console.log(err)
      })
    },
    filter(mode, options) {
      if (mode === 'minute') {
        return options.filter((option) => option % 30 === 0);
      }
      if (mode === 'hour') {
        return options.filter((option) => Number(option) >= 8 && Number(option) <= 22);
      }
      return options;
    },
    showid(){
      console.log(this.id)
    }
  },
  onLoad(){
    this.id = this.$route.query.id
    this.getById();
    if(this.id!==-1){
      this.showid();
      this.getAnnouncement();
    }else{
      getAnnouncements();
      this.title = this.announcement.title;
      this.content = this.announcement.content;
      this.images = this.announcement.images;
    }
  }
}
</script>

<style scoped>
.places {
  /* padding: 20rpx;   */
  background-color: white;
  margin: 20rpx;
  border-radius: 20rpx;
}

.facility-info {
  margin-left: 0;
  margin-top: 0;
  padding: 20rpx;
  margin-right: 20rpx;
  border-top-right-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
  background-color: white;
  /*  shadow of the card*/
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  background-color: white;
}

.swiper-view {
  padding: 20rpx;
}

.no-place {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100%; */
  margin: auto;
}

.modal-view {
  padding: 20rpx;
  margin-top: 10rpx;
}

.number{
  font-size: 30rpx;
  font-weight: bold;
  margin-right: 25rpx;
  color: #333;
}
.info{
  margin-left: 0;
  margin-top: 20rpx;
  padding: 20rpx;
  margin-right: 20rpx;
  border-top-right-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
  background-color: white;
  height: 150rpx;
  /*  shadow of the card*/
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.item{
  margin-top: 20rpx;
}

</style>