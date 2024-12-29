<template>
    <view class="welcome-main">
        <view class="logo">

            <u-image src="../../static/logo.png" mode="aspectFit" width="100%" height="300"></u-image>
        </view>
        <view class="welcome-text">

            <u-text align="center" size="45" color="black" text='Welcome to Gym-KneeThaiMay'></u-text>
        </view>
        <view class="welcome-actions">
            <u-button @click="login" text="Login"
                color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></u-button>
            <br />
            <u-button @click="register" text="Register"
                color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></u-button>
        </view>
    </view>
</template>

<script>
export default {
    onLoad() {
        uni.setNavigationBarTitle({
            title: '',
            navigationStyle: 'custom',

        })
        if (uni.getStorageSync('token')) {
            uni.switchTab({
                url: '/pages/index/index'
            })
        }
    },
    methods: {
        login() {
            uni.navigateTo({
                url: '/pages/login/login'
            })
        },
        register() {
            uni.navigateTo({
                url: '/pages/register/register'
            })
        }
    }
}
</script>

<style>
.welcome-main {
    /* overflow: hidden; */
    background-color: #f3f3f3;
    /* background-image: url("../../static/background.jpg"); */
    height: 100%;

}

.welcome-text {
    margin-top: 10%;

}

.welcome-actions {
    margin-top: 50%;
    margin-left: 10%;
    margin-right: 10%;
}</style>