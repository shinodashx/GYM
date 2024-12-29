<template>
  <view>
    <view>
      <!-- images -->
      <img src="../../static/logo.png" class="logo" />

    </view>
    <view class="container">

      <u-form class="form" labelPosition="left" labelWidth="150rpx" :model="loginForm" ref="uForm">
        <u-form-item prop="loginForm.name" borderBottom>
          <u-input v-model="loginForm.username" border="none" placeholder="Username"></u-input>
        </u-form-item>
        <u-form-item prop="loginForm.password" borderBottom>
          <u-input v-model="loginForm.password" border="none" placeholder="Password" password></u-input>
        </u-form-item>
      </u-form>

      <!-- <view class="registerHint"> Don't have an account? <text class="register" @click="register">Register</text></view> -->
    </view>
    <view class="button">
      <u-button type="primary" size="large" @click="login">Login</u-button>
    </view>
    <view>
      <u-text class="registerHint"> Don't have an account? <u-text class="register" @click="register">Register</u-text></u-text>
      <u-button type="primary" size="large" @click="register">register</u-button>
    </view>

  </view>
</template>

<script>
import { login } from '../../api/account'
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: '',
        confirmPassword: ''
      },
    }
  },
  methods: {
    async login() {
      // /api/v1/account/login
      await login(this.loginForm).then(res => {
        uni.setStorageSync('token', res.data.data.token)
        console.log(uni.getStorageSync('token'))
        uni.showToast({
          title: 'Login successfully',
          icon: 'success',
          duration: 2000
        })
        uni.switchTab({
          url: '/pages/index/index'
        })
      }).catch(err => {
        console.log(err)
      })

    },
    register() {
      // redirect to register page
      uni.navigateTo({
        url: '/pages/register/register'
      })
    }
  },
  onLoad() {
    // console.log('login page')
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.form {
  /* margin-top: 50%; */
  width: 70%;
}

.title {
  font-size: 32rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20rpx;
}

.input {
  margin-bottom: 20rpx;
}

.button {
  margin-top: 10%;
  margin-left: 10%;
  width: 80%;
}

.hints {
  display: flex;
  justify-content: space-between;
  margin-top: 20rpx;
  font-size: 20rpx;
}

.hintForgetP {
  color: #999;
}

.hintReg {
  color: #04498c;
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
