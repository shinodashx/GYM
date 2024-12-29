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
      <u-divider></u-divider>
      <u-button type="primary" @click="topUp">Top-up</u-button>
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
    <view>
      <u-popup :show="showPayment" :round="10" mode="bottom" @close="close" class="item">
        <view class="modal-view">
          <u-form label-position="left" label-width="200">
            <u-form-item label="amount" borderBottom>
              <u-input v-model="amount" placeholder="Please select payment type"></u-input>
              <u-icon slot="right" name="arrow-right"></u-icon>
            </u-form-item>
          </u-form>
          <u-button type="primary" text="Pay" :loading="isLoading" @click="topUpPay"></u-button>
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
</template>

<script>
import { getWallet } from '../../api/account';
import { getBank, bindCard, topUp, withDraw } from '../../api/wallet';
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
      orderCode: '',
      order: {},
      showPayment: false,
      paymentType: 'Wallet',
      paymentCard: '',
      paymentForm: {
        cardId: '',
        paymentType: '',
        orderCode: ''
      },
      showCards: false,
      cards: [],
      amount: 0,
    }
  },
  methods: {
    async getWallet() {
      this.isLoading = true;
      await getWallet().then(res => {
        console.log(res)
        this.wallet = res.data.info
        for (let i = 0; i < this.wallet.cards.length; i++) {
          this.cards.push({
            name: this.wallet.cards[i].cardAccount,
            value: this.wallet.cards[i].id
          })
        }
        this.isLoading = false;
        console.log(this.cards)
      }).catch(err => {
        console.log(err)
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
    async confirmTopUp() {

    },
    async ConfirmWithDraw() {

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

    },
    topUp() {
      this.showCards = true;
    },
    closeTopUp() {
      this.showCards = false;
    },
    cardSelect(e) {
      console.log(e);
      this.paymentCard = e.name;
      this.paymentForm.cardId = e.value;
      this.showCards = false;
      this.showPayment = true;
    },
    async topUpPay() {
      await topUp({
        "amount": this.amount,
        "cardId": this.paymentForm.cardId,
      }).then(res => {
        this.$u.toast('Top up successfully');
        this.showPayment = false;
        this.getWallet();
      }).catch(err => {
        console.log(err);
      })
      
    },
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

