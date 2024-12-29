<template>
  <view>
    <view class="video-box" v-for="(item,index) in video" :key="index">
      <video class="video" :id="'video'+index" @play="videoPlay(index)" :src="item.url" controls
             object-fit="cover"></video>
    </view>
  </view>
</template>

<script>
export default {
  name: "Videobox",
  props: {
    "video": {type: Array},
  },
  data() {
    return {}
  },

  onShow() {

  },

  methods: {

    videoPlay(index) {
      let video = uni.createVideoContext("video" + index, this)
      video.play();
      for (var i = 0; i < this.video.length; i++) {
        if (i != index) {
          let video2 = uni.createVideoContext("video" + i, this);
          video2.pause();
        }
      }
    }

  }

}
</script>


<style lang="scss" scoped>
image {
  width: 100%;
  height: 100%;
}

.video-box {
  height: 400 rpx;
  position: relative;
  margin-bottom: 20 rpx;

  .video {
    width: 100%;
    height: 100%;
  }
}
</style>
