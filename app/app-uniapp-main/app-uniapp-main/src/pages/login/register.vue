<template>
	<view class="register">

		<view class="content">
			<!-- 头部logo -->
			<view class="header" style="background-color:aliceblue">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体 -->
			<view class="main">
				<wInput v-model="username" type="text" maxlength="20" placeholder="username"></wInput>
				<wInput v-model="phone_number" type="text" maxlength="20" placeholder="phone number"></wInput>
				<wInput v-model="email" type="email" maxlength="20" placeholder="email"></wInput>
				<wInput v-model="password" type="password" maxlength="20" placeholder="password" isShowPass></wInput>
				<wInput v-model="confirmPassword" type="password" maxlength="20" placeholder="confirm password" isShowPass>
				</wInput>


			</view>

			<wButton class="wbutton" text="Register" :rotate="isRotate" @click.native="confirmRegister"></wButton>

			<!-- 底部信息 -->
			<view class="footer">
				<text @tap="isShowAgree" class="cuIcon" :class="showAgree ? 'cuIcon-radiobox' : 'cuIcon-round'">
					confirm</text>
				<!-- 协议地址 -->
				<navigator url="" open-type="navigate">Agreement</navigator>
			</view>
		</view>
	</view>
</template>

<script>
let _this;
import wInput from '../../components/watch-login/watch-input.vue' //input
import wButton from '../../components/watch-login/watch-button.vue' //button
import { register } from '../../api/account';

export default {
	data() {
		return {

			logoImage: '../../static/logo.png',
			phone_number: '',
			email: "",
			username: '',
			password: '',
			confirmPassword: '',
			showAgree: true,
			isRotate: false,
		}
	},
	components: {
		wInput,
		wButton,
	},
	mounted() {
		_this = this;
	},
	methods: {
		async confirmRegister() {
			await register({
				"Username": this.username,
				"Password": this.password,
				"ConfirmPassword": this.confirmPassword,
				"Email": this.email,
				"Gender": "1",
				"Phone": this.phone_number
			}).then(res => {
				console.log(res)
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: 'Successful registration'
				});
				setTimeout(function () {
					uni.navigateBack({
						delta: 1
					});
				}, 1000)
			}).catch(err => {
				console.log(err)
			})
		},

		isShowAgree() {

			_this.showAgree = !_this.showAgree;
		},
		getVerCode() {

			if (_this.phoneData.length != 11) {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: 'username is incorrect'
				});
				return false;
			}
			console.log("Successful registration")
			this.$refs.runCode.$emit('runCode');
			uni.showToast({
				icon: 'none',
				position: 'bottom',
			});

			setTimeout(function () {
				_this.$refs.runCode.$emit('runCode', 0);
				uni.showToast({
					icon: 'none',
					position: 'bottom',
				});
			}, 3000)
		},
		startReg() {
			//注册
			if (this.isRotate) {
				return false;
			}
			if (this.showAgree == false) {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: 'Please agree to the Agreement first.'
				});
				return false;
			}
			if (this.phoneData.length != 11) {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: 'username is incorrect'
				});
				return false;
			}
			if (this.password.length < 6) {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: 'The phone number is incorrect'
				});
				return false;
			}
			console.log("Successful registration")
			_this.isRotate = true
			setTimeout(function () {
				_this.isRotate = false
			}, 3000)
		}
	}
}
</script>

<style>
@import url("../../components/watch-login/css/icon.css");
@import url("./css/main.css");
</style>