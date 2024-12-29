<template>
  <view class="main">
    <view v-if="isLoading === false">
      <u-loading-page loading-mode="spinner"></u-loading-page>

      <u-gap height="40" bgColor="#f3f3f3"></u-gap>
      <view class="facility-info">
        <u-text size='50' :text="facility.facility.name"></u-text>
        <view class="swiper-view">

          <u-swiper radius='20' v-if="facility.facility.images && isLoading == false" height="300" indicator
                    :list="facility.facility.images" @change="change"></u-swiper>
        </view>
        <!--            <u-text size="35" color="black"  background-color="white" :text="'start with ' + minPrice + '$'" ></u-text>-->
        <u-gap height="10" bgColor=white></u-gap>
        <u-gap height="4" bgColor=#38b0fb></u-gap>
        <u-gap height="15" bgColor=white></u-gap>
        <u-row>
          <u-col span="4">
            <view class="price-card">
              <u-text size="26" color="white"  background-color="white" :text="'start with ' + minPrice + '$'" ></u-text>
            </view>
          </u-col>
          <u-col span="4">
          </u-col>
          <u-col span="4">
            <u-text size="35" color="black"  background-color="white" :text="'Score'" ></u-text>
            <view class="pingfen" style="display: flex;">
              <start :count="4" active-color="#eaa12e" size="18" v-model="pro[0].value"></start>
              <view style="font-size: 10px;margin-left: 10px; color: #808080;">
              </view>
            </view>
          </u-col>
        </u-row>

        <u-gap height="20" bgColor=white></u-gap>
        <u-text size="35" color="black"  background-color="white" :text="'Description'" ></u-text>
        <u-text size="26" color="grey"  background-color="white" :text="facility.facility.description" ></u-text>

        <u-gap height="20" bgColor=white></u-gap>
        <u-text size="32" color="black" :text="facility.facility.location" align="right" prefixIcon="home"></u-text>
      </view>
      <!-- <u-loading :show="isLoading" :type="1" :size="30"></u-loading> -->
      <!--            a tetx show the number of facility places-->

      <view class="places" v-if="facility.places.length !== 0">
        <u-gap height="10" ></u-gap>
        <view class="number">
          <u-text size="35" align="right" color="black" :text="facility.places.length + ' places'"></u-text>
        </view>
        <!-- loading -->
        <u-loading-icon :show="isLoading"></u-loading-icon>
        <view v-for="item in facility.places" :key="item.id">
          <view class="place-detail">
            <u-row>
              <u-col span="3">
                <view class="place-image">
                  <u-image class="place-image1" :src="facility.facility.images[0].url" width="200" height="120" border-redius="20rpx" ></u-image>
                </view>
              </u-col>
              <u-col span="1.5">
              </u-col>
              <u-col span="4.5">
                <u-row>
                  <u-col span="24">
                    <u-text size="35" color="black"  background-color="white" :text="item.name" ></u-text>
                  </u-col>
                </u-row>
                <u-row>
                  <u-col span="24">
                    <u-text size="30" color="grey"  background-color="white" :text="item.description" ></u-text>
                  </u-col>
                </u-row>
                <u-row span="24">
                  <u-col>
                    <u-text size="20" color="grey"  background-color="white" :text="'Free cancel more than 2 hours before start'" ></u-text>
                  </u-col>
                </u-row>
              </u-col>
              <u-col span="0.5">

              </u-col>
              <u-col span="2.5">
                <u-col>
                  <u-text size="36" color="black"  background-color="white" margin-left="20rpx" :text="item.cost + '$'" ></u-text>
                </u-col>
                <u-col>
                  <u-text size="20" color="grey"  background-color="white" margin-left="20rpx" :text="'per hour'" ></u-text>
                </u-col>
                <u-col>
                  <view class="book-button">
                    <!--                          <u-col>-->
                    <!--                            <u-row>-->
                    <view  class="book-content" @click="placeDetail(item.id)">
                      <u-text size="35" color="white"  bgcolor="blue" margin-left="20rpx" :text="'Book'" ></u-text>
                    </view>
                    <!--                            </u-row>-->
                    <!--                            <u-row>-->
                    <view  class="book-content-ol" @click="placeDetail(item.id)">
                      <view style="margin-left: 8rpx">
                        <u-text class="book-content-ol" size="20" color="#004098" margin-left="20rpx" :text="'online pay'" ></u-text>
                      </view>

                    </view>
                  </view>

                </u-col>
              </u-col>
            </u-row>
          </view>
        </view>
      </view>
      <view class="no-places" v-else>
        <u-text align="center" size="35" color="grey" :text="facility.facility.name + ' has no places'"></u-text>
      </view>
      <view>
        <view class="number">
          <u-text size="35" align="left" color="black"  font-wigth="bold" :text="'Appraise'"></u-text>
        </view>
        <u-popup :show="show" :round="10" mode="bottom" @close="close" class = "item">
          <view class="modal-view">
            <u-form label-position="left" label-width="200">
              <u-form-item borderBottom label="Facility">
                <u-text size="35" color="grey" :text="facility.facility.name"></u-text>
              </u-form-item>
              <u-form-item borderBottom label="Place">
                <u-text size="35" color="grey" :text="modalData.name"></u-text>
              </u-form-item>
              <u-form-item borderBottom label="Cost">
                <u-text size="35" color="grey" :text="modalData.cost"></u-text>
              </u-form-item>
              <u-form-item borderBottom label="Start Time">
                <u-text v-model="form.startTime" size="35" color="grey" @click="startTimeShow = true"
                        :text="timestamp2time(form.startTime)"></u-text>
                <u-datetime-picker :filter="filter"  :maxDate="maxDate" :minDate="1682350200000"
                                   :show="startTimeShow" v-model="form.startTime" mode="datetime" closeOnClickOverlay
                                   @confirm="confirmTime" @cancel="cancel" @change="change" @close="closeTime">
                </u-datetime-picker>
              </u-form-item>
              <u-form-item borderBottom label="End Time">
                <u-text v-model="form.endTime" size="35" color="grey" @click="endTimeShow = true"
                        :text="timestamp2time(form.endTime)"></u-text>
                <u-datetime-picker :filter="filter"
                                   :minDate="(form.startTime === 'Select') ? Number(new Date().getTime()) : form.startTime"
                                   :show="endTimeShow" v-model="form.endTime" mode="datetime"
                                   closeOnClickOverlay @confirm="confirmTime" @cancel="cancel" @change="change"
                                   @close="closeTime">
                </u-datetime-picker>
              </u-form-item>
              <u-form-item borderBottom label="Total Time">
                <u-text size="35" color="grey" :text="calculateTotalTime()"></u-text>
              </u-form-item>
              <u-form-item borderBottom label="Total Cost">
                <u-text size="35" color="grey" :text="calculateTotalCost()"></u-text>
              </u-form-item>
              <!-- btn -->
              <u-form-item>
                <u-button type="primary" size="large" @click="confirmOrder">Submit</u-button>
              </u-form-item>
            </u-form>
          </view>
        </u-popup>
      </view>

    </view>
    <view v-else>
      <u-loading-page :loading="isLoading" loadingText="loading...." loading-mode="spinner"></u-loading-page>
    </view>


    <view class="page_liebiao1">

      <view class="yonghu" v-for="(item,index) in pro">
        <view style="display: flex;">
          <view class="touxiang">
            <u--image :showLoading="true" shape="circle" :src="'http://101.42.160.53:16800/' + item.avatar" width="40px" height="40px"
                      @click="clickImg"></u--image>
          </view>
          <view class="name">{{item.username}}</view>
          <view class="biaoqian">
            <!-- <u--image :src="item.img" width="20px" height="20px"></u--image> -->
          </view>
          <view class="shijian">{{item.evaluation.time}}</view>
        </view>
        <view class="pingfen" style="display: flex;">
          <start :count="item.evaluation.score" active-color="#ff0000" size="18" v-model="item.evaluation.score"></start>
          <!-- <view style="font-size: 10px;margin-left: 10px; color: #808080;">
            {{item.evaluation.description}}
          </view> -->
        </view>
        <view style="margin-top: 5px;margin-left: 15px; margin-bottom: 15rpx">{{item.evaluation.description}}</view>
        <!-- <view style="margin-left: 85%;display: flex;">{{item.content2}}
          <u-icon name="thumb-up" size="20"></u-icon>
        </view> -->
      </view>

    </view>

  </view>
</template>

<script>
import { getFacilityDetail } from '@/api/facility'
import { createOrder } from '@/api/order';
import start from '../../components/uni-rate.vue'
import list from "uview-ui/libs/config/props/list";
import place from "@/pages/detail/place.vue";
import { getFacilityEvaluations } from '../../api/facility';
export default {
  computed: {
    list() {
      return list
    }
  },
  components: {
    start
  },
  data() {
    return {
      facilityId: '',
      facility: {},
      isLoading: true,
      show: false,
      startTimeShow: false,
      endTimeShow: false,
      modalData: {},
      form: {
        placeId: '',
        startTime: Number(new Date()),
        endTime: 'Select',
      },
      minDate: Number(Number(new Date())),
      maxDate: Number(Number(new Date())) + 1000 * 60 * 60 * 24 * 30,
      pro: [],
      pic: {
        count: 5,
        require: true,
        piclist: [
          'https://cdn.uviewui.com/uview/album/1.jpg',
          'https://cdn.uviewui.com/uview/album/1.jpg',
          'https://cdn.uviewui.com/uview/album/1.jpg',
        ],
      },
      minPrice: 0,

      defaultTime: "",
    }
  },
  methods: {
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
            // this.isLoading = false
          }
      ).catch(err => {
        console.log(err)
      })

      // minPrice
      console.log("jsjsjsjsjsjs")
      console.log(this.facility.places)
      this.minPrice = this.facility.places[0].cost
      for (let i = 0; i < this.facility.places.length; i++) {
        if (this.facility.places[i].cost < this.minPrice) {
          this.minPrice = this.facility.places[i].cost
        }
      }

      // if description is too long, cut it
      if (this.facility.facility.description.length > 200) {
        this.facility.facility.description = this.facility.facility.description.substring(0, 200) + '...'
      }
    },
    change(e) {
      console.log(e)
    },
    closeTime() {
      this.startTimeShow = false
      this.endTimeShow = false
    },
    placeDetail(id) {
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
      // if (mode === 'hour') {
      //     return options.filter((option) => Number(option) >= 8 && Number(option) <= 22);
      // }
      return options;
    },
    clickImg() {
      wx.previewImage({
        urls: ['https://cdn.uviewui.com/uview/album/1.jpg'],
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    async getEvalautions() {
      await getFacilityEvaluations(this.facilityId).then(
          res => {
            console.log(res)
            this.pro = res.data.evaluations
            this.isLoading = false
            console.log(this.pro)
          }
      ).catch(err => {
        console.log(err)
      })
    }

  },
  onLoad() {
    this.facilityId = this.$route.query.id
    console.log(this.minDate, this.maxDate)
    this.getDetail()
    this.getEvalautions()
    // this.getMinPrice()
    uni.setNavigationBarTitle({
      title: '',
      navigationStyle: 'custom',

    })
    var date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    month >= 1 && month <= 9 ? (month = "0" + month) : "";
    day >= 0 && day <= 9 ? (day = "0" + day) : "";
    var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    this.defaultTime = timer

  }
}

</script>

<style>
.price-card{
  padding: 20rpx;
  border-radius: 20rpx;
  /*background-color: #c85762;*/
  background: linear-gradient(40deg,#ff447a, #ffa600);
  /*  shadow of the card*/
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
.places {
  /* padding: 20rpx;   */
  background: linear-gradient(180deg,#d5f7c3, rgba(0,0,0,0));
  margin: 20rpx;
  border-radius: 20rpx;
  padding: 2rpx;
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

.book-button{
  border-radius: 20rpx;
  border-color: #004098;
  background-color: #004098;
  margin-top: 10rpx;

}
.book-content{
  margin-left: 20rpx;
  margin-bottom: 10rpx;
  margin-top: 5rpx;
}

.book-content-ol{
  margin-bottom: 10rpx;
  background-color: white;


  border-color: #004098;
  border-left-width: 10rpx;
  border-right-width: 10rpx;
  margin-left: 10rpx;
  margin-right: 10rpx;
  border-bottom-right-radius: 10rpx;
  border-bottom-left-radius: 10rpx;
}

.place-detail{
  margin-left: 20rpx;
  margin-right: 20rpx;
  margin-top: 20rpx;
  padding: 20rpx;
  border-radius: 20rpx;
  background-color: white;
}

.swiper-view {
  padding: 20rpx;
}
.place-image{
  border-radius: 20rpx;
}

.place-image1{
  border-radius: 20rpx;
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
  margin-left: 20rpx;
  color: #333;
}
.number1{
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

<style lang="scss">
.page_liebiao1 {
  height: 100vh;
  //background-color: #e8e8e8;
  padding-top: 1px;
  padding-bottom: 2rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;

  .tupian {
    margin-top: 20px;
    margin-left: 10px;
    padding-bottom: 0;
  }

  .shijian {
    font-size: 10px;

    margin-top: 10px;
    color: #808080;
  }

  .pingfen {
    margin-top: 10px;
    padding-left: 10px;
  }

  .biaoqian {
    margin-top: 5px;
    padding-left: 5px;
    width: 40%;
  }

  .name {
    margin-top: 10px;
    padding-left: 10px;

  }

  .yonghu {
    background-color: #ffffff;
    border-radius: 10px;
    padding-top: 10px;
    padding-left: 20px;
    margin-left: 4px;
    margin-right: 4px;
    margin-top: 10px;
    margin-bottom: 0;
    padding-bottom: 2rpx;
  }

  .yonghu1 {
    width: 93vw;
    background-color: #ffffff;
    border-radius: 10px;
    margin-top: 10px;
    padding-left: 19px;
    padding-top: 20px;
    margin-left: 3.5px;
    padding-bottom: 2rpx;
  }
}


</style>
