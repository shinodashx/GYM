<template>
  <view class="login">
    <view class="content">
      <!-- 头部logo -->
      <view class="header" style="background-color:aliceblue" >
        <image :src="logoImage"></image>
      </view>
      <!-- 主体表单 -->
      <view class="main">
        <wInput
            v-model="loginForm.username"
            type="text"
            maxlength="11"
            placeholder="username/phonenum"
            :focus="isFocus"
        ></wInput>
        <wInput
            v-model="loginForm.password"
            type="password"
            maxlength="11"
            placeholder="password"
        ></wInput>
      </view>
      <wButton
          class="wbutton"
          text="LOGIN"
          :rotate="isRotate"
          @click="login"
      ></wButton>

 

      <!-- 底部信息 -->
      <view class="footer">
        <navigator url="forget" open-type="navigate"></navigator>
        <text>|</text>
        <navigator url="register" open-type="navigate">register</navigator>
      </view>
    </view>
  </view>
</template>

<script>
let _this;
import wInput from '../../components/watch-login/watch-input.vue' //input
import wButton from '../../components/watch-login/watch-button.vue' //button
import { login } from '../../api/account'
export default {
  data() {
    return {
      logoImage: '../../static/logo.png',
      phoneData:'',
      passData:'',
      isRotate: false,
      isFocus: true,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: '',
        confirmPassword: ''
      },
    };
  },
  components:{
    wInput,
    wButton,
  },
  mounted() {
    _this= this;
    //this.isLogin();
  },
  methods: {
    async login() {
      // /api/v1/account/login
      await login(this.loginForm).then(res => {
        // this.loginForm.username = this.phoneData
        // this.loginForm.password = this.passData

        uni.setStorageSync('token', res.data.data.token)
        console.log(uni.getStorageSync('token'))
        uni.showToast({
          title: 'Login successfully',
          icon: 'success',
          duration: 2000
        })
        uni.switchTab({
          url: '/pages/profile/profile'
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
    },
    isLogin(){
    },
    startLogin(e){
      console.log(e)
      if(this.isRotate){
        return false;
      }
      if (this.phoneData.length == "") {
        uni.showToast({
          icon: 'none',
          position: 'bottom',
          title: 'username/phonenum is not correct'
        });
        return;
      }
      if (this.passData.length < 5) {
        uni.showToast({
          icon: 'none',
          position: 'bottom',
          title: 'password is not correct'
        });
        return;
      }

      console.log("login")

      _this.isRotate=true
      setTimeout(function(){
        _this.isRotate=false
      },3000)

    },
    login_weixin() {

      uni.showToast({
        icon: 'none',
        position: 'bottom',
        title: '...'
      });
    },
    login_weibo() {

      uni.showToast({
        icon: 'none',
        position: 'bottom',
        title: '...'
      });
    },
    login_github() {

      uni.showToast({
        icon: 'none',
        position: 'bottom',
        title: '...'
      });
    }
  }
}
</script>

<style>
@import url("../../components/watch-login/css/icon.css");
@import url('./css/main.css');
</style>