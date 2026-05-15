<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import '@/uni.scss';
	
	page {
		background-color: #F5F5F5;
		font-size: 28rpx;
		color: #333333;
		line-height: 1.6;
		-webkit-font-smoothing: antialiased;
		-webkit-overflow-scrolling: touch;
		overscroll-behavior: none;
	}
	
	view, text, image, scroll-view, swiper, swiper-item, button, input, textarea {
		box-sizing: border-box;
		-webkit-tap-highlight-color: transparent;
		tap-highlight-color: transparent;
	}
	
	input, textarea {
		-webkit-appearance: none;
		appearance: none;
		font-size: 16px !important;
	}
	
	/* 安全区域适配 */
	.safe-area-top {
		padding-top: constant(safe-area-inset-top);
		padding-top: env(safe-area-inset-top);
	}
	
	.safe-area-bottom {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	/* 底部固定栏安全区域 */
	.fixed-bottom-safe {
		padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
	}
	
	.container {
		padding: 20rpx;
	}
	
	.primary-color {
		color: #4CAF50;
	}
	
	.warning-color {
		color: #FF9800;
	}
	
	.danger-color {
		color: #F44336;
	}
	
	.info-color {
		color: #2196F3;
	}
	
	.text-muted {
		color: #999999;
	}
	
	.text-center {
		text-align: center;
	}
	
	.text-right {
		text-align: right;
	}
	
	.font-bold {
		font-weight: bold;
	}
	
	.font-size-sm {
		font-size: 24rpx;
	}
	
	.font-size-lg {
		font-size: 32rpx;
	}
	
	.font-size-xl {
		font-size: 36rpx;
	}
	
	.mt-10 {
		margin-top: 10rpx;
	}
	
	.mt-20 {
		margin-top: 20rpx;
	}
	
	.mb-10 {
		margin-bottom: 10rpx;
	}
	
	.mb-20 {
		margin-bottom: 20rpx;
	}
	
	.ml-10 {
		margin-left: 10rpx;
	}
	
	.mr-10 {
		margin-right: 10rpx;
	}
	
	.p-20 {
		padding: 20rpx;
	}
	
	.pt-20 {
		padding-top: 20rpx;
	}
	
	.pb-20 {
		padding-bottom: 20rpx;
	}
	
	.flex {
		display: flex;
	}
	
	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.flex-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.flex-column {
		display: flex;
		flex-direction: column;
	}
	
	.flex-1 {
		flex: 1;
	}
	
	.card {
		background-color: #FFFFFF;
		border-radius: 16rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
	}
	
	.card:active {
		opacity: 0.85;
	}
	
	.btn {
		padding: 16rpx 32rpx;
		border-radius: 8rpx;
		font-size: 28rpx;
		text-align: center;
		transition: all 0.3s;
		min-height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
	}
	
	.btn::after {
		border: none;
	}
	
	.btn:active {
		opacity: 0.8;
		transform: scale(0.97);
	}
	
	.btn-primary {
		background-color: #4CAF50;
		color: #FFFFFF;
	}
	
	.btn-warning {
		background-color: #FF9800;
		color: #FFFFFF;
	}
	
	.btn-danger {
		background-color: #F44336;
		color: #FFFFFF;
	}
	
	.btn-outline {
		background-color: transparent;
		border: 1rpx solid #DDDDDD;
		color: #666666;
	}
	
	.btn-sm {
		padding: 8rpx 16rpx;
		font-size: 24rpx;
		min-height: 56rpx;
	}
	
	.btn-lg {
		padding: 24rpx 48rpx;
		font-size: 32rpx;
		min-height: 96rpx;
	}
	
	.tag {
		display: inline-block;
		padding: 4rpx 12rpx;
		border-radius: 4rpx;
		font-size: 22rpx;
	}
	
	.tag-primary {
		background-color: rgba(76, 175, 80, 0.1);
		color: #4CAF50;
	}
	
	.tag-warning {
		background-color: rgba(255, 152, 0, 0.1);
		color: #FF9800;
	}
	
	.tag-danger {
		background-color: rgba(244, 67, 54, 0.1);
		color: #F44336;
	}
	
	.tag-info {
		background-color: rgba(33, 150, 243, 0.1);
		color: #2196F3;
	}
	
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 100rpx 40rpx;
	}
	
	.empty-icon {
		font-size: 120rpx;
		color: #CCCCCC;
		margin-bottom: 20rpx;
	}
	
	.empty-text {
		color: #999999;
		font-size: 28rpx;
	}
	
	/* 页面过渡动画 */
	.page-enter-active {
		transition: opacity 0.3s, transform 0.3s;
	}
	
	.page-leave-active {
		transition: opacity 0.3s;
	}
	
	.page-enter-from {
		opacity: 0;
		transform: translateX(30rpx);
	}
	
	.page-leave-to {
		opacity: 0;
	}
</style>
