<template>
  <div class="app-container">
    <el-button type="primary" @click="handleEdit(null, 'add')">Add Facility</el-button>
    <el-table :data="TotalFacility" style="width: 100%;margin-top:30px;" border>
      <el-table-column type="expand">
        <template slot-scope="{row}">

          <el-container>
            <el-aside width="40%">
              <el-carousel height="500px">
                <el-carousel-item v-for="item in row.facility.images" :key="item.name">
                  <!-- sacle image -->
                  <div class="image-container">
                    <img :src="item.url" :alt="item.name" style="width: 100%">
                  </div>
                </el-carousel-item>
              </el-carousel>
            </el-aside>
            <el-main>
              <div>
                <el-button type="primary" style="margin: 10px" @click="handlePlaceEdit(null, 'add', row.facility.id)">Add
                  Place</el-button>
                <el-table :data="row.places" border>
                  <!-- <el-table-column prop="id" label="ID" /> -->
                  <el-table-column prop="name" label="Name" />
                  <el-table-column prop="description" label="Description" />
                  <el-table-column prop="cost" label="Cost" />
                  <el-table-column align="center" label="Operations">
                    <template slot-scope="{row}">
                      <el-button
                        type="primary"
                        size="small"
                        @click="handlePlaceEdit(row, 'update', null)"
                      >Edit</el-button>
                      <el-button type="danger" size="small" @click="handlePlaceDelete(row)">Delete</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div v-if="row.facility.lat && row.facility.long" style="width: 100%; height: 400px;">
                  <amap
                    cache-key="home-map"
                    map-style="amap://styles/whitesmoke"
                    :zoom="15"
                    :center="[row.facility.long, row.facility.lat]"
                  >
                    <amap-marker
                      :position="[row.facility.long, row.facility.lat]"
                      :label="{
                        content: row.facility.name,
                        direction: 'bottom',
                      }"
                    />
                  </amap>
                </div>
              </div>
            </el-main>
          </el-container>

          <br>

        </template>
      </el-table-column>
      <el-table-column prop="facility.id" align="center" label="ID" />
      <el-table-column prop="facility.name" align="center" label="Facility Name" />
      <el-table-column prop="facility.description" align="center" label="Facility Description" />
      <el-table-column prop="facility.location" align="center" label="Facility Location" />
      <el-table-column prop="facility.tags" align="center" label="Facility Tags" />
      <el-table-column prop="facility.lat" align="center" label="Laitiude" />
      <el-table-column prop="facility.long" align="center" label="Longtitude" />
      <el-table-column align="center" label="Operations">
        <template slot-scope="{row}">
          <el-button type="primary" size="small" @click="handleEdit(row, 'update')">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="editFacilityDialogvisible">
      <el-form :model="dialogData" label-width="200px" label-position="left">
        <el-form-item label="Facility Name">
          <el-input v-model="dialogData.facility.name" placeholder="Facility Name" />
        </el-form-item>
        <el-form-item label="Facility Description">
          <el-input v-model="dialogData.facility.description" placeholder="Facility Description" />
        </el-form-item>
        <el-form-item label="Facility Location">
          <el-input v-model="dialogData.facility.location" placeholder="Facility Location" />
        </el-form-item>
        <el-form-item label="Facility Tags">
          <el-input v-model="dialogData.facility.tags" placeholder="Facility Tags" />
        </el-form-item>
      </el-form>
      <el-upload
        class="upload-demo"
        action="/api/v1/upload/facility"
        :on-preview="handlePreview"
        :on-success="onUploadSuccess"
        :on-remove="handleRemove"
        :file-list="dialogData.facility.images"
        list-type="picture"
      >
        <el-button size="small" type="primary">Click to upload</el-button>
        <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
      </el-upload>
      <br>
      <!-- map selector -->
      <div style="width: 100%; height: 400px;">
        <amap
          cache-key="home-map"
          map-style="amap://styles/whitesmoke"
          :zoom="15"
          :center="[dialogData.facility.long, dialogData.facility.lat]"
        >
          <amap-marker
            :position="[dialogData.facility.long, dialogData.facility.lat]"
            :label="{
              content: dialogData.facility.name,
              direction: 'bottom',
            }"
          />
          <amap-mouse-tool :mode="mode" @draw="onDraw" />
        </amap>
      </div>

      <div style="text-align:right;">
        <el-button type="danger" @click="editFacilityDialogvisible = false">Cancel</el-button>
        <el-button type="primary" @click="facilityUpdateOrAdd">Confirm</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="editPlaceDialogVisible">
      <el-form :model="placeDialogData" label-width="200px" label-position="left">
        <el-form-item label="Place Name">
          <el-input v-model="placeDialogData.name" placeholder="Facility Name" />
        </el-form-item>
        <el-form-item label="Place Description">
          <el-input v-model="placeDialogData.description" placeholder="Facility Description" />
        </el-form-item>
        <el-form-item label="Place Cost">
          <el-input v-model="placeDialogData.cost" placeholder="Facility Location" />
        </el-form-item>
      </el-form>
      <br>
      <div style="text-align:right;">
        <el-button type="danger" @click="editPlaceDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="placeUpdateOrAdd">Confirm</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { DeletePlace, DeleteFacility, addFacility, addFacilityPlace, ModifyFacility, getFacilityList, modifyFacilityPlace } from '@/api/facility'
import { randomBytes } from 'crypto'
// import { Amap } from '@amap/amap-vue'
export default {
  name: 'FacilityTable',
  components: {
    // Amap
  },
  data() {
    return {
      mode: 'none',
      dialogType: '',
      placeDialogType: '',
      TotalFacility: [],
      editFacilityDialogvisible: false,
      editPlaceDialogVisible: false,
      dialogData: {
        facility: {
          name: '',
          description: '',
          location: '',
          tags: [],
          lat: 0,
          long: 0
        },
        place: {
          name: ''
        }
      },
      placeDialogData: {
        name: '',
        cost: '',
        id: '',
        description: ''

      }
    }
  },
  created() {
    this.fetchData()
    window._AMapSecurityConfig = {
      serviceHost: 'http://101.42.160.53:80/_AMapService'
      // 例如 ：serviceHost:'http/://1.1.1.1:80/_AMapService',
    }
    // window._AMapSecurityConfig = {
    //   securityJsCode: "2594f8d6a43239c17773aa092a47ec6f" // 开发环境采用，直接配置你的jscode
    // };
  },
  methods: {
    onDraw(e, res) {
      console.log('onDraw')
      console.log(e)
      this.dialogData.facility.lat = res[1]
      this.dialogData.facility.long = res[0]
      console.log(this.dialogData.facility.lat)
      this.mode = 'none'
    },
    facilityUpdateOrAdd() {
      this.mode = 'marker'
      if (this.dialogType === 'update') {
        this.confirmEdit()
      } else {
        this.confirmAdd()
      }
    },
    placeUpdateOrAdd() {
      if (this.placeDialogType === 'update') {
        this.confirmPlaceEdit()
      } else {
        this.confirmPlaceAdd()
      }
    },
    async confirmPlaceAdd() {
      await addFacilityPlace({
        name: this.placeDialogData.name,
        cost: this.placeDialogData.cost,
        description: this.placeDialogData.description,
        facility_id: this.placeDialogData.facilityId
      }).then(res => {
        console.log(res)
        this.editPlaceDialogVisible = false
        this.fetchData()
        this.$message({
          type: 'success',
          message: 'Add place successfully!'
        })
      }).catch(err => {
        console.log(err)
      })
    },
    async fetchData() {
      await getFacilityList().then(res => {
        console.log(res)
        this.TotalFacility = res.data.facility
        // deal with the commer split images in facility.images
        this.TotalFacility.forEach(item => {
          item.facility.images = item.facility.images.split(',')
          // pop out the last item in facility.images
          // item.facility.images.pop()
          item.facility.images = this.processImageList(item.facility.images)
          // item.facility.tags = item.facility.tags.split(',')
        })
        console.log(this.TotalFacility)
      }).catch(err => {
        console.log(err)
      })
    },
    async confirmPlaceEdit() {
      console.log(this.dialogData)
      await modifyFacilityPlace({
        id: this.placeDialogData.id,
        name: this.placeDialogData.name,
        cost: this.placeDialogData.cost,
        description: this.placeDialogData.description,
        facility_id: this.placeDialogData.facilityId,
        lat: this.placeDialogData.lat,
        long: this.placeDialogData.long
      }).then(res => {
        console.log(res)
        this.editPlaceDialogVisible = false
        this.$message({
          message: 'Modify place successfully',
          type: 'success'
        })
        this.fetchData()
      }).catch(err => {
        console.log(err)
      })
    },
    onUploadSuccess(response, file, fileList) {
      console.log(response)
      const url = response.data.url
      const name = response.data.name
      this.dialogData.facility.images.push({
        name: name,
        url: url
      })
    },
    handleEdit(scope, type) {
      this.mode = 'marker'
      // deep copy
      if (type === 'update') {
        this.dialogType = 'update'
        this.dialogData = JSON.parse(JSON.stringify(scope))
        // this.dialogData.facility.images = this.processImageList(this.dialogData.facility.images)
        this.editFacilityDialogvisible = true
        console.log(this.dialogData)
      } else if (type === 'add') {
        this.dialogType = 'add'
        this.dialogData = {
          facility: {
            name: '',
            description: '',
            location: '',
            images: []
          },
          place: {
            name: ''
          }
        }
        this.editFacilityDialogvisible = true
      }
    },
    processImageList(images) {
      // format like {name: 'xxx', url: 'xxx'}
      const imageList = []
      images.forEach(item => {
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
    },
    async confirmAdd() {
      await addFacility({
        name: this.dialogData.facility.name,
        description: this.dialogData.facility.description,
        location: this.dialogData.facility.location,
        image: this.reverseProcessImageList(this.dialogData.facility.images),
        tags: this.dialogData.facility.tags.split(','),
        lat: this.dialogData.facility.lat,
        long: this.dialogData.facility.long
      }).then(res => {
        this.$message({
          type: 'success',
          message: 'Add Success!'
        })
        this.editFacilityDialogvisible = false
        this.fetchData()
      }).catch(err => {
        this.$message({
          type: 'error',
          message: 'Add Failed! ' + err
        })
      })
    },
    async confirmEdit() {
      await ModifyFacility({
        id: this.dialogData.facility.id,
        name: this.dialogData.facility.name,
        description: this.dialogData.facility.description,
        location: this.dialogData.facility.location,
        image: this.reverseProcessImageList(this.dialogData.facility.images),
        tags: this.dialogData.facility.tags.split(','),
        lat: this.dialogData.facility.lat,
        long: this.dialogData.facility.long
      }).then(res => {
        this.$message({
          type: 'success',
          message: 'Modify Success!'
        })
        this.editFacilityDialogvisible = false
        this.fetchData()
      }).catch(err => {
        this.$message({
          type: 'error',
          message: 'Modify Failed! ' + err
        })
      })
    },
    handlePreview(file) {
      console.log(file)
    },
    handleRemove(file) {
      console.log(file)
      // remove the image from the dialogData.facility.images
      this.dialogData.facility.images.forEach((item, index) => {
        if (item.name === file.name) {
          this.dialogData.facility.images.splice(index, 1)
        }
      })
    },
    handlePlaceEdit(row, type, parentFacility) {
      console.log(row)
      if (type === 'update') {
        this.placeDialogType = 'update'

        this.placeDialogData = row
        this.editPlaceDialogVisible = true
      } else if (type === 'add') {
        this.placeDialogType = 'add'
        this.placeDialogData = {
          name: '',
          cost: '',
          description: '',
          facilityId: parentFacility
        }
        this.editPlaceDialogVisible = true
      }
    },
    async confirmDelete(row) {
      await DeleteFacility({
        id: row.facility.id
      }).then(res => {
        this.$message({
          type: 'success',
          message: 'Delete Success!'
        })
        this.fetchData()
      }).catch(err => {
        this.$message({
          type: 'error',
          message: 'Delete Failed! ' + err
        })
      })
    },
    handleDelete(row) {
      console.log(row)
      // delete facility
      this.confirmDelete(row)
    },
    handlePlaceDelete(row) {
      console.log(row)
      // delete place
      this.confirmPlaceDelete(row)
    },
    async confirmPlaceDelete(row) {
      await DeletePlace({
        id: row.id
      }).then(res => {
        this.$message({
          type: 'success',
          message: 'Delete Success!'
        })
        this.fetchData()
      }).catch(err => {
        this.$message({
          type: 'error',
          message: 'Delete Failed! ' + err
        })
      })
    }

  }
}

</script>
