<template>
  <!-- <view class="content"> -->
  <view>
    <view class="search-bar">
      <!--      search -bar--> 
      <!-- <u-row> -->
        <!-- <uni-icons type="scan" size="30"></uni-icons> -->
      <u-search height="60" actionText="Go" placeholder="Please input keyword" v-model="searchString">
      </u-search>
      <!-- </u-row> -->

    </view>
    <view class="swiper-view">
      <u-swiper class="swiper" :list="images" keyName="url" radius="20" :autoplay="true" height="300rpx"></u-swiper>
    </view>
    <template>
      <view>
        <u-notice-bar direction="column" fontSize="20" :text="announcementText"></u-notice-bar>
      </view>
    </template>
    <view class="box">
      <u-col>
        <u-row span="12">
          <view class="label" v-for="(row, index) in orderTypeLise" :key="row.name" hover-class="hover"
                @tap="toOrderType(index)">
            <view class="icon" @click="goPage">
              <view class="badge" v-if="row.badge > 0">{{ row.badge }}</view>
              <image :src="'../../static/' + row.icon" @click="goPage"></image>
            </view>
            <!-- <text>{{row.name}}</text> -->
            {{ row.name }}
          </view>
        </u-row>
        <u-row span="12">
          <view class="label" v-for="(row, index) in orderTypeLise1" :key="row.name" hover-class="hover"
                @tap="toOrderType1(index)">
            <view class="icon" @click="goPage">
              <view class="badge" v-if="row.badge > 0">{{ row.badge }}</view>
              <image :src="'../../static/' + row.icon" @click="goPage"></image>
            </view>
            <!-- <text>{{row.name}}</text> -->
            {{ row.name }}
          </view>
        </u-row>
      </u-col>
    </view>
    <view class="facility">
      <view class="facility-title">
        <u-row>
          <u-col span="4">
            <view class="facility-text">Hot Facility</view>
          </u-col>
          <u-col span="1">
            <uni-icons class="facility-icon" type="fire-filled" size="30" color="#f19b46"></uni-icons>
          </u-col>
        </u-row>

      </view>
      <template>
        <u-scroll-list>
          <view v-for="item in facility" :key="item.id" class="facility-card">
            <uni-card padding="0" spacing="0" margin-bottom="0">
              <view class="custom-cover" @click="goDetail" :data-id="item.facility.id">
                <image class="cover-image" mode="aspectFill" :src="item.facility.images[0].url">
                </image>
                <view class="cover-content">
                  <u-text color="white" :line="2" size="25" align="left" :text="item.facility.name"></u-text>
                </view>
              </view>
            </uni-card>
          </view>
        </u-scroll-list>
      </template>
    </view>
    <u-gap height="10" bgColor="#f3f3f3"></u-gap>
    <view>
      <view>
        <view class="comment-title">
          <u-row>
            <u-col span="5">
              <view class="comment-text">Hot Share</view>
            </u-col>
          </u-row>

        </view>
      </view>
      <u-gap height="5" bgColor="#f8e0c2" style="margin-right: 20rpx; margin-left: 20rpx"></u-gap>
      <view style="padding: 0 20rpx; background: linear-gradient(180deg,#f8e0c2, rgb(0,0,0,0)); margin-right: 20rpx; margin-left: 20rpx" >
        <customWaterfallsFlow ref="waterfallsFlowRef" :value="data.list" :column="column" :columnSpace="1.5" :seat="2"
                              @wapperClick="wapperClick" @imageClick="imageClick" @loaded="loaded">
          <!-- #ifdef MP-WEIXIN -->
          <view class="item" v-for="(item, index) in data.list" :key="index" slot="slot{{index}}">
            <view class="title">{{ item.title }}</view>
            <view class="desc">{{ item.desc }}</view>
          </view>
          <!-- #endif -->
          <!-- #ifndef MP-WEIXIN -->
          <template v-slot:default="item">
            <view>
              <view class="title">{{ item.title }}</view>
              <view class="desc">{{ item.desc }}</view>
            </view>

            <view slot="actions" class="card-actions no-border">
            <view>
              <uni-icons type="eye" size="18" color="#999"></uni-icons>
              <text class="card-actions-item-text">10</text>
            </view>

          </view>
          </template>
          <!-- #endif -->
        </customWaterfallsFlow>
      </view>
    </view>

  </view>
  <!-- </view> -->
</template>

<script>
import { getFacilities } from '../../api/facility';
import { getAnnouncements } from '../../api/announcement';
import { getOrders } from '../../api/order';
import OrderCard from '../../components/order-card-index';
import customWaterfallsFlow from '@/components/custom-waterfalls-flow.vue';
import { searchFacilityByName } from '../../api/facility';
import { getFacilityEvaluations, getAllEvaluation } from '../../api/facility';



export default {
  components: {
    OrderCard,
    customWaterfallsFlow
  },
  data() {
    return {
      searchString: '',
      evaluations: [],
      images: [{
        url: '../../static/2.png',
      }, {
        url: '../../static/4.png',
      }, {
        url: '../../static/3(1).png',
      }],
      facility: [],
      loadingFacility: true,
      announcement: [],
      loadingAnnouncement: true,
      announcementImages: [],
      announcementText: [],
      // orders: [],
      // isLoading: true,
      // preOrders: [],
      orderTypeLise: [
        {
          name: 'coach',
          icon: 'coach.png',
          // badge: 1
        },
        {
          name: 'course',
          icon: 'courses.png',
          // badge: 2
        },
        {
          name: 'activity',
          icon: 'completed-task.png',
          // badge: 6
        },

      ],
      orderTypeLise1: [
        {
          name: 'AI Query',
          icon: 'bot.png',
          // badge: 1
        },
        {
          name: 'badminton',
          icon: 'badminton.png',
          // badge: 2
        },
        {
          name: 'soccer',
          icon: 'goal.png',
          // badge: 6
        },
      ],
      cnt: 0,
      data: {
        list: [
        ]
      },
      column: 2,
    }
  },
  methods: {
    async search() {
      await searchFacilityByName(this.searchString).then(res => {
        this.facility = res.data.facility;
        this.facility.forEach(item => {
          item.facility.images = this.processImages(item.facility.images);
        })
        this.loadingFacility = false;
        console.log(this.facility);
      })
    },
    goPage(e) {
      console.log(e)
    },
    goDetail(e) {
      uni.navigateTo({
        url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id
      })
    },
    toOrderType(cnt) {
      if (cnt === 0) {
        uni.navigateTo({
          url: '/pages/index/coach'
        })
      } else if (cnt === 1) {
        uni.navigateTo({
          url: '/pages/index/course'
        })
      } else if (cnt === 2) {
        uni.navigateTo({
          url: '/pages/index/activity'
        })
      }
    },
    toOrderType1(cnt) {
      console.log(cnt)
      if (cnt === 0) {
        uni.navigateTo({
          url: '/pages/bot/bot'
        })
      } else if (cnt === 1) {
        uni.navigateTo({
          url: '/pages/index/badminton'
        })
      } else if (cnt === 2) {
        uni.navigateTo({
          url: '/pages/index/soccer'
        })
      }
    },
    changeColumn(h) {
      this.column = !h ? this.column - 1 : this.column + 1;
    },
    loaded() {
      console.log('OK')
    },
    wapperClick(item) {
      console.log('OKK', item)
    },
    imageClick(item) {
      console.log('OKKK', item)
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
    async getEvaluations() {
      await getAllEvaluation().then(res => {
        if ( res.data === null || !res.data.evaluations ){
          this.loadingEvaluation = false;
          return;
        }
        if (res.data.evaluations.length === 0 || res.data.evaluations === null) {
          this.loadingEvaluation = false;
          return;
        }
        this.evaluations = res.data.evaluations;
        console.log(this.evaluations);

        this.evaluations.forEach(item => {
          item.images = this.processImages(item.images);
        })
        for (let i = 0; i < this.evaluations.length; i++) {
          // let evaluationText = this.evaluations[i].content;
            this.data.list.push({
              image: this.evaluations[i].images[0].url,
              title: this.evaluations[i].username,
              desc: this.evaluations[i].description,
            })
        }
        this.loadingEvaluation = false;
        console.log(this.evaluations);
      })
    },
    async getFacility() {
      await getFacilities().then(res => {
        this.facility = res.data.facility;
        this.facility.forEach(item => {
          item.facility.images = this.processImages(item.facility.images);
        })
        this.loadingFacility = false;
        console.log(this.facility);

      })
    },
    async getAnnouncement() {
      await getAnnouncements().then(res => {
        this.announcement = res.data.announcement;
        console.log(this.announcement)
        this.announcement.forEach(item => {
          item.images = this.processImages(item.images);
        })
        for (let i = 0; i < this.announcement.length; i++) {
          let announcementText = this.announcement[i].title + this.announcement[i].content;
          this.announcementText.push(announcementText);
        }
        this.loadingAnnouncement = false;
        console.log(this.announcement);
      })
    },
    async getOrdersList() {
      // this.isLoading = true;
      await getOrders().then(res => {
        this.orders = res.data.order;
        // this.isLoading = false;
        // sort by time
        this.orders.sort((a, b) => {
          return new Date(b.startTime) - new Date(a.startTime);
        })
        // filter out the orders that start in the future
        let nowDate = new Date()
        console.log(nowDate.getTime())
        this.orders = this.orders.filter(item => {
          return item.order.status === 1
        })
        console.log(this.orders);
      }).catch(err => {
        // this.isLoading = false;
        console.log(err);
      })
    }
  },
  onLoad() {
    this.getFacility();
    this.getAnnouncement();
    this.getEvaluations();
    this.isLoading = false;
  },

}
</script>
<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 100%;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  margin-top: 5rpx;
  margin-left: 10rpx;
  font-size: 24rpx;
  color: black;
}

.tag-bar{
  border-radius: 20rpx;
}

.desc{
  /*margin-left: 20rpx;*/
  font-size: 24rpx;
  color: #24292E;
  /*margin-bottom: 20rpx;*/
  margin-top: 0;
  margin-left: 20rpx;
  margin-right: 10rpx;
}

.swiper-view {
  /* margin-top: 0rpx; */

  padding: 20rpx;

  /* display: flex; */
}

.swiper {
  border-radius: 20rpx;
  height: 80rpx;
}

.hot-facility-card {
  margin-top: 3rpx;
  margin-bottom: 0;
  margin-left: 10rpx;
  width: 85%;
  border-radius: 10rpx;
  padding-left: 0;
}

.announcement {
  padding: 20rpx;
  display: flex;
  margin-top: 20rpx;
  margin-bottom: 20rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
  background-color: #bfdacf;
  border-radius: 20rpx;
  /* justify-content: center; */
}

.announcement-text {
  /* font-size: 20rpx; */
  margin-left: 10rpx;
  margin-top: auto;
}

.announcement-icon {
  margin-top: auto;
}

.card {
  border-radius: 20rpx;
}

.facility {
  margin-left: 20rpx;
  margin-right: 20rpx;
  padding: 10rpx;
  border-radius: 20rpx;
  margin-top: 10rpx;
  margin-bottom: 0rpx;
  background-color: #dfede7;
  border: 1px solid #dfede7;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /*border-top: 5px solid white;*/

}

.facility-card {
  width: 45%;
  display: flex;

}

.facility-title {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #dfede7;
}

.comment-title {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-right: 20rpx;
  margin-left: 20rpx;
  background: linear-gradient(180deg, #f3bd73,#f8e0c2);
}
.facility-text {
  margin-left: 40rpx;
  font-size: 30rpx;
  margin-top: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #dfede7;
}
.comment-text {
  margin-left: 40rpx;
  font-size: 30rpx;
  margin-top: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: linear-gradient(180deg, #f3bd73,#f8e0c2);
}

.facility-card-text {
  float: right;
  font-size: 22rpx;
}

.search-bar {
  margin-left: 0;
  margin-top: 20rpx;
  padding: 20rpx;
  margin-right: 20rpx;
  border-top-right-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
  background-color: white;
  height: 70rpx;
  /*  shadow of the card*/
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.search_area {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 80rpx;
}
</style>
<style lang="scss">
.box {
  width: 96%;
  height: 40vw;
  background-color: #fefefe;
  border-radius: 24upx;
  /*  阴影 */
  box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
  margin: 20upx 2% 0upx 2%;
  display: flex;
  align-items: center;
  justify-content: center;

  .label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 16vw;
    color: #666666;
    font-size: 26upx;

    .icon {
      position: relative;
      width: 7vw;
      height: 7vw;
      margin: 0 1vw 2vw 1vw;

      // 数字气泡
      .badge {
        position: absolute;
        width: 4vw;
        height: 4vw;
        background-color: #ec6d2c;
        top: -1vw;
        right: -1vw;
        border-radius: 100%;
        font-size: 20upx;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
      }

      // 文字上的图片
      image {
        width: 7vw;
        height: 7vw;
        z-index: 9;
      }
    }
  }

}


.container {
  overflow: hidden;
}

.custom-cover {
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 0;
  radius: 20rpx;
  width: 45%;
}

.cover-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  width: 100%;
  // white background
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10rpx;
  color: #fff;
  margin-bottom: 0;
}

.card-actions {
  display: flex;
  flex-direction: row;
  margin: 20rpx;
  justify-content: right;
  align-items: right;
  height: 45px;
  border-top: 1px #eee solid;
  margin-bottom: 0;
}

.card-actions-item {
  margin-left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0;
}

.card-actions-item-text {
  font-size: 12px;
  color: #666;
  margin-left: 5px;
  margin-bottom: 0;
}

.cover-image {
  flex: 1;
  height: 120px;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
}

.no-border {
  border-width: 0;
}

.order-list {
  margin: 20rpx;
}
</style>

