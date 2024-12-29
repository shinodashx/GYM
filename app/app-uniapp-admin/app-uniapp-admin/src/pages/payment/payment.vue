<template>
    <view class="main">

        <view class="info-card" v-if="isLoading === false">
            <u-row>
                <u-text :text="order.order.orderCode" size="30"></u-text>
                <u-text bold color="red" align="right" :text="order.order.amount" size="35"></u-text>
            </u-row>
            <u-row>
                <u-text bold color="red" align="left" text="Time Range" size="25"></u-text>
                <u-text align="right" :text="order.order.startTime + '\n' + order.order.endTime" size="25"></u-text>
            </u-row>
            <u-row>
                <u-text bold color="red" align="left" text="Facility" size="25"></u-text>
                <u-text align="right" :text="order.place.name" size="25"></u-text>
            </u-row>
            <u-divider></u-divider>
            <u-text bold color="red" align="left" text="Payment" size="25"></u-text>
            <u-row>
                <u-text align="left" text="Discount" size="25"></u-text>
                <u-text align="right" :text="order.order.discount" size="25"></u-text>
            </u-row>
            <u-row>
                <u-text align="left" text="Total" size="25"></u-text>
                <u-text align="right" :text="order.order.amount" size="25"></u-text>
            </u-row>
            <u-button type="primary" text="Pay" :loading="isLoading" @click="onPay"></u-button>
            <view>
                <u-popup :show="showPayment" :round="10" mode="bottom" @close="close" class="item">
                    <view class="modal-view">
                        <u-form label-position="left" label-width="200">
                            <u-form-item label="Payment Type" borderBottom @click="showType = true">
                                <u-input @click="showType = true" v-model="paymentType" disabled
                                    placeholder="Please select payment type"></u-input>
                                <u-icon slot="right" name="arrow-right"></u-icon>
                            </u-form-item>
                            <u-form-item label="Card" borderBottom v-if="paymentType === 'Card'" @click="showCards = true">
                                <u-input @click="showCards = true" v-model="paymentCard" disabled
                                    placeholder="Please select card"></u-input>
                                <u-icon slot="right" name="arrow-right"></u-icon>
                            </u-form-item>
                        </u-form>
                        <u-button type="primary" text="Pay" :loading="isLoading" @click="pay"></u-button>
                    </view>
                </u-popup>
                <u-action-sheet @select="typeSelect" :show="showType" :actions="actions" title="Please select payment type"
                    @close="showType = false">
                </u-action-sheet>
                <u-action-sheet @select="cardSelect" :show="showCards" :actions="cards" title="Please select card"
                    @close="showCards = false">
                </u-action-sheet>

            </view>
        </view>
        <view v-else>
            <u-loading-page :loading="isLoading" loadingText="loading...." loading-mode="spinner"></u-loading-page>
        </view>
    </view>
</template>

<script>
import { getOrderDetail } from '../../api/order';
import { getWallet } from '../../api/account';
import { createPayment } from '../../api/payment';

export default {
    data() {
        return {
            orderCode: '',
            isLoading: true,
            order: {},
            showPayment: false,
            paymentType: 'Wallet',
            paymentCard: '',
            paymentForm: {
                cardId: '',
                paymentType: '',
                orderCode: ''
            },
            showType: false,
            showCards: false,
            actions: [
                {
                    name: 'Card',
                    value: '1'
                },
                {
                    name: 'Wallet',
                    value: '2'
                }
            ],
            wallet: {},
            cards: [],
        }
    },
    methods: {
        typeSelect(e) {
            this.paymentType = e.name
            this.paymentForm.paymentType = e.value
            this.showType = false
            console.log(this.paymentForm)
        },
        cardSelect(e) {
            this.paymentCard = e.name
            this.paymentForm.cardId = e.value
            this.showCards = false
            console.log(this.paymentForm)
        },
        async getOrderDetails() {
            await getOrderDetail({
                orderCode: this.orderCode
            }).then(res => {
                console.log(res)
                this.order = res.data.order
                this.isLoading = false
                console.log(this.order)


            }).catch(err => {
                console.log(err)
            })
        },
        onPay() {
            this.showPayment = true
        },
        close() {
            this.showPayment = false
        },
        async getUserWallet() {
            await getWallet().then(res => {
                console.log(res)
                this.wallet = res.data.info
                for (let i = 0; i < this.wallet.cards.length; i++) {
                    this.cards.push({
                        name: this.wallet.cards[i].cardAccount,
                        value: this.wallet.cards[i].id
                    })
                }
                console.log(this.cards)
            }).catch(err => {
                console.log(err)
            })
        },
        async pay() {
            console.log(this.paymentForm)
            await createPayment(this.paymentForm).then(res => {
                console.log(res)
                this.$u.toast('Payment Success')
                this.showPayment = false
                setTimeout(() => {
                    this.$router.push({
                        path: '/pages/profile/order'
                    })
                }, 1000)
            }).catch(err => {
                console.log(err)
            })
        }

    },
    onLoad() {
        this.orderCode = this.$route.query.code
        this.getOrderDetails()
        this.getUserWallet()
        this.paymentForm.orderCode = this.orderCode
        this.paymentForm.paymentType = '2'
    }
}

</script>

<style scoped>
.info-card {
    margin: 20rpx;
    background-color: white;
    border-radius: 20rpx;
    padding: 20rpx;
}

.modal-view {
    padding: 20rpx;
    margin-top: 10rpx;
}
</style>