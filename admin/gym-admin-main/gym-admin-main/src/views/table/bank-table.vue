<template>
  <div class="app-container">
    <el-button type="primary" @click="openAddBank">Add Bank</el-button>
    <el-table :key="tableKey" :data="bankList" border fit highlight-current-row>
      <el-table-column label="ID" prop="id" />
      <el-table-column label="Name" prop="name" />
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.status != 'available'" size="mini" type="danger" @click="handleDelete(row, $index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible">
      <el-form :model="editForm" label-width="90px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="editForm.name" placeholder="Name" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmEdit">Confirm</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="addDialogVisible">
      <el-form :model="addForm" label-width="90px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="addForm.name" placeholder="Name" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="addDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmAdd">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBankList, UpdateBank, DeleteBank, AddBank } from '@/api/bank'

export default {
  name: 'BankTable',
  data() {
    return {
      listQuery: {
        title: '',
        importance: '',
        sort: ''
      },
      sortOptions: [
        {
          key: 'id',
          label: 'ID'
        },
        {
          key: 'pageviews',
          label: 'Pageviews'
        }
      ],
      importanceOptions: ['1', '2', '3'],
      bankList: [],
      tableKey: 0,
      dialogVisible: false,
      addDialogVisible: false,
      editForm: {
        id: '',
        name: ''
      },
      addForm: {
        name: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      getBankList().then(res => {
        this.bankList = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
    handleFilter() {
      console.log('filter')
    },
    handleCreate() {
      this.$router.push('/bank/create')
    },
    handleUpdate(row) {
      console.log(row)
      this.dialogVisible = true
      this.editForm.id = row.id
      this.editForm.name = row.name
    },
    handleDelete(row, index) {
      console.log(row)
      DeleteBank({
        id: row.id
      }).then(res => {
        this.$message({
          message: 'Delete Success',
          type: 'success'
        })
        this.bankList.splice(index, 1)
      }).catch(err => {
        console.log(err)
      })
    },
    openAddBank() {
      this.addDialogVisible = true
    },
    async confirmEdit() {
      await UpdateBank({
        id: this.editForm.id,
        name: this.editForm.name
        // status: this.editForm.status
      }).then(res => {
        this.$message({
          message: 'Update Success',
          type: 'success'
        })
        this.fetchData()
        this.dialogVisible = false
      }).catch(err => {
        console.log(err)
      })
    },
    async confirmAdd() {
      await AddBank({
        name: this.addForm.name
      }).then(res => {
        this.$message({
          message: 'Add Success',
          type: 'success'
        })
        this.fetchData()
        this.addDialogVisible = false
      }).catch(err => {
        console.log(err)
      })
    }
  }
}

</script>
