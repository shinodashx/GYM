<template xlang="wxml" minapp="mpvue">
	<view class="tki-qrcode">
		<!-- #ifndef MP-ALIPAY -->
		<canvas class="tki-qrcode-canvas" :canvas-id="cid" :style="{width:cpSize+'px',height:cpSize+'px'}" />
		<!-- #endif -->
		<!-- #ifdef MP-ALIPAY -->
		<canvas :id="cid" :width="cpSize" :height="cpSize" class="tki-qrcode-canvas" />
		<!-- #endif -->
		<image v-show="show" :src="result" :style="{width:cpSize+'px',height:cpSize+'px'}" />
	</view>
</template>

<script>
import QRCode from "./qrcode.js"
let qrcode
export default {
	name: "tki-qrcode",
	props: {
		cid: {
			type: String,
			default: 'tki-qrcode-canvas'
		},
		size: {
			type: Number,
			default: 200
		},
		unit: {
			type: String,
			default: 'upx'
		},
		show: {
			type: Boolean,
			default: true
		},
		val: {
			type: String,
			default: ''
		},
		background: {
			type: String,
			default: '#ffffff'
		},
		foreground: {
			type: String,
			default: '#000000'
		},
		pdground: {
			type: String,
			default: '#000000'
		},
		icon: {
			type: String,
			default: ''
		},
		iconSize: {
			type: Number,
			default: 40
		},
		lv: {
			type: Number,
			default: 3
		},
		onval: {
			type: Boolean,
			default: false
		},
		loadMake: {
			type: Boolean,
			default: false
		},
		usingComponents: {
			type: Boolean,
			default: true
		},
		showLoading: {
			type: Boolean,
			default: true
		},
		loadingText: {
			type: String,
			default: 'in queue'
		},
	},
	data() {
		return {
			result: '',
		}
	},
	methods: {
		_makeCode() {
			let that = this
			if (!this._empty(this.val)) {
				qrcode = new QRCode({
					context: that,
					canvasId:that.cid, // canvas-id
					usingComponents: that.usingComponents,
					showLoading: that.showLoading,
					loadingText: that.loadingText, // loading
					text: that.val,
					size: that.cpSize,
					background: that.background,
					foreground: that.foreground,
					pdground: that.pdground,
					correctLevel: that.lv,
					image: that.icon,
					imageSize: that.iconSize,
					cbResult: function (res) {
						that._result(res)
					},
				});
			} else {
				uni.showToast({
					title: '',
					icon: 'none',
					duration: 2000
				});
			}
		},
		_clearCode() {
			this._result('')
			qrcode.clear()
		},
		_saveCode() {
			let that = this;
			if (this.result != "") {
				uni.saveImageToPhotosAlbum({
					filePath: that.result,
					success: function () {
						uni.showToast({
							title: 'success',
							icon: 'success',
							duration: 2000
						});
					}
				});
			}
		},
		_result(res) {
			this.result = res;
			this.$emit('result', res)
		},
		_empty(v) {
			let tp = typeof v,
				rt = false;
			if (tp == "number" && String(v) == "") {
				rt = true
			} else if (tp == "undefined") {
				rt = true
			} else if (tp == "object") {
				if (JSON.stringify(v) == "{}" || JSON.stringify(v) == "[]" || v == null) rt = true
			} else if (tp == "string") {
				if (v == "" || v == "undefined" || v == "null" || v == "{}" || v == "[]") rt = true
			} else if (tp == "function") {
				rt = false
			}
			return rt
		}
	},
	watch: {
		size: function (n, o) {
			if (n != o && !this._empty(n)) {
				this.cSize = n
				if (!this._empty(this.val)) {
					setTimeout(() => {
						this._makeCode()
					}, 100);
				}
			}
		},
		val: function (n, o) {
			if (this.onval) {
				if (n != o && !this._empty(n)) {
					setTimeout(() => {
						this._makeCode()
					}, 0);
				}
			}
		}
	},
	computed: {
		cpSize() {
			if(this.unit == "upx"){
				return uni.upx2px(this.size)
			}else{
				return this.size
			}
		}
	},
	mounted: function () {
		if (this.loadMake) {
			if (!this._empty(this.val)) {
				setTimeout(() => {
					this._makeCode()
				}, 0);
			}
		}
	},
}
</script>
<style>
.tki-qrcode {
  position: relative;
}
.tki-qrcode-canvas {
  position: fixed;
  top: -99999upx;
  left: -99999upx;
  z-index: -99999;
}
</style>
