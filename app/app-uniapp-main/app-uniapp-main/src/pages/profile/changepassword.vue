<template>
  <view class="login">
    <view class="content">
      <view class="main">
        <wInput
            v-model="changeForm.oldPassword"
            type="password"
            maxlength="20"
            placeholder="old password"
            :focus="isFocus"
            isShowPass
        ></wInput>
        <wInput
            v-model="changeForm.newPassword"
            type="password"
            maxlength="20"
            placeholder="new password"
            isShowPass
        ></wInput>
        <wInput
            v-model="changeForm.confirmPassword"
            type="password"
            maxlength="20"
            placeholder="confirm password"
            isShowPass
        ></wInput>
      </view>
      <wButton
          class="wbutton"
          text="change"
          :rotate="isRotate"
          @click="handleEdit"
      ></wButton>
      <view class="footer">
        <navigator url="forget" open-type="navigate">forget password</navigator>
        <text>|</text>
      </view>
    </view>
  </view>
</template>

<script>
let _this;
import wInput from '../../components/watch-login/watch-input.vue' //input
import wButton from '../../components/watch-login/watch-button.vue' //button
import {getProfile, login, updateProfile,changePassword} from '../../api/account'

export default {
  data() {
    return {
      logoImage: '../../static/logo.png',
      phoneData: '',
      passData: '',
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
      changeForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      confirmPassword: '',
      user: {},
      isLoading: true,
      editing: false,
    };
  },
  components: {
    wInput,
    wButton,
  },
  mounted() {
    _this = this;
    //this.isLogin();
  },
  methods: {
    async getUserProfile() {
      await getProfile().then(res => {
        this.user = res.data.data
        console.log(this.user)
        this.user.avatar = 'http://101.42.160.53:16800/' + this.user.avatar
        this.isLoading = false
      }).catch(err => {
        console.log(err)
      })
    },
    async handleEdit() {
        // save
        // change password
        if (this.changeForm.newPassword !== this.changeForm.confirmPassword) {
          uni.showToast({
            icon: 'none',
            position: 'bottom',
            title: 'Two passwords are inconsistent'
          });
          return;
        } else{
          await changePassword(this.changeForm).then(res => {
            console.log(res)
            
            uni.showToast({
              icon: 'none',
              position: 'bottom',
              title: 'Change password successfully'
            });
            setTimeout(function () {
              uni.switchTab({
                url: '/pages/profile/profile'
              })
            }, 1000)
          }).catch(err => {
            console.log(err)
          })
        }

    },
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
    },
    isLogin() {
    },
    startLogin(e) {
      console.log(e)
      if (this.isRotate) {
        return false;
      }
      if (this.phoneData.length == "") {
        uni.showToast({
          icon: 'none',
          position: 'bottom',
          title: 'username'
        });
        return;
      }
      if (this.passData.length < 5) {
        uni.showToast({
          icon: 'none',
          position: 'bottom',
          title: 'input password'
        });
        return;
      }

      console.log('start login')

      _this.isRotate = true
      setTimeout(function () {
        _this.isRotate = false
      }, 3000)
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
  },
  onLoad() {
    this.getUserProfile()
  },
}
</script>

<style>
@import url("../../components/watch-login/css/icon.css");
@import url('./css/main.css');
</style>
