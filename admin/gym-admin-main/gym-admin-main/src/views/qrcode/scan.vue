<template>
  <div clas="app-container">
    <div>
      <p class="error">{{ error }}</p>

      <p class="decode-result">Last result: <b>{{ result }}</b></p>
      <div class="video-container">

        <qrcode-stream @decode="onDecode" @init="onInit" />
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="Details" width="30%">
      <el-form v-if="dialogVisible">
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
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="startOrder()">
            Start Order
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import { getOrderDetailByOrderCode, StartOrderByOrderCode } from '@/api/order'

export default {
  components: {
    QrcodeStream
  },

  data() {
    return {
      result: 'No result yet',
      error: null,
      dialogVisible: false,
      dialogData: {
        order: {},
        place: {}
      }
    }
  },

  methods: {
    onDecode(result) {
      this.result = result
      this.fetchOrder()
    },

    onInit(promise) {
      promise.then(() => {
        console.log('Successfully initilized! Ready for scanning now!')
      })
        .catch(error => {
          if (error.name === 'NotAllowedError') {
            this.error = 'Camera access not allowed!'
          } else if (error.name === 'NotFoundError') {
            this.error = 'No suitable camera device found!'
          } else if (error.name === 'NotSupportedError') {
            this.error = 'Page is not served over HTTPS (or localhost)!'
          } else if (error.name === 'NotReadableError') {
            this.error = 'Couldn\'t access your camera. Is it already in use?'
          } else if (error.name === 'OverconstrainedError') {
            this.error = 'Constraints don\'t match any installed camera. Did you asked for the front camera although there is none?'
          } else {
            this.error = 'UNKNOWN ERROR: ' + error.message
          }
        })
    },

    async fetchOrder() {
      await getOrderDetailByOrderCode({ orderCode: this.result }).then(response => {
        this.dialogData = response.data.order
        this.dialogVisible = true
      })
    },

    async startOrder() {
      await StartOrderByOrderCode({ orderCode: this.result }).then(response => {
        // this.dialogData = response.data.order
        this.dialogVisible = false
        this.$message({
          message: 'Start Order Success',
          type: 'success'
        })
      })
    }
  }
}

</script>

<style scoped>
.error {
    font-weight: bold;
    color: red;
}

.video-container {
    position: relative;
    width: 70%;
    margin: auto;
}
</style>
