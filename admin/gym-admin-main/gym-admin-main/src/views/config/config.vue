<template>
  <div class="app-container">
    <el-row v-for="(item, index) in configs" :key="index" :gutter="30" style="height: 50px;">
      <el-col :span="2">
        <span>{{ item.key }}</span>
      </el-col>
      <el-col v-if="item.type === 'time'" :span="10">
        <el-time-select v-model="item.value" :picker-options="{ start: '07:00', step: '00:30', end: '23:00' }" />
      </el-col>
      <el-col v-if="item.type === 'string'" :span="10">
        <el-input v-model="item.value" />
      </el-col>
    </el-row>
    <el-button type="primary" @click="handleSave()">Save</el-button>
  </div>
</template>

<script>
// TODO: Make this editable
import { getConfig, updateConfig } from '@/api/config'
export default {
  name: 'Config',
  data() {
    return {
      configs: [],
      updateConfigs: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      getConfig().then(res => {
        this.configs = res.data.config
        this.updateConfigs = res.data.config
      }).catch(err => {
        console.log(err)
      })
    },
    handleSave() {
      for (let i = 0; i < this.configs.length; i++) {
        if (this.configs[i].value !== this.updateConfigs[i].value) {
          this.updateConfigs[i].value = this.configs[i].value
        }
      }
      this.updateConfig()
    },
    async updateConfig() {
      await updateConfig({ configs: this.updateConfigs }).then(res => {
        this.$message({
          message: 'Update config successfully',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }

}

</script>

