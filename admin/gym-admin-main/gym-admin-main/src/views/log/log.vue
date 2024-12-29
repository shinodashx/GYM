<template>
  <div class="main">
    <div class="block">
      <span class="demonstration">Date: </span>
      <el-date-picker v-model="date" type="date" placeholder="Choose Date" @change="dateChange" />
    </div>
    <div class="logs">
      <textarea v-model="logs" style="width: 100%; height: 500px; resize: none;" readonly />
      <textarea v-model="sqlLogs" style="width: 100%; height: 500px; resize: none;" readonly />
    </div>
  </div>
</template>

<script>
import { getLogs } from '@/api/system'

export default {
  name: 'Logs',
  data() {
    return {
      logs: '',
      loading: true,
      date: new Date(),
      sqlLogs: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const today = new Date(this.date)
      await getLogs(
        {
          date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        }
      ).then(res => {
        this.logs = res.data.sysLogs
        this.sqlLogs = res.data.sqlLogs
        this.loading = false
      }).catch(err => {
        console.log(err)
      })
    },
    dateChange() {
      this.loading = true
      this.logs = ''
      this.fetchData()
    }
  }

}

</script>

<style scoped>
.main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
}
.logs {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20px;
}
</style>
