<template>
  <!-- <view class="content"> -->
  <view>
    <view class="search-bar" >
      <!--      search -bar-->

      <u-search height="60" actionText="Go" placeholder="Please input keyword" @search="search">
      </u-search>
    </view>
    <u-gap height="20" bgColor="#f3f3f3"></u-gap>
    <template>
      <view>
        <u-notice-bar direction="column" fontSize="20" :text="announcementText"></u-notice-bar>
      </view>
    </template>

    <template>
      <uni-card class="tag-bar">
        <u-tabs :list="tagName" @click="getFacilityByTagName"></u-tabs>
      </uni-card>
    </template>
    <view class="cards" v-if="facility.length>0">
      <uni-card padding="0" spacing="0" v-for="item in facility" :key="item.id">
        <template v-slot:cover>
          <view class="custom-cover" @click="goDetail" :data-id="item.facility.id">
            <image class="cover-image" mode="aspectFill" :src="item.facility.images[0].url">
            </image>
            <view class="cover-content">
              <text>{{ item.facility.name }}</text>
            </view>
          </view>
        </template>
        <view class="text-list">
          <!--          <u-text :text="item.facility.description" color="black" size="35"></u-text>-->
          <u-row>
            <u-col span="4">
              <view class="price-card">
                <u-text size="24" color="white"  background-color="white" :text="'start with ' + minPrice + '$'" ></u-text>
              </view>
            </u-col>
            <u-col span="2">
            </u-col>
            <u-col span="4">
            </u-col>
          </u-row>
          <u-text :text="'description:'" color="black" size="32"></u-text>
        </view>
      </uni-card>
    </view>
    <view v-else>
      <u-empty text="No result" icon="search" title="No Result" description="No Result"></u-empty>
    </view>
    <!--    </view>-->

  </view>
  <!-- </view> -->
</template>

<script>
import {getFacilities,getFacilityByTag,getFacilityByTagName, searchFacilityByName} from '@/api/facility';
import {getAnnouncements} from '../../api/announcement';
import {getTags} from '../../api/tag';
import start from '../../components/uni-rate.vue'
import list from "uview-ui/libs/config/props/list";
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
      searchString: '',
      images: [{
        url: 'https://media.gettyimages.com/id/1385900794/zh/%E7%85%A7%E7%89%87/athletics-track.jpg?s=612x612&w=0&k=20&c=D61r_Ewr-RUi7JBq6jynRFujpNqOdc6Ew2WTpQ8eDmE=',
      }, {
        url: 'https://media.gettyimages.com/id/183252976/zh/%E7%85%A7%E7%89%87/stadium-ground-level.jpg?s=612x612&w=0&k=20&c=B57J8wyoin1JrVMtCjZ3FeNYn3F5j_VInCI-vB6qAT0=',
      }, {
        url: 'https://media.gettyimages.com/id/122155497/zh/%E7%85%A7%E7%89%87/grammar-school.jpg?s=612x612&w=0&k=20&c=Kr8DtgTUSOW6quSZjFFd_-0JoySxEhqcdG94ty0PmVA=',
      }],
      facility: [],
      loadingFacility: true,
      announcement: [],
      tags: [],
      tagName: [],
      isLoading: true,
      announcementImages:[],
      announcementText:[],
      minPrice: 1,
      pro: [{
        src: 'https://via.placeholder.com/58x100.png/FF7F50',
        img: 'https://via.placeholder.com/58x100.png/FF7F50',
        title: "猫咪不见了",
        value: 5,
        count: 5,
        content: " [黑椒酸辣汤 36g]",
        content1: "太慢",
        content2: 0,
        other: "2021-11-23"
      },
        {
          src: 'https://via.placeholder.com/58x100.png/FF7F50',
          img: 'https://via.placeholder.com/58x100.png/FF7F50',
          title: "猫咪不见了",
          value: 0,
          count: 5,
          content: "[黑椒酸辣汤 36g]",
          content1: "飞快",
          content2: 5,
          other: "2021-11-02"
        }
      ],
      pro1: [{
        src: 'https://via.placeholder.com/58x100.png/FF7F50',
        img: 'https://via.placeholder.com/58x100.png/FF7F50',
        title1: "猫咪12321",
        value: 0,
        count: 5,
        content1: "[香菇鸡茸汤 41g]",
        content3: "一般",
        content4: 5,
        other: "2021-11-15",
      }],
      pic: {
        count: 5,
        require: true,
        piclist: [
          'https://cdn.uviewui.com/uview/album/1.jpg',
          'https://cdn.uviewui.com/uview/album/1.jpg',
          'https://cdn.uviewui.com/uview/album/1.jpg',
        ],
      },

    }
  },
  methods: {
    async search(value) {

      await searchFacilityByName(value).then(res => {
        this.facility = res.data.facility;
        this.facility.forEach(item => {
          item.facility.images = this.processImages(item.facility.images);
        })
        this.loadingFacility = false;
        console.log(this.facility);
      })
    },
    // 跳转到详情页
    goDetail(e) {
      uni.navigateTo({
        url: '/pages/shop-detail/detail?id=' + e.currentTarget.dataset.id
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
    async getFacility() {
      await getFacilities().then(res => {
        this.facility = res.data.facility;
        this.facility.forEach(item => {
          item.facility.images = this.processImages(item.facility.images);
        })
        this.loadingFacility = false;
        console.log(this.facility);
        // if facility description is too long, cut it
        this.facility.forEach(item => {
          if (item.facility.description.length > 100) {
            item.facility.description = item.facility.description.substring(0, 100) + '...';
          }
        })
      })
    },
    async getAnnouncement(){
      await getAnnouncements().then(res=>{
        this.announcement = res.data.announcement;
        console.log(this.announcement)
        this.announcement.forEach(item=>{
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
    async getTags() {
      await getTags().then(res => {
        this.tags = res.data.tags;
        this.loadingTags = false;
        this.tagName.push(
            {
              name:'All'
            }
        )
        console.log(this.tags);
        for (let i = 0; i < this.tags.length; i++) {
          this.tagName.push({
            name: this.tags[i].name,
          })
        }
        console.log(this.tagName);
      })
    },
    async getFacilityByTagName(e){
      if (e.name == 'All'){
        await this.getFacility();
        return;
      }
      await getFacilityByTagName(e.name).then(res => {
        this.facility = res.data.facility;
        this.facility.forEach(item => {
          item.facility.images = this.processImages(item.facility.images);
        })
        this.loadingFacility = false;
        console.log(this.facility);
        // if facility description is too long, cut it
        this.facility.forEach(item => {
          if (item.facility.description.length > 100) {
            item.facility.description = item.facility.description.substring(0, 100) + '...';
          }
        })
      })
    },
  },
  onLoad() {
    this.getFacility();
    this.getAnnouncement();
    this.getTags();
  },

}
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
<style lang="scss">
.cards {

  background-color: white;
  border-radius: 60rpx;

}

.price-card{
  padding: 20rpx;
  border-radius: 20rpx;
  //background-image: linear-gradient( 40deg, #fa1a22 0%, #ff2e6b 100%);
  background: linear-gradient(40deg,#ff7101, #ffa600);
  /*  shadow of the card*/
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.container {
  overflow: hidden;
}

.custom-cover {
  flex: 1;
  flex-direction: row;
  position: relative;
  radius: 20 rpx;
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
  padding-left: 10px;
  font-size: 14px;
  color: #fff;
}

.card-actions {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 45px;
  border-top: 1px #eee solid;
}

.card-actions-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.card-actions-item-text {
  font-size: 12px;
  color: #666;
  margin-left: 5px;
}

.cover-image {
  width: 100%;
  height: 120px;
}

.no-border {
  border-width: 0;
}
</style>


<style lang="scss">
.page_liebiao1 {
  width: 100vw;
  height: 100vh;
  background-color: #e8e8e8;
  padding-top: 1px;
  padding-bottom: 2rpx;

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
    width: 93vw;
    background-color: #ffffff;
    border-radius: 10px;
    padding-top: 10px;
    padding-left: 20px;
    margin-left: 4px;
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