<template>
	<view class="main-list oBorder">

		<input 
			class="main-input" 
			:value="value" 
			:type="_type"
			:focus="_focus"
			:maxlength="maxlength" 
			:placeholder="placeholder" 
			:password="type==='password'&&!showPassword" 
			
			@input="$emit('input', $event.detail.value)"
			@blur="$emit('blur', $event)"
			@focus="$emit('focus', $event)"
			@longpress="$emit('longpress', $event)"
			@confirm="$emit('confirm', $event)"
			@click="$emit('click', $event)"
			@longtap="$emit('longtap', $event)"
			@touchcancel="$emit('touchcancel', $event)"
			@touchend="$emit('touchend', $event)"
			@touchmove="$emit('touchmove', $event)"
			@touchstart="$emit('touchstart', $event)"
		/>
		<image 
			v-if="_isShowPass&&type==='password'&&!_isShowCode"
			class="img cuIcon" 
			:class="showPassword?'cuIcon-attention':'cuIcon-attentionforbid'" 
			@tap="showPass"
		></image>
		<view 
			v-if="_isShowCode&&!_isShowPass"
			:class="['vercode',{'vercode-run': second>0}]" 
			@click="setCode"
		>{{ getVerCodeSecond }}</view>
		
	</view>
</template>

<script>
	let _this, countDown;
	export default{
		data(){
			return{
				showPassword: false,
				second: 0,
				isRunCode: false,
			}
		},
		props:{
			type: String,
			value: String,
			placeholder: String,
			maxlength: {

				type: [Number,String],
				default: 20,
			},
			isShowPass:{
				type: [Boolean,String],
				default: false,
			},
			isShowCode:{
				type: [Boolean,String],
				default: false,
			},
			codeText:{
				type: String,
				default: "获取验证码",
			},
			setTime:{
				type: [Number,String],
				default: 60,
			},
			focus:{
				type: [Boolean,String],  
				default: false  
			}  
		},
		model: {
			prop: 'value',
			event: 'input'
		},
		mounted() {
			_this=this
			this.$on('runCode',(val)=>{
                this.runCode(val);
            });
			clearInterval(countDown);
		},
		methods:{
			showPass(){
				this.showPassword = !this.showPassword
			},
			setCode(){
				if(this.isRunCode){
					return false;
				}
				this.$emit('setCode')
			},
			runCode(val){
				if(String(val)=="0"){

					this.second = 0;
					clearInterval(countDown);
					this.isRunCode= false;
					return false;
				}
				if(this.isRunCode){
					return false;
				}
				this.isRunCode= true
				this.second = this._setTime
				
				let _this=this;
				countDown = setInterval(function(){
					_this.second--
					if(_this.second==0){
						_this.isRunCode= false
						clearInterval(countDown)
					}
				},1000)
			}
		},
		computed:{
			_type(){

				const type = this.type
				return type == 'password' ? 'text' : type
			},
			_isShowPass() {

				return String(this.isShowPass) !== 'false'
			},
			_isShowCode() {

				return String(this.isShowCode) !== 'false'
			},
			_setTime() {
				const setTime = Number(this.setTime)
				return setTime>0 ? setTime : 60
			},
			_focus() {  
				//
				return String(this.focus) !== 'false'  
			},  
			getVerCodeSecond(){
				//
				if(this.second<=0){
					return this.codeText;
				}else{
					if(this.second<10){
						return '0'+this.second;
					}else{
						return this.second;
					}
				}
				
			}
		}
	}
</script>

<style>
	@import url("./css/icon.css");
	
	.main-list{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		color: #333333;
		padding: 40rpx 32rpx;
		margin:32rpx 0;
	}
	.img{
		width: 32rpx;
		height: 32rpx;
		font-size: 32rpx;
	}
	.main-input{
		flex: 1;
		text-align: left;
		font-size: 28rpx;
		/* line-height: 100rpx; */
		padding-right: 10rpx;
		margin-left: 20rpx;
	}
	.vercode {
		color: rgba(0,0,0,0.7);
		font-size: 24rpx;
		/* line-height: 100rpx; */
	}
	.vercode-run {
		color: rgba(0,0,0,0.4) !important;
	}
	.oBorder{
	    border: none;
	    border-radius: 2.5rem ;
	    -webkit-box-shadow: 0 0 60rpx 0 rgba(43,86,112,.1) ;
	    box-shadow: 0 0 60rpx 0 rgba(43,86,112,.1) ;
	}
</style>
