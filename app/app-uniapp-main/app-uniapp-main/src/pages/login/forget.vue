<template>
	<view class="forget">
		
		<view class="content">
			<!-- 主体 -->
			<view class="main">
				<view class="tips">if you forget。</view>
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="phonenumber"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="11"
					placeholder="password"
					isShowPass
				></wInput>
				
				<wInput
					v-model="verCode"
					type="number"
					maxlength="4"
					placeholder="verification code"
					
					isShowCode
					codeText="get code"
					setTime="30"
					ref="runCode"
					@setCode="getVerCode()"
				></wInput>
			</view>
			
			<wButton 
				class="wbutton"
				text="重置密码"
				:rotate="isRotate" 
				@click.native="startRePass()"
			></wButton>

		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	export default {
		data() {
			return {
				phoneData: "",
				passData: "", //
				verCode:"", //
				isRotate: false, //
			}
		},
		components:{
			wInput,
			wButton
		},
		mounted() {
			_this= this;
		},
		methods: {
			getVerCode(){
				//获取验证码
				if (_this.phoneData.length != 11) {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: 'phone number is not correct'
				    });
				    return false;
				}
				console.log("getVerCode")
				this.$refs.runCode.$emit('runCode'); //
				uni.showToast({
				    icon: 'none',
					position: 'bottom',
				    title: 'get code'
				});
				
				setTimeout(function(){
					_this.$refs.runCode.$emit('runCode',0);
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: 'code is 1234'
					});
				},3000)
			},
			startRePass() {
				if(this.isRotate){
					return false;
				}
				if (this.phoneData.length != 11) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: 'phone number is not correct'
				    });
				    return false;
				}
			    if (this.passData.length < 6) {
			        uni.showToast({
			            icon: 'none',
						position: 'bottom',
			            title: 'password is not correct'
			        });
			        return false;
			    }
				if (this.verCode.length != 4) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: 'code is not correct'
				    });
				    return false;
				}
				console.log("startRePass")
				_this.isRotate=true
				setTimeout(function(){
					_this.isRotate=false
				},3000)
				
				
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>

