<template>
  <view>
    <view>
      <!-- images -->
      <img src="../../static/logo.png" class="logo" />

    </view>
    <u-form class="form" labelPosition="left" labelWidth="150rpx" :model="model1" :rules="rules" ref="uForm">
      <u-form-item prop="userInfo.name" borderBottom ref="item1" >
        <u-input v-model="model1.userInfo.name" border="none" placeholder="Username"></u-input>
      </u-form-item>
      <u-form-item prop="userInfo.password" borderBottom ref="item1">
        <u-input v-model="model1.userInfo.password" border="none" placeholder="Password" password></u-input>
      </u-form-item>
      <u-form-item prop="userInfo.confirmPassword" borderBottom ref="item1">
        <u-input v-model="model1.userInfo.confirmPassword" border="none" placeholder="Confirm password" password></u-input>
      </u-form-item>
      <u-form-item prop="userInfo.phone" borderBottom ref="item1">
        <u-input v-model="model1.userInfo.phone" border="none" placeholder="Phone"></u-input>
      </u-form-item>
      <u-form-item prop="userInfo.email" borderBottom ref="item1">
        <u-input v-model="model1.userInfo.email" border="none" placeholder="Email"></u-input>
      </u-form-item>
      <u-form-item prop="userInfo.sex" borderBottom @click="showSex = true; hideKeyboard()" ref="item1">
        <u-input v-model="model1.userInfo.sex" disabled placeholder="Please select sex"
          border="none"></u-input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>
    </u-form>
    <view class="button">
      <u-button type="primary" size="large" @click="confirmRegister">Register</u-button>
    </view>
    <u-action-sheet :show="showSex" :actions="actions" title="Please select sex" @close="showSex = false"
      @select="sexSelect">
    </u-action-sheet>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showSex: false,
      model1: {
        userInfo: {
          name: '',
          password: '',
          confirmPassword: '',
          sex: '',
          email: '',
          phone: '',
        },
      },
      actions: [
      {
        name: 'Male',
        value: '1'
      },
      {
        name: 'Female',
        value: '2'
      },
      {
        name: 'Secret',
        value: '3'
      },
      ],
      rules: {
        'userInfo.name': {
          type: 'string',
          required: true,
          message: 'Please input your name',
          trigger: ['blur', 'change']
        },

        'userInfo.sex': {
          type: 'string',
          required: true,
          message: 'Please select sex',
          trigger: ['blur', 'change']
        },
        'userInfo.password': {
          type: 'string',
          required: true,
          min: 6,
          max: 20,
          message: 'Please input your password',
          trigger: ['blur', 'change']
        },
        'userInfo.confirmPassword': {
          type: 'string',
          required: true,
          min: 6,
          max: 20,

          message: 'Please input your password again',
          trigger: ['blur', 'change']
        },


        

      },
      radio: '',
      switchVal: false
    };
  },
  methods: {
    sexSelect(e) {
      this.model1.userInfo.sex = e.name
      this.$refs.uForm.validateField('userInfo.sex')
    },
    confirmRegister() {
      console.log(this.model1)
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          this.$u.toast('Register success')
        } else {
          this.$u.toast('Register failed')
        }
      })
    },
  },
  onReady() {
    //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    this.$refs.uForm.setRules(this.rules)
  }
};
</script>

<style>
.form {
  margin-left: 10%;
  width: 80%;
}
.button {
  margin-top: 10%;
  margin-left: 10%;
  width: 80%;
}
.logo {
  width: 40%;
  height: 40%;
  margin: auto;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 10%;
  margin-top: 10%;
}
</style>