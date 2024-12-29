<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="evaluations" border>
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="userId" label="User ID" />
      <el-table-column prop="facilityId" label="Facility ID" />
      <el-table-column prop="score" label="Score" />
      <el-table-column prop="description" label="Comment" />
      <el-table-column align="center" label="Operations">
        <template slot-scope="{row}">
          <!-- <el-button type="primary" size="small" @click="handlePlaceEdit(row, 'update', null)">Edit</el-button> -->
          <el-button type="danger" size="small" @click="handleDelete(row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getEvaluation } from '@/api/evaluation'

export default {
  name: 'EvaluationTable',
  data() {
    return {
      evaluations: [],
      loading: true,
      user_id: 0,
      facility_id: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      getEvaluation({
        user_id: this.user_id,
        facility_id: this.facility_id

      }).then(res => {
        this.evaluations = res.data.evaluations
        this.loading = false
      }).catch(err => {
        console.log(err)
      })
    }
  }
}

</script>
