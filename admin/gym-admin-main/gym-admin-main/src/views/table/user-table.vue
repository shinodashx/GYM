<template>
  <div class="app-container">
    <el-table :data="TotalUser" style="width: 100%;margin-top:30px;" border>
      <el-table-column prop="username" align="center" label="User Name" width="220" />
      <el-table-column prop="role" align="center" label="User Permisssion" width="220" />
      <el-table-column prop="email" align="header-center" label="Email" />
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible">
      <el-form :model="dialogData" label-width="90px" label-position="left">
        <el-form-item label="UserName">
          <el-input v-model="dialogData.username" placeholder="User Name" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="dialogData.email" placeholder="Email" />
        </el-form-item>

        <el-form-item label="User Role">
          <el-select v-model="dialogData.role" class="filter-item" placeholder="Please select">
            <!-- 0:normal user 1:admin 2:manager -->
            <el-option :key="0" label="normal user" :value="0" />
            <el-option :key="1" label="admin" :value="1" />
            <el-option :key="2" label="manager" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmEdit">Confirm</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
import { getUserList, UpdateUser } from '@/api/user'

export default {
  name: 'UserTable',
  data() {
    return {
      TotalUser: [],
      dialogVisible: false,
      dialogData: {},
      temp: {
        status: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleEdit(scope) {
      console.log(scope)
      this.dialogVisible = true
      this.dialogData = scope.row
    },
    handleDelete(scope) {
      console.log(scope)
    },
    async fetchData() {
      await getUserList().then(res => {
        console.log(res)
        this.TotalUser = res.data.user
      }).catch(err => {
        console.log(err)
      })
    },
    async confirmEdit() {
      console.log(this.dialogData)
      await UpdateUser({
        id: this.dialogData.id,
        username: this.dialogData.username,
        email: this.dialogData.email,
        role: this.dialogData.role,
        gender: this.dialogData.gender,
        phone: this.dialogData.phone
      }).then(res => {
        this.$message({
          type: 'success',
          message: 'Edit Success!'
        })
        this.dialogVisible = false
        this.fetchData()
      }).catch(err => {
        console.log(err)
      })
    }
  }

}
</script>
