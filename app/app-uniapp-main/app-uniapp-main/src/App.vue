<script>
export default {
	onLaunch: function () {
		console.log('App Launch')
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	},
	globalData: 'I am global data',
	data() {
		return {
			value6: 0
		}
	},
	methods: {
		change(e) {
			console.log(e)
			this.value6 = e
		},
		click1() {
			console.log('click1')
		}
	}
}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index.scss";

/* 全局样式 */
html,
body {
	background-color: #f3f3f3;
}
</style>