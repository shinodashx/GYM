<template>
  <view>
    <view class="facility-info">
      <u-form-item prop="userInfo.name" borderBottom ref="item1" >
        <u-text size='50' text="Title:"></u-text>
        <u-input v-model="title" border="none" size="50" :placeholder="this.title"></u-input>
      </u-form-item>
      <u-form-item prop="userInfo.name" borderBottom ref="item1" >
        <u-text size='50' text="Content:"></u-text>
        <u-input v-model="content" border="none" size="50" :placeholder="this.content"></u-input>
      </u-form-item>
    </view>

    <view class="button">
      <u-button type="primary" size="large" @click="submit">Finish Editing and submit</u-button>
    </view>
  </view>
</template>

<script>
import {getFacilityDetail} from "@/api/facility";
import {createOrder} from "@/api/order";
import {addAnnouncement, getAnnouncements, modifyAnnouncements} from "@/api/announcement";

export default {
  data(){
    return{
      title: "",
      content: "",
      announcements: {},
      submitData: {},
      announcement: {},
      loadingAnnouncement: true,
    }
  },
  methods: {
    submit() {
      if (this.id === '-1') {
        console.log(this.title);
        console.log(this.content);
        addAnnouncement(this.title, this.content, "").then(res => {
          console.log(res);
        })
        alert("添加成功");
      }else{
        this.submitData.id = this.id;
        this.submitData.title = this.title;
        this.submitData.content = this.content;
        this.submitData.images = this.images;
        modifyAnnouncements(this.submitData).then(res => {
          console.log(res);
        });
        alert("修改成功");
        this.$router.go(-1)
      }
    },
    async getAnnouncement(){
      await getAnnouncements().then(res=>{
        this.announcements = res.data.announcement;
        for (let i = 0; i < this.announcement.length; i++) {
          let announcementText = this.announcement[i].title + this.announcement[i].content;
          this.announcementText.push(announcementText);
        }
        this.loadingAnnouncement = false;
        console.log(this.announcements);
        this.getSpecifyAnnouncement();
      })
    },
    getSpecifyAnnouncement(){
      for(let i=0;i<this.announcements.length;i++){
        if(this.announcements[i].id.toString() === this.id){
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