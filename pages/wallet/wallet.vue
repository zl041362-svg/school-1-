<template>
	<view class="page">
		<view class="wallet-card card">
			<view class="balance-section">
				<text class="balance-label">账户余额</text>
				<text class="balance-value">¥{{ walletInfo.balance.toFixed(2) }}</text>
			</view>
			<view class="action-buttons">
				<button class="action-btn btn btn-primary" @click="handleWithdraw">提现</button>
				<button class="action-btn btn btn-outline" @click="handleRecharge">充值</button>
			</view>
		</view>
		
		<view class="transaction-section card">
			<view class="section-title">交易记录</view>
			<view class="transaction-list">
				<view class="transaction-item" v-for="item in transactionList" :key="item.id">
					<view class="transaction-left">
						<view class="transaction-title">{{ item.title }}</view>
						<view class="transaction-time">{{ formatTime(item.time) }}</view>
					</view>
					<view class="transaction-right">
						<text class="transaction-amount" :class="item.type === 'income' ? 'income' : 'expense'">
							{{ item.type === 'income' ? '+' : '-' }}¥{{ item.amount.toFixed(2) }}
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mockUserInfo } from '@/mock/index.js'
import common from '@/utils/common.js'

export default {
	data() {
		return {
			walletInfo: {
				balance: 158.50
			},
			transactionList: [
				{
					id: 1,
					title: '出售商品收入',
					amount: 3200.00,
					type: 'income',
					time: Date.now() - 86400000 * 5
				},
				{
					id: 2,
					title: '购买商品支出',
					amount: 5800.00,
					type: 'expense',
					time: Date.now() - 86400000 * 3
				},
				{
					id: 3,
					title: '出售商品收入',
					amount: 25.00,
					type: 'income',
					time: Date.now() - 86400000
				}
			]
		}
	},
	onLoad() {
		this.walletInfo.balance = mockUserInfo.balance
	},
	methods: {
		handleWithdraw() {
			uni.showToast({
				title: '功能开发中',
				icon: 'none'
			})
		},
		handleRecharge() {
			uni.showToast({
				title: '功能开发中',
				icon: 'none'
			})
		},
		formatTime(timestamp) {
			return common.formatDate(timestamp, 'YYYY-MM-DD HH:mm')
		}
	}
}
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background-color: #F5F5F5;
	padding: 20rpx;
}

.wallet-card {
	background: linear-gradient(135deg, #4CAF50 0%, #81C784 100%);
	margin-bottom: 20rpx;
	
	.balance-section {
		text-align: center;
		padding: 60rpx 0 40rpx;
		
		.balance-label {
			display: block;
			font-size: 28rpx;
			color: rgba(255, 255, 255, 0.8);
			margin-bottom: 20rpx;
		}
		
		.balance-value {
			display: block;
			font-size: 64rpx;
			color: #FFFFFF;
			font-weight: bold;
		}
	}
	
	.action-buttons {
		display: flex;
		padding: 0 40rpx 40rpx;
		
		.action-btn {
			flex: 1;
			margin: 0 10rpx;
			border-radius: 40rpx;
			
			&.btn-primary {
				background-color: #FFFFFF;
				color: #4CAF50;
			}
			
			&.btn-outline {
				background-color: rgba(255, 255, 255, 0.2);
				color: #FFFFFF;
				border-color: #FFFFFF;
			}
		}
	}
}

.transaction-section {
	.section-title {
		font-size: 28rpx;
		color: #333333;
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	
	.transaction-list {
		.transaction-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 0;
			border-bottom: 1rpx solid #EEEEEE;
			
			&:last-child {
				border-bottom: none;
			}
			
			.transaction-left {
				flex: 1;
				
				.transaction-title {
					font-size: 28rpx;
					color: #333333;
					margin-bottom: 8rpx;
				}
				
				.transaction-time {
					font-size: 24rpx;
					color: #999999;
				}
			}
			
			.transaction-right {
				.transaction-amount {
					font-size: 32rpx;
					font-weight: bold;
					
					&.income {
						color: #4CAF50;
					}
					
					&.expense {
						color: #FF5722;
					}
				}
			}
		}
	}
}
</style>
