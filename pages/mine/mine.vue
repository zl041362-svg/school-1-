<template>
	<view class="page">
		<view class="user-header">
			<image class="avatar" :src="userInfo.avatar" mode="aspectFill" @click="goToProfile"></image>
			<view class="user-info">
				<view class="nickname">{{ userInfo.nickname }}</view>
				<view class="phone">{{ userInfo.phone }}</view>
			</view>
			<view class="credit-section">
				<text class="credit-label">信誉等级</text>
				<uni-rate :value="userInfo.credit" readonly size="16"></uni-rate>
			</view>
		</view>
		
		<view class="stats-section">
			<view class="stat-item" @click="goToTrade">
				<text class="stat-value">{{ userInfo.soldCount }}</text>
				<text class="stat-label">已售</text>
			</view>
			<view class="stat-item" @click="goToTrade">
				<text class="stat-value">{{ userInfo.boughtCount }}</text>
				<text class="stat-label">已购</text>
			</view>
			<view class="stat-item" @click="goToWallet">
				<text class="stat-value">¥{{ userInfo.balance.toFixed(2) }}</text>
				<text class="stat-label">余额</text>
			</view>
		</view>
		
		<view class="menu-section">
			<view class="menu-item" @click="goToMyPublish">
				<uni-icons type="compose" size="24" color="#4CAF50"></uni-icons>
				<text class="menu-text">我发布的</text>
				<uni-icons type="right" size="16" color="#CCCCCC"></uni-icons>
			</view>
			<view class="menu-item" @click="goToCart">
				<uni-icons type="cart" size="24" color="#4CAF50"></uni-icons>
				<text class="menu-text">我的购物车</text>
				<uni-icons type="right" size="16" color="#CCCCCC"></uni-icons>
			</view>
			<view class="menu-item" @click="goToFavorite">
				<uni-icons type="heart" size="24" color="#FF5722"></uni-icons>
				<text class="menu-text">我的收藏</text>
				<uni-icons type="right" size="16" color="#CCCCCC"></uni-icons>
			</view>
			<view class="menu-item" @click="goToAddress">
				<uni-icons type="location" size="24" color="#FF9800"></uni-icons>
				<text class="menu-text">地址管理</text>
				<uni-icons type="right" size="16" color="#CCCCCC"></uni-icons>
			</view>
			<view class="menu-item" @click="goToWallet">
				<uni-icons type="wallet" size="24" color="#9C27B0"></uni-icons>
				<text class="menu-text">钱包管理</text>
				<uni-icons type="right" size="16" color="#CCCCCC"></uni-icons>
			</view>
			<view class="menu-item" @click="goToMessage">
				<uni-icons type="chatbubble" size="24" color="#00BCD4"></uni-icons>
				<text class="menu-text">消息通知</text>
				<uni-badge text="3" absolute="true" :offset="[10, 0]" size="small"></uni-badge>
				<uni-icons type="right" size="16" color="#CCCCCC"></uni-icons>
			</view>
			<view class="menu-item" @click="goToSetting">
				<uni-icons type="gear" size="24" color="#607D8B"></uni-icons>
				<text class="menu-text">设置中心</text>
				<uni-icons type="right" size="16" color="#CCCCCC"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
import { mockUserInfo } from '@/mock/index.js'

export default {
	data() {
		return {
			userInfo: {}
		}
	},
	onLoad() {
		this.loadUserInfo()
	},
	onShow() {
		this.loadUserInfo()
	},
	methods: {
		loadUserInfo() {
			this.userInfo = mockUserInfo
		},
		goToProfile() {
			uni.navigateTo({
				url: '/pages/profile/profile'
			})
		},
		goToTrade() {
			uni.switchTab({
				url: '/pages/trade/trade'
			})
		},
		goToMyPublish() {
			uni.navigateTo({
				url: '/pages/mypublish/mypublish'
			})
		},
		goToCart() {
			uni.navigateTo({
				url: '/pages/cart/cart'
			})
		},
		goToFavorite() {
			uni.navigateTo({
				url: '/pages/favorite/favorite'
			})
		},
		goToAddress() {
			uni.navigateTo({
				url: '/pages/address/address'
			})
		},
		goToWallet() {
			uni.navigateTo({
				url: '/pages/wallet/wallet'
			})
		},
		goToMessage() {
			uni.navigateTo({
				url: '/pages/message/message'
			})
		},
		goToSetting() {
			uni.navigateTo({
				url: '/pages/setting/setting'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background-color: #F5F5F5;
}

.user-header {
	display: flex;
	align-items: center;
	background: linear-gradient(135deg, #4CAF50 0%, #81C784 100%);
	padding: 60rpx 30rpx 40rpx;
	
	.avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		border: 4rpx solid #FFFFFF;
		margin-right: 30rpx;
		background-color: #F5F5F5;
	}
	
	.user-info {
		flex: 1;
		
		.nickname {
			font-size: 36rpx;
			color: #FFFFFF;
			font-weight: bold;
			margin-bottom: 10rpx;
		}
		
		.phone {
			font-size: 26rpx;
			color: rgba(255, 255, 255, 0.8);
		}
	}
	
	.credit-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.credit-label {
			font-size: 22rpx;
			color: rgba(255, 255, 255, 0.8);
			margin-bottom: 8rpx;
		}
	}
}

.stats-section {
	display: flex;
	background-color: #FFFFFF;
	padding: 40rpx 0;
	margin-bottom: 20rpx;
	
	.stat-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.stat-value {
			font-size: 36rpx;
			color: #333333;
			font-weight: bold;
			margin-bottom: 10rpx;
		}
		
		.stat-label {
			font-size: 24rpx;
			color: #999999;
		}
	}
}

.menu-section {
	background-color: #FFFFFF;
	padding: 0 20rpx;
	
	.menu-item {
		display: flex;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #EEEEEE;
		
		&:last-child {
			border-bottom: none;
		}
		
		.menu-text {
			flex: 1;
			font-size: 28rpx;
			color: #333333;
			margin-left: 20rpx;
		}
	}
}
</style>
