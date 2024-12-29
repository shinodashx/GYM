<template>
  <div>
    <el-table :data="order_list" style="width: 100%;padding-top: 15px;">
      <el-table-column prop="order.id" label="Order_No" min-width="150" />
      <el-table-column prop="place.name" label="PlaceName" min-width="150" />
      <el-table-column prop="order.startTime" label="startTime" min-width="195" align="center" />
      <el-table-column prop="order.endTime" label="endTime" min-width="195" align="center" />
      <el-table-column prop="order.amount" label="Price" min-width="130" align="center" />
      <el-table-column prop="order.status" label="Status" min-width="200" align="center" />
      <el-table-column label="Operations" min-width="140">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleClick(row)">
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="onGoing">

      <el-row>
        <h2>Ongoing Order</h2>
        <el-divider />
        <el-col v-for="item in order_list" :key="item.order.id" :span="8">
          <OnGoingCard :item="item" />

        </el-col>
      </el-row>
    </div>
    <el-dialog :visible.sync="transactionDialogVisible" title="Details" width="30%">
      <el-form v-if="transactionDialogVisible">
        <el-form-item label="Order_No">
          <el-input v-model="dialogData.order.id" disabled />
        </el-form-item>
        <el-form-item label="PlaceName">
          <el-input v-model="dialogData.place.name" disabled />
        </el-form-item>
        <el-form-item label="startTime">
          <el-input v-model="dialogData.order.startTime" disabled />
        </el-form-item>
        <el-form-item label="endTime">
          <el-input v-model="dialogData.order.endTime" disabled />
        </el-form-item>
        <el-form-item label="Price">
          <el-input v-model="dialogData.order.amount" disabled />
        </el-form-item>
        <el-form-item label="Status">
          <el-input v-model="dialogData.order.status" disabled />
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="transactionDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="transactionDialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
    <DailyIncomeChart />
  </div>
</template>

<script>
import { getOrderList } from '@/api/order'
import OnGoingCard from './OnGoingCard.vue'
import DailyIncomeChart from './DailyIncomeChart.vue'

export default {
  // components: { DailyIncomeChart, OnGoingCard },
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  components: { DailyIncomeChart, OnGoingCard },
  data() {
    return {
      order_list: [],
      transactionDialogVisible: false,
      gridData: {},
      dialogData: {
        order: {},
        place: {}
      }
    }
  },
  computed: {
    onGoingBackground(item) {
      console.log(item)
      const currentTime = new Date()
      // let startTime = new Date(item.order.startTime)
      const endTime = new Date(item.order.endTime)
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
  created() {
    this.setOrderList()
  },
  methods: {
    async setOrderList() {
      getOrderList().then(response => {
        for (let i = 0; i < response.data.order.length; i++) {
          response.data.order[i].order.status = this.getOrderStatus(response.data.order[i].order.status)
        }
        this.order_list = response.data.order.slice(0, response.data.order.length > 8 ? 8 : response.data.order.length)
        console.log(this.order_list)
      }).catch(error => {
        console.log(error)
      })
    },
    getOrderStatus(i) {
      if (i === 0) {
        return 'waiting for payment'
      } else if (i === 1) {
        return 'waiting for using'
      } else if (i === 2) {
        return 'Using'
      } else if (i === 3) {
        return 'Done'
      } else if (i === 4) {
        return 'Canceled'
      } else if (i === 5) {
        return 'Refund'
      } else {
        return 'Unknown'
      }
    },
    handleClick(row) {
      console.log(this.transactionDialogVisible)
      this.transactionDialogVisible = true
      console.log(this.transactionDialogVisible)
      console.log(row)
      this.dialogData = row
    },
    handleDelete(row, index) {
      console.log(index, row)
    }
  }
}
</script>

<style scoped>
.onGoing {
  /* margin: 20px; */
  padding: 20px;
  background: rgba(0, 128, 0, 0.284);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  margin-top: 20px;
  margin-bottom: 20px;
}

.onGoing:hover {
  background: rgba(0, 128, 0, 0.5);
}

.onGoing:active {
  background: rgba(0, 128, 0, 0.5);
}

.box {
  margin: 20px;
  padding: 20px;
  background: rgba(0, 128, 0, 0.284);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
