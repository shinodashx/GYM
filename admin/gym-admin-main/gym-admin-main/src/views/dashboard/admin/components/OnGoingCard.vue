<template>
  <div :style="background">
    <el-card v-if="item.order.status === 'Using'" class="box-card">
      <div slot="header" class="clearfix">
        <span>Order_No: {{ item.order.id }}</span>
      </div>
      <el-row>
        <el-col :span="12">
          <span>PlaceName: {{ item.place.name }}</span>
        </el-col>
        <el-col :span="12">
          <span>startTime: {{ item.order.startTime }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span>endTime: {{ item.order.endTime }}</span>
        </el-col>
        <el-col :span="12">
          <span>Price: {{ item.order.amount }}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span>Status: {{ item.order.status }}</span>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" size="mini" @click="handleClick(item)">
            Edit
          </el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'OnGoingCard',
  props: {
    item: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    background() {
      // console.log(item)
      const currentTime = new Date()
      // let startTime = new Date(item.order.startTime)
      const endTime = new Date(this.item.order.endTime)
      // 15 min left -> yellow
      // 5 min left -> red
      const diff = endTime - currentTime
      if (diff < 0) {
        return 'background: rgba(255, 0, 0, 0.284);'
      } else if (diff < 5 * 60 * 1000) {
        return 'background: rgba(255, 0, 0, 0.284);'
      } else if (diff < 15 * 60 * 1000) {
        return 'background: rgba(255, 255, 0, 0.284);'
      } else {
        return 'background: rgba(0, 128, 0, 0.284);'
      }
    }
  },
  methods: {
    handleClick(item) {
      this.$emit('handleClick', item)
    }
  }
}

</script>
