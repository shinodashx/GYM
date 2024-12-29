<template>
    <view>
        <view class="info">
            <u-form label-position="left"  label-width="100">
                <u-form-item borderBottom label="Facility"></u-form-item>
                <u-form-item borderBottom label="Facility"></u-form-item>
            </u-form>
        </view>
        <view>
            <u-datetime-picker :show="show" v-model="startTime" mode="datetime" closeOnClickOverlay @confirm="confirm"
                @cancel="cancel" @change="change" @close="close"></u-datetime-picker>
            <u-button @click="show = true">{{ timestamp2time(startTime) }}</u-button>
        </view>
    </view>
</template>

<script>
import { getOccupiedTime } from '../../api/facility'
export default {

    data() {
        return {
            placeId: '',
            isLoading: true,
            show: false,
            startTime: '',
            endTime: '',
        }
    },
    methods: {
        async getOccupiedTimeReq() {
            await getOccupiedTime(this.placeId).then(res => {
                console.log(res)
                this.occupiedTime = res.data.occupied
                this.isLoading = false
                console.log(this.occupiedTime)
            }).catch(err => {
                console.log(err)
            })
        },
        close() {
            this.show = false
        },
        cancel() {
            this.show = false
        },
        confirm(e) {
            this.show = false
        },
        change(e) {
            // console.log('change', e)
        },
        filter(type, options) {

        },
        timestamp2time(timestamp) {
            if (timestamp == '') {
                return 'Please select a time'
            }
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes() + ':';
            var s = date.getSeconds();
            return Y + M + D + h + m + s;
        },
    },
    onLoad() {
        this.placeId = this.$route.query.id
        console.log(this.placeId)
        this.getOccupiedTimeReq()
    }
}
</script>
<style scoped></style>
