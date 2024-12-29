<template>
  <view class="page_pingjia2" v-if="isLoading === false">
    <u-loading-page loading-mode="spinner"></u-loading-page>
    <view class="zhuti" v-for="(item, index) in pro">
      <u-row>
        <u-col>
          <view class="touxiang">
            <u--image :showLoading="true" :src="item.src" width="80px" height="80px"></u--image>
          </view>
        </u-col>
        <u-col>
          <p>{{ item.title }}</p>
        </u-col>
        <u-col>
          <view class="kuang">
            <u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="3"
              action='URL' style="position: absolute;top: 160px;left: 20px;"></u-upload>
          </view>
        </u-col>
      </u-row>


      <u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="3"
        action='URL' style="position: absolute;top: 160px;left: 20px;"></u-upload>

    </view>
    <view class="dianping">
      <view class="kuang">
        <u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="3"
          action='URL' style="position: absolute;top: 10px;left: 20px;"></u-upload>
        <u--textarea height="200" v-model="value1" placeholder="Please input evaluation" style="margin-top: 50rpx">
        </u--textarea>

      </view>
      <view v-for="(item, index) in rate">
        <view style="display: flex; margin-top: 20px;margin-left: 10px;">
          <view class="taidu">{{ item.name }}</view>
          <view style="margin-left: 20px;">
            <start active-color="#4f007a" :count="item.count" v-model="item.value3"></start>
          </view>
        </view>
      </view>
      <view v-for="(item, index) in button">
        <u-button style="width: 80vw; margin-top: 100px;" type="info" color="#4f007a" shape="circle"
          @click="confirmEvaluate">
          {{ item.name }}</u-button>
      </view>
    </view>
  </view>
</template>

<script>
import { evaluate } from '../../api/order'
import { getOrderDetail } from '../../api/order'
import { getFacilityDetail } from '../../api/facility'
import start from '../../components/uni-rate.vue'
export default {
  components: {
    start
  },
  data() {
    return {
      orderCode: "",
      order: {},
      value1: '',
      value2: '',
      fileList: [],
      pro: [
        {
        src: '',
        title: "title",
        }

      ],
      rate: [{
        name: "Star:",
        count: 5,
        type: "",
        value3: ""
      }
      ],
      button: [{
        name: 'Publish'
      }],
      facility: {},
      isLoading: true,

    }
  },
  methods: {

    deletePic(event) {
      this[`fileList`].splice(event.index, 1)
    },

    async afterRead(event) {

      let lists = [].concat(event.file)
      let fileListLen = this[`fileList`].length
      lists.map((item) => {
        this[`fileList`].push({
          ...item,
          status: 'uploading',
          message: 'Uploading'
        })
      })
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].thumb)
        let item = this[`fileList`][fileListLen]
        this[`fileList`].splice(fileListLen, 1, Object.assign(item, {
          status: 'success',
          message: '',
          url: result
        }))
        fileListLen++
      }
    },
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: 'http://101.42.160.53:16800/api/v1/upload',
          filePath: url,
          name: 'file',
          success: (res) => {
            setTimeout(() => {
              let url = JSON.parse(res.data).data.url
              // push into array

              resolve(url)
            }, 1000)
          }
        });
      })
    },
    async getOrderInformation(orderCode) {
      await getOrderDetail(orderCode).then(res => {
        console.log(res)
        this.order = res.data.order
        this.pro[0].title = this.order.place.name
        console.log(this.pro)
        this.fetchFacilityDetail(this.order.place.facilityId)
        console.log(this.order)
      }).catch(err => {
        console.log(err)
      })

    },
    async confirmEvaluate() {
      console.log(this.rate[0].value3)
      let imageList = []
      for (let i = 0; i < this.fileList.length; i++) {
        imageList.push(this.fileList[i].url)
      }
      let data = {
        "facility_id": this.order.place.facilityId,
        "score": this.rate[0].value3,
        "is_anonymous": 1,
        "description": this.value1,
        "images": imageList,
        "videos": []
      }
      await evaluate(data).then(res => {
        console.log(res)
        uni.showToast({
          title: 'Success',
          icon: 'success',
          duration: 2000
        })
        setTimeout(() => {
          uni.navigateBack({
            delta: 1
          })
        }, 2000)
      }).catch(err => {
        console.log(err)
      })
    },
    async fetchFacilityDetail(facilityId) {
      await getFacilityDetail(facilityId).then(res => {
        console.log(res)
        this.facility = res.data.facility
        console.log(this.facility)
        let images = this.facility.facility.images
        // split by ,
        let imageList = images.split(',')
        this.pro[0].src = "http://101.42.160.53:16800/" + imageList[0]
        console.log(this.pro)

      }).catch(err => {
        console.log(err)
      })
    }

  },
  onLoad() {
    // this.$refs.start1.setActiveColor('#4f007a')
    this.orderCode = this.$route.query.orderCode
    console.log(this.orderCode)
    this.getOrderInformation(this.orderCode)
    this.isLoading = false
  },
}
</script>

<style lang="scss">
$abc: #ffffff;

.page_pingjia2 {
  height: 100vh;
  width: 100vw;
  background-color: #F4F4F6;

  .pingjia2 {
    color: $abc;

  }

  .xx {
    margin-left: 5px;
  }

  .kuang {
    padding-top: 30px;
    width: 95%;
    padding-left: 10px;
  }

  .dianping {
    margin-top: 20px;
    height: 80vh;
    width: 100vw;
    background-color: #ffffff;
    position: relative;
  }

  .miaoshu {
    margin-top: 3px;
    display: flex;
    color: #888888;
  }

  .heti {
    margin-left: 15px;
    margin-top: 10px;
  }

  .touxiang {
    margin-top: 10px;
    margin-left: 10px;
  }

  .zhuti {
    display: flex;
    height: 15vh;
    width: 100vw;
    background-color: #ffffff;
  }
}
</style>
