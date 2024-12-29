<template>
    <view class="main">
        <view v-if="isLoading === false">
            <u-loading-page loading-mode="spinner"></u-loading-page>
          <view class="facility-info">
            <u-form-item prop="userInfo.name" borderBottom ref="item1" >
              <u-text size='50' text="FacilityName:"></u-text>
              <u-input v-model="submitData.FacilityName" border="none" size="50" :placeholder="facility.facility.name"></u-input>
            </u-form-item>
            <u-form-item prop="userInfo.name" borderBottom ref="item1" >
              <u-text size='50' text="Description"></u-text>
              <u-input v-model="submitData.Description" border="none" size="50" :placeholder="facility.facility.description"></u-input>
            </u-form-item>
            <u-form-item prop="userInfo.name" borderBottom ref="item1" >
              <u-text size='50' text="Location"></u-text>
              <u-input v-model="submitData.location" border="none" size="50" :placeholder="facility.facility.location"></u-input>
            </u-form-item>
          </view>
            <view class="swiper-view">

                <u-swiper radius='20' v-if="facility.facility.images && isLoading == false" height="500" indicator
                    :list="facility.facility.images" @change="change"></u-swiper>
            </view>
            <!-- <u-loading :show="isLoading" :type="1" :size="30"></u-loading> -->
<!--            a tetx show the number of facility places-->
            <view class="number">
                <u-text size="35" align="right" color="grey" :text="facility.places.length + ' places'"></u-text>
            </view>
            <view class="places" v-if="facility.places.length != 0">
                <!-- loading -->
                <u-loading-icon :show="isLoading"></u-loading-icon>
                <u-cell-group v-for="item in facility.places" :key="item.id">
                    <u-cell :name="item.id" :title="item.name" :isLink="false" @click="placeDetail"
                        :label="item.description">
                    </u-cell>
                </u-cell-group>
            </view>
            <view class="no-places" v-else>
                <u-text align="center" size="35" color="grey" :text="facility.facility.name + ' has no places'"></u-text>
            </view>
<!--          <view class="places">-->
<!--            <view class="place">-->
<!--              <u-card class="card" v-for="item in facility.places" :key="item.id" >-->
<!--                <view class="card-header">-->
<!--                  <u-text size="35" color="grey" :text="item.name"></u-text>-->
<!--                </view>-->
<!--                <view class="card-content">-->
<!--                  <u-text size="35" color="grey" :text="item.description"></u-text>-->
<!--                </view>-->
<!--                <view class="card-footer">-->
<!--                  <u-text size="35" color="grey" :text="item.cost"></u-text>-->
<!--                </view>-->
<!--              </u-card>-->
<!--            </view>-->

        </view>
        <view v-else>
            <u-loading-page :loading="isLoading" loadingText="loading...." loading-mode="spinner"></u-loading-page>
        </view>
      <view class="button">
        <u-button type="primary" size="large" @click="submit">Finish Editing and submit</u-button>
      </view>
    </view>
</template>

<script>
import {editFacility, getFacilityDetail} from '../../api/facility'
import { createOrder } from '../../api/order';
export default {
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
                startTime: 'Select',
                endTime: 'Select',
            },
            submitData: {
                id: 0,
                FacilityName: '',
                Description: '',
                location:'',
                image: '',
                tag: {},
            },
            minDate: (Number(new Date())),
            maxDate: Number(Number(new Date()) + 1000 * 60 * 60 * 24 * 30),
        }
    },
    methods: {
        async submit(){
          this.submitData.id  = this.facilityId;
          this.submitData.image = this.facility.facility.images[0].url.slice(27);
          this.submitData.tag = this.facility.facility.tags.split(',');
          console.log(this.submitData)
          await editFacility(this.submitData).then(
              res => {
                console.log(res)
              }
          ).catch(err => {
            console.log(err)
          })
          alert("修改成功");
          this.$router.go(-1)
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
                },
            ).catch(err => {
                console.log(err)
            })
          this.submitData.FacilityName = this.facility.facility.name
          this.submitData.Description = this.facility.facility.description
          this.submitData.location = this.facility.facility.location
          this.submitData.long = this.facility.facility.long
          this.submitData.lat = this.facility.facility.lat
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

    },
    onLoad() {
        this.facilityId = this.$route.query.id
        this.getDetail()
      uni.setNavigationBarTitle({
        title: '',
        navigationStyle: 'custom',
      })
    }
}

</script>

<style>
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