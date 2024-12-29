<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { getDailyIncome } from '@/api/visualize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    async fetchDailyIncome() {
      const today = new Date()
      const startDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6)
      const endDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
      await getDailyIncome({
        start_date: startDay,
        end_date: endDay
      }).then(response => {
        console.log(response)
        const data = response.data.incomes
        const xAxisData = []
        const seriesData = []
        for (let i = 0; i < data.length; i++) {
          xAxisData.push(data[i].date)
          seriesData.push(data[i].income)
        }
        this.chart.setOption({
          xAxis: [{
            data: xAxisData
          }],
          series: [{
            type: 'bar',
            data: seriesData
          }]
        })
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.fetchDailyIncome()

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{}]
      })
    }
  }
}
</script>
