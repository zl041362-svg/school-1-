<template>
	<view class="page">
		<uni-segmented-control
			:current="currentTab"
			:values="tabs"
			@clickItem="handleTabChange"
			style-type="text"
			active-color="#4CAF50"
		></uni-segmented-control>
		
		<view class="filter-tabs" v-if="currentTab === 0">
			<view 
				class="filter-tab" 
				:class="{ active: currentFilter === 'all' }"
				@click="handleFilterChange('all')"
			>
				全部
			</view>
			<view 
				class="filter-tab" 
				:class="{ active: currentFilter === 'pending' }"
				@click="handleFilterChange('pending')"
			>
				待收货
			</view>
			<view 
				class="filter-tab" 
				:class="{ active: currentFilter === 'completed' }"
				@click="handleFilterChange('completed')"
			>
				已完成
			</view>
			<view 
				class="filter-tab" 
				:class="{ active: currentFilter === 'cancelled' }"
				@click="handleFilterChange('cancelled')"
			>
				已取消
			</view>
		</view>
		
		<view class="order-list">
			<view class="order-item card" v-for="item in filteredOrderList" :key="item.id">
				<view class="order-header">
					<text class="order-id">订单号：{{ item.id }}</text>
					<text class="order-status" :class="'status-' + item.status">{{ item.statusText }}</text>
				</view>
				<view class="order-content" @click="goToDetail(item)">
					<image class="goods-image" :src="item.image" mode="aspectFill"></image>
					<view class="goods-info">
						<view class="goods-title">{{ item.title }}</view>
						<view class="goods-price">¥{{ item.price.toFixed(2) }}</view>
						<view class="goods-quantity">数量：{{ item.quantity || 1 }}</view>
					</view>
				</view>
				<view class="order-footer">
					<text class="order-time">{{ formatTime(item.orderTime) }}</text>
					<view class="order-actions">
						<button
							v-if="item.status === 'pending'"
							class="action-btn btn btn-sm btn-outline"
							@click="handleContact(item)"
						>
							联系卖家
						</button>
						<button
							v-if="item.status === 'pending'"
							class="action-btn btn btn-sm btn-outline"
							@click="handleCancel(item.id)"
						>
							取消订单
						</button>
						<button
							v-if="item.status === 'pending'"
							class="action-btn btn btn-sm btn-primary"
							@click="handleConfirm(item.id)"
						>
							确认收货
						</button>
						<button
							v-if="item.status === 'completed'"
							class="action-btn btn btn-sm btn-outline"
							@click="handleReview(item)"
						>
							评价
						</button>
						<button
							v-if="item.status === 'completed' || item.status === 'cancelled'"
							class="action-btn btn btn-sm btn-danger"
							@click="handleDelete(item.id)"
						>
							删除订单
						</button>
						<button
							v-if="currentTab === 1"
							class="action-btn btn btn-sm btn-outline"
							@click="handleContact(item)"
						>
							联系买家
						</button>
					</view>
				</view>
			</view>
			
			<view v-if="filteredOrderList.length === 0" class="empty-state">
				<text class="empty-icon">📦</text>
				<text class="empty-text">{{ getEmptyText() }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import { mockOrderList } from '@/mock/index.js'
import common from '@/utils/common.js'
import storage from '@/utils/storage.js'

export default {
	data() {
		return {
			currentTab: 0,
			currentFilter: 'all',
			tabs: ['已购买', '我卖掉'],
			orderList: []
		}
	},
	computed: {
		filteredOrderList() {
			if (this.currentTab === 0) {
				if (this.currentFilter === 'all') {
					return this.orderList
				}
				return this.orderList.filter(item => item.status === this.currentFilter)
			} else {
				return this.orderList
			}
		}
	},
	onLoad() {
		this.loadOrderList()
	},
	onShow() {
		this.loadOrderList()
	},
	methods: {
		loadOrderList() {
			const userOrderList = storage.getStorage('user_order_list') || []
			
			if (this.currentTab === 0) {
				this.orderList = [...mockOrderList.bought, ...userOrderList.filter(o => o.type === 'bought')]
			} else if (this.currentTab === 1) {
				this.orderList = [...mockOrderList.sold, ...userOrderList.filter(o => o.type === 'sold')]
			}
		},
		handleTabChange(e) {
			this.currentTab = e.currentIndex
			this.currentFilter = 'all'
			this.loadOrderList()
		},
		handleFilterChange(filter) {
			this.currentFilter = filter
		},
		handleCancel(orderId) {
			uni.showModal({
				title: '提示',
				content: '确定要取消该订单吗？',
				success: (res) => {
					if (res.confirm) {
						const index = this.orderList.findIndex(item => item.id === orderId)
						if (index !== -1) {
							this.orderList[index].status = 'cancelled'
							this.orderList[index].statusText = '已取消'
							this.saveOrderList()
							uni.showToast({
								title: '订单已取消',
								icon: 'success'
							})
						}
					}
				}
			})
		},
		handleConfirm(orderId) {
			uni.showModal({
				title: '提示',
				content: '确定已收到商品吗？',
				success: (res) => {
					if (res.confirm) {
						const index = this.orderList.findIndex(item => item.id === orderId)
						if (index !== -1) {
							this.orderList[index].status = 'completed'
							this.orderList[index].statusText = '已完成'
							this.saveOrderList()
							uni.showToast({
								title: '确认收货成功',
								icon: 'success'
							})
						}
					}
				}
			})
		},
		handleDelete(orderId) {
			uni.showModal({
				title: '提示',
				content: '确定要删除该订单吗？删除后无法恢复',
				success: (res) => {
					if (res.confirm) {
						this.orderList = this.orderList.filter(item => item.id !== orderId)
						this.saveOrderList()
						uni.showToast({
							title: '删除成功',
							icon: 'success'
						})
					}
				}
			})
		},
		handleContact(item) {
			uni.showToast({
				title: '正在打开聊天...',
				icon: 'none'
			})
		},
		handleReview(item) {
			uni.showModal({
				title: '评价订单',
				editable: true,
				placeholderText: '请输入您的评价',
				success: (res) => {
					if (res.confirm && res.content) {
						uni.showToast({
							title: '评价成功',
							icon: 'success'
						})
					}
				}
			})
		},
		saveOrderList() {
			const userOrderList = storage.getStorage('user_order_list') || []
			const existingIds = userOrderList.map(o => o.id)
			
			this.orderList.forEach(item => {
				if (!existingIds.includes(item.id)) {
					userOrderList.push({
						...item,
						type: this.currentTab === 0 ? 'bought' : 'sold'
					})
				} else {
					const index = userOrderList.findIndex(o => o.id === item.id)
					if (index !== -1) {
						userOrderList[index] = {
							...userOrderList[index],
							...item,
							type: this.currentTab === 0 ? 'bought' : 'sold'
						}
					}
				}
			})
			
			storage.setStorage('user_order_list', userOrderList)
		},
		goToDetail(item) {
			uni.navigateTo({
				url: `/pages/detail/detail?id=${item.goodsId || item.id}`
			})
		},
		getEmptyText() {
			if (this.currentTab === 0) {
				switch (this.currentFilter) {
					case 'all':
						return '暂无订单，快去挑选心仪好物吧'
					case 'pending':
						return '暂无待收货订单'
					case 'completed':
						return '暂无已完成订单'
					case 'cancelled':
						return '暂无已取消订单'
					default:
						return '暂无订单'
				}
			} else {
				return '暂无已售商品'
			}
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
}

.order-list {
	padding: 20rpx;
}

.filter-tabs {
	display: flex;
	background-color: #FFFFFF;
	padding: 20rpx;
	margin-bottom: 20rpx;
	
	.filter-tab {
		flex: 1;
		text-align: center;
		font-size: 26rpx;
		color: #666666;
		padding: 10rpx 0;
		position: relative;
		
		&.active {
			color: #4CAF50;
			font-weight: bold;
			
			&::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 40rpx;
				height: 4rpx;
				background-color: #4CAF50;
				border-radius: 2rpx;
			}
		}
	}
}

.order-item {
	margin-bottom: 20rpx;
	
	.order-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #EEEEEE;
		margin-bottom: 20rpx;
		
		.order-id {
			font-size: 24rpx;
			color: #999999;
		}
		
		.order-status {
			font-size: 26rpx;
			font-weight: bold;
			
			&.status-pending {
				color: #FF9800;
			}
			
			&.status-completed {
				color: #4CAF50;
			}
			
			&.status-cancelled {
				color: #999999;
			}
		}
	}
	
	.order-content {
		display: flex;
		margin-bottom: 20rpx;
		
		.goods-image {
			width: 160rpx;
			height: 160rpx;
			border-radius: 8rpx;
			margin-right: 20rpx;
			background-color: #F5F5F5;
		}
		
		.goods-info {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			
			.goods-title {
				font-size: 28rpx;
				color: #333333;
				line-height: 1.4;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
			
			.goods-price {
				font-size: 32rpx;
				color: #FF5722;
				font-weight: bold;
			}
		}
	}
	
	.order-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 20rpx;
		border-top: 1rpx solid #EEEEEE;
		
		.order-time {
			font-size: 24rpx;
			color: #999999;
		}
		
		.order-actions {
			display: flex;
			
			.action-btn {
				margin-left: 15rpx;
			}
		}
	}
}

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 100rpx 40rpx;
	
	.empty-icon {
		font-size: 120rpx;
		color: #CCCCCC;
		margin-bottom: 20rpx;
	}
	
	.empty-text {
		color: #999999;
		font-size: 28rpx;
	}
}
</style>
