<template>
    <view class="wallet-info" v-if="isLoading === false">
        <u-loading-page loading-mode="spinner"></u-loading-page>

        <view class="wallet">
            <u-text size="45" text="Wallet"></u-text>
            <u-divider></u-divider>
            <u-row>
                <u-text size="35" text="Wallet Balance: "></u-text>
                <u-text align="right" size="35" :text="wallet.wallet.amount"></u-text>
            </u-row>
        </view>
        <view class="cards">
            <u-text size="45" text="Cards"></u-text>
            <u-divider></u-divider>
            <u-row v-for="card in wallet.cards" :key="card.id">
                <u-text size="35" :text="card.cardAccount"></u-text>
                <u-text align="right" size="35" :text="card.amount"></u-text>
                <u-divider></u-divider>
            </u-row>
            <u-divider></u-divider>
            <u-button type="primary" @click="addCard">Add Card</u-button>
        </view>
        <u-popup :show="showAddCard" @close="close">
            <view class="popup">
                <u-form labelPosition="left" labelWidth="200">
                    <u-form-item borderBottom label="Card Account">
                        <u-input v-model="form.card_account" placeholder="Card Account"></u-input>
                    </u-form-item>
                    <u-form-item borderBottom label="Bank" @click="showType = true">
                        <u-button @click="showType = true" v-model="bank_name" disabled placeholder="Please select bank">
                            {{ bank_name }}
                        </u-button>
                        <!-- <u-input border="none" @click="showType = true" v-model="bank_name" disabled placeholder="Please select bank"></u-input> -->
                        <!-- <u-select v-model="form.bank_id" :actions="actions" @select="typeSelect"></u-select> -->
                    </u-form-item>
                    <u-form-item label="Phone">
                        <u-input borderBottom v-model="form.phone" placeholder="Phone"></u-input>
                    </u-form-item>
                    <u-button type="primary" @click="submit">Submit</u-button>
                </u-form>
            </view>
        </u-popup>
        <u-action-sheet :show="showType" :actions="actions" @select="typeSelect" @close="showType = false"></u-action-sheet>

    </view>
</template>

<script>
import { getWallet } from '../../api/account';
import { getBank, bindCard } from '../../api/wallet';
export default {
    data() {
        return {
            wallet: {},
            isLoading: true,
            banks: [],
            showAddCard: false,
            showType: false,
            actions: [

            ],
            form: {
                card_account: '',
                bank_id: '',
                phone: '',
            },
            bank_name: 'Select',
        }
    },
    methods: {
        async getWallet() {
            this.isLoading = true;
            await getWallet().then(res => {
                this.wallet = res.data.info;
                this.isLoading = false;
                console.log(this.wallet);
            }).catch(err => {
                this.isLoading = false;
                console.log(err);
            })
        },
        async getBanks() {
            await getBank().then(res => {
                console.log(res);
                this.banks = res.data.data;
                this.actions = this.banks.map(bank => {
                    return {
                        name: bank.name,
                        value: bank.id
                    }
                })
            }).catch(err => {
                console.log(err);
            })
        },
        addCard() {
            console.log('add card');
            this.showAddCard = true;
        },
        close() {
            console.log('close');
            this.showAddCard = false;
        },
        typeSelect(e) {
            console.log('type select');
            this.showType = false;
            this.bank_name = e.name;
            this.form.bank_id = e.value;
        },
        async submit() {
            console.log('submit');
            console.log(this.form);
            await bindCard(this.form).then(res => {
                console.log(res);
                this.showAddCard = false;
            }).catch(err => {
                console.log(err);
            })
            
        }


    },
    onLoad() {
        this.getWallet();
        this.getBanks();
    }

}
</script>

<style scoped>
.wallet {
    margin: 20rpx;
    background-color: white;
    padding: 20rpx;
    border-radius: 20rpx;
}

.cards {
    margin: 20rpx;
    background-color: white;
    padding: 20rpx;
    border-radius: 20rpx;

}

.popup {
    padding: 20rpx;
    margin: 20rpx;
}
</style>

