<template>
    <view class="main" v-if="isLoading === false">
        <u-loading-page loading-mode="spinner"></u-loading-page>
        <view class="qrimg">
            <tki-qrcode cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :icon="icon" :iconSize="iconsize"
                :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
        </view>
        <view class="info">
            <u-row>
                <u-text text="Order Code" size="30"></u-text>
                <u-text :text="order.order.orderCode" align="right" size="30"></u-text>
            </u-row>
            <u-divider></u-divider>
            <u-row>
                <u-text text="Amount" size="30"></u-text>
                <u-text :text="order.order.amount" align="right" size="30"></u-text>
            </u-row>
            <u-row>
                <u-text text="Time Range" size="30"></u-text>
                <u-text :text="order.order.startTime + '\n' + order.order.endTime" align="right" size="30"></u-text>
            </u-row>
            <u-row>
                <u-text text="Facility" size="30"></u-text>
                <u-text :text="order.place.name" align="right" size="30"></u-text>
            </u-row>
            <u-row>
                <u-text text="Status" size="30"></u-text>
                <u-text :text="order.order.status" align="right" size="30"></u-text>
            </u-row>
        </view>
    </view>
</template>

<script>
import { getOrderDetail } from '../../api/order';
import { getFacilityDetail } from '../../api/facility';
import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"

export default {
    components: {
        tkiQrcode
    },
    data() {
        return {
            id: '',
            val: '二维码',
            size: 200,
            unit: 'rpx',
            background: '#b4e9e2',
            foreground: '#309286',
            pdground: '#32dbc6',
            icon: '',
            iconsize: 40,
            lv: 3,
            onval: true,
            loadMake: true,
            src: '',
            order: {},
            isLoading: true
        };
    },
    watch: {
        id(val) {
            if (!val) return
            this.getDetail()
        }
    },
    onLoad() {
        this.id = this.$route.query.orderCode
        console.log(this.id)
    },
    methods: {
        qrR(res) {
            this.src = res
        },
        async getDetail() {
            await getOrderDetail(this.id).then(res => {
                console.log(res)
                this.order = res.data.order
                this.val = this.order.order.orderCode
                this.isLoading = false
                // this.getFacilityDetails(res.data.order.order.facilityId)
            }).catch(err => {
                console.log(err)
            })
        },
        async getFacilityDetails(id) {
            await getFacilityDetail(id).then(res => {
                console.log(res)
                this.order.place = res.data.facility
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.qrimg {
    margin: 20rpx;
    display: flex;
    justify-content: center;
}
.info {
    margin: 20rpx;
    background-color: white;
    border-radius: 20rpx;
    padding: 20rpx;
}
</style>