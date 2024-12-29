<template>
  <view class="main">
      <u-loading-page loading-mode="spinner"></u-loading-page>

      <u-gap height="40" bgColor="#f3f3f3"></u-gap>
      <view class="facility-info">
        <u-text size='50' :text="'video'"></u-text>
        <view style="margin-left: 40rpx; margin-right: 40rpx">
          <view>
            <template>
              <view style="position: center">
                <view class="uni-padding-wrap uni-common-mt">
                  <view>
                    <!-- @error="videoErrorCallback" -->
                    <video id="myVideo" :src="course.video"
                           enable-danmu danmu-btn controls></video>
                  </view>
                  <!-- #ifndef MP-ALIPAY -->
                  <!-- #endif -->
                </view>
              </view>
            </template>
          </view>

        </view>

        <!--            <u-text size="35" color="black"  background-color="white" :text="'start with ' + minPrice + '$'" ></u-text>-->
        <u-gap height="10" bgColor=white></u-gap>
        <u-gap height="4" bgColor=#38b0fb></u-gap>
        <u-gap height="15" bgColor=white></u-gap>
        <u-row>
          <u-col span="4">
            <view class="price-card">
              <u-text size="26" color="white"  background-color="white" :text="course.title" ></u-text>
            </view>
          </u-col>
          <u-col span="4">
          </u-col>

        </u-row>

        <u-gap height="20" bgColor=white></u-gap>
        <u-text size="35" color="black"  background-color="white" :text="'Description'" ></u-text>
        <u-text size="26" color="grey"  background-color="white" :text="course.description" ></u-text>

        <u-gap height="20" bgColor=white></u-gap>
      </view>
      <!-- <u-loading :show="isLoading" :type="1" :size="30"></u-loading> -->
      <!--            a tetx show the number of facility places-->



  </view>
</template>

<script>
import { getFacilityDetail } from '@/api/facility'
import { createOrder } from '@/api/order';
import start from '../../components/uni-rate.vue'
import list from "uview-ui/libs/config/props/list";
import place from "@/pages/detail/place.vue";
import { getFacilityEvaluations } from '../../api/facility';
import { getCourseDetail } from '../../api/course';
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
      isLoading: true,
      show: false,
      minPrice: 0,
      courseId: 0,
      defaultTime: "",
      course: {}
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
    },
    async fetchData() {
      await getCourseDetail(this.courseId).then(
          res => {
            console.log(res)
            this.course = res.data.course
            if(this.course.video.indexOf('http') == -1){
              this.course.video = 'http://101.42.160.53:16800/' + this.course.video
            }
          
            // this.isLoading = false
            console.log(this.course)
          }
      ).catch(err => {
        console.log(err)
      })
    }

  },
  onLoad() {
    // this.getMinPrice()
    uni.setNavigationBarTitle({
      title: '',
      navigationStyle: 'custom',

    })

    this.courseId = this.$route.query.id
    this.fetchData();
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
