<template>
  <view class="login">
    <view class="content">
      <!-- 头部logo -->
      <!-- 主体表单 -->
      <view class="main">
        <wInput
            v-model="email"
            type="text"
            maxlength="20"
            placeholder="email"
            :focus="isFocus"
        ></wInput>
      </view>
      <wButton
          class="wbutton"
          text="change"
          :rotate="isRotate"
          @click="handleEdit"
      ></wButton>
      <!-- 底部信息 -->
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
import {getProfile, login, updateProfile} from '../../api/account'

export default {
  data() {
    return {
      //logo图片 base64
      logoImage: '../../static/logo.png',
      phoneData: '', //用户/电话
      passData: '', //密码
      isRotate: false, //是否加载旋转
      isFocus: true, // 是否聚焦
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
        userName: '',
        oldPassword: '',
      },
      user: {},
      isLoading: true,
      editing: false,
      email: '',
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
      if (this.editing) {
        // save
        console.log('save')
        await updateProfile(
            {
              gender: this.user.gender,
              phone: this.user.phone,
              email: this.email
            }
        ).then(res => {
          this.getUserProfile()
          // toast
          uni.showToast({
            title: 'Update success',
            icon: 'success',
            duration: 2000
          })
        }).catch(err => {
          console.log(err)
        })
        // go to profile page
        uni.switchTab({
          url: '/pages/profile/profile'
        })
      } else {
        // edit
        console.log('edit')
      }
      this.editing = !this.editing
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
      //登录
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (this.phoneData.length == "") {
        uni.showToast({
          icon: 'none',
          position: 'bottom',
          title: '用户名不能为空'
        });
        return;
      }
      if (this.passData.length < 5) {
        uni.showToast({
          icon: 'none',
          position: 'bottom',
          title: '密码不正确'
        });
        return;
      }

      console.log("登录成功")

      _this.isRotate = true
      setTimeout(function () {
        _this.isRotate = false
      }, 3000)
    },
    login_weixin() {
      //微信登录
      uni.showToast({
        icon: 'none',
        position: 'bottom',
        title: '...'
      });
    },
    login_weibo() {
      //微博登录
      uni.showToast({
        icon: 'none',
        position: 'bottom',
        title: '...'
      });
    },
    login_github() {
      //github登录
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


<!--<script>-->
<!--import { login } from '../../api/account'-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      loginForm: {-->
<!--        username: '',-->
<!--        password: ''-->
<!--      },-->
<!--      registerForm: {-->
<!--        username: '',-->
<!--        password: '',-->
<!--        confirmPassword: ''-->
<!--      },-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    async login() {-->
<!--      // /api/v1/account/login-->
<!--      await login(this.loginForm).then(res => {-->
<!--        uni.setStorageSync('token', res.data.data.token)-->
<!--        console.log(uni.getStorageSync('token'))-->
<!--        uni.showToast({-->
<!--          title: 'Login successfully',-->
<!--          icon: 'success',-->
<!--          duration: 2000-->
<!--        })-->
<!--        uni.switchTab({-->
<!--          url: '/pages/index/index'-->
<!--        })-->
<!--      }).catch(err => {-->
<!--        console.log(err)-->
<!--      })-->

<!--    },-->
<!--    register() {-->
<!--      // redirect to register page-->
<!--      uni.navigateTo({-->
<!--        url: '/pages/register/register'-->
<!--      })-->
<!--    }-->
<!--  },-->
<!--  onLoad() {-->
<!--    // console.log('login page')-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--.container {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  height: 100%;-->
<!--}-->

<!--.form {-->
<!--  /* margin-top: 50%; */-->
<!--  width: 70%;-->
<!--}-->

<!--.title {-->
<!--  font-size: 32rpx;-->
<!--  font-weight: bold;-->
<!--  text-align: center;-->
<!--  margin-bottom: 20rpx;-->
<!--}-->

<!--.input {-->
<!--  margin-bottom: 20rpx;-->
<!--}-->

<!--.button {-->
<!--  margin-top: 10%;-->
<!--  margin-left: 10%;-->
<!--  width: 80%;-->
<!--}-->

<!--.hints {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  margin-top: 20rpx;-->
<!--  font-size: 20rpx;-->
<!--}-->

<!--.hintForgetP {-->
<!--  color: #999;-->
<!--}-->

<!--.hintReg {-->
<!--  color: #04498c;-->
<!--}-->

<!--.logo {-->
<!--  width: 40%;-->
<!--  height: 40%;-->
<!--  margin: auto;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  display: flex;-->
<!--  margin-bottom: 10%;-->
<!--  margin-top: 10%;-->
<!--}-->
<!--</style>-->
