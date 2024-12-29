<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="announcements" border>
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="title" label="Title" />
      <el-table-column prop="content" label="Content" />
      <!-- <el-table-column prop="createdAt" label="Created At" /> -->
      <el-table-column prop="updateTime" label="Updated At" />
      <el-table-column prop="images" label="Images">
        <template slot-scope="{row}">
          <el-image
            v-for="image in row.images"
            :key="image.id"
            :src="image.url"
            :preview-src-list="row.images.map(item => item.url)"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="{row}">
          <el-button type="primary" size="small" @click="handleEdit(row, 'update', null)">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <el-form ref="dialogForm" :model="dialogData" label-width="100px">
        <el-form-item label="Title" prop="title">
          <el-input v-model="dialogData.title" />
        </el-form-item>
        <el-form-item label="Content" prop="content">
          <el-input v-model="dialogData.content" />
        </el-form-item>
      </el-form>
      <el-upload
        class="upload-demo"
        action="/api/v1/upload"
        :on-preview="handlePreview"
        :on-success="onUploadSuccess"
        :on-remove="handleRemove"
        :file-list="dialogData.images"
        list-type="picture"
      >
        <el-button size="small" type="primary">Click to upload</el-button>
        <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="editOrAdd()">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAnnouncement, modifyAnnouncement, deleteAnnouncement } from '@/api/announcement'
// import { thisTypeAnnotation } from '@babel/types'
import { randomBytes } from 'crypto'

export default {
  name: 'AnnouncementTable',
  data() {
    return {
      announcements: [],
      loading: true,
      user_id: 0,
      facility_id: 0,
      dialogVisible: false,
      dialogType: '',
      dialogData: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async handleDelete(row) {
      await deleteAnnouncement({ id: row.id }).then(res => {
        this.$message({
          type: 'success',
          message: 'Delete successfully!'
        })
        this.fetchData()
      }).catch(err => {
        console.log(err)
      })
    },
    editOrAdd() {
      if (this.dialogType === 'add') {
        this.addAnnouncement()
      } else if (this.dialogType === 'update') {
        this.updateAnnouncement()
      }
    },
    async addAnnouncement() {
      const data = {
        title: this.dialogData.title,
        content: this.dialogData.content,
        images: this.dialogData.images
      }
      console.log(data)
      this.dialogVisible = false
      this.$message({
        type: 'success',
        message: 'Add successfully!'
      })
      this.fetchData()
    },
    async updateAnnouncement() {
      const data = {
        id: this.dialogData.id,
        title: this.dialogData.title,
        content: this.dialogData.content,
        images: this.reverseProcessImageList(this.dialogData.images)
      }
      await modifyAnnouncement(data)
      console.log(data)
      this.dialogVisible = false
      this.$message({
        type: 'success',
        message: 'Update successfully!'
      })
      this.fetchData()
    },
    handlePreview(file) {
      console.log(file)
    },
    handleRemove(file) {
      console.log(file)
      // remove the image from
      this.dialogData.images.forEach((item, index) => {
        if (item.name === file.name) {
          this.dialogData.images.splice(index, 1)
        }
      })
    },
    onUploadSuccess(response, file, fileList) {
      console.log(response)
      const url = response.data.url
      const name = response.data.name
      this.dialogData.images.push({
        name: name,
        url: url
      })
    },
    async fetchData() {
      getAnnouncement({}).then(res => {
        this.announcements = res.data.announcement
        this.loading = false

        if (this.announcements.length > 0) {
          this.announcements.forEach(item => {
            item.images = this.processImageList(item.images)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleEdit(row, type, index) {
      this.dialogType = type
      this.dialogData = Object.assign({}, row)
      this.dialogVisible = true
    },
    processImageList(images) {
      // format like {name: 'xxx', url: 'xxx'}
      const imagess = images.split(',')
      imagess.pop()
      const imageList = []
      imagess.forEach(item => {
        imageList.push({
          name: item + '?' + randomBytes(10).toString('hex'),
          url: item
        })
      })
      return imageList
    },
    reverseProcessImageList(images) {
      // format like ['xxx', 'xxx']
      const imageList = []
      images.forEach(item => {
        imageList.push(item.url)
      })
      return imageList
    }
  }
}

</script>
