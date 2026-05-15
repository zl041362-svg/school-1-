<template>
	<view class="page">
		<view class="stats-container">
			<view class="stats-item" @click="handleFilter('all')">
				<text class="stats-num">{{ stats.total }}</text>
				<text class="stats-label">全部</text>
			</view>
			<view class="stats-item" @click="handleFilter('onsale')">
				<text class="stats-num stats-green">{{ stats.onsale }}</text>
				<text class="stats-label">出售中</text>
			</view>
			<view class="stats-item" @click="handleFilter('offsale')">
				<text class="stats-num stats-gray">{{ stats.offsale }}</text>
				<text class="stats-label">已下架</text>
			</view>
			<view class="stats-item" @click="handleFilter('sold')">
				<text class="stats-num stats-orange">{{ stats.sold }}</text>
				<text class="stats-label">已售出</text>
			</view>
		</view>
		
		<view class="filter-tabs">
			<view 
				class="filter-tab" 
				:class="{ active: currentFilter === 'all' }"
				@click="handleFilter('all')"
			>
				全部
			</view>
			<view 
				class="filter-tab" 
				:class="{ active: currentFilter === 'onsale' }"
				@click="handleFilter('onsale')"
			>
				出售中
			</view>
			<view 
				class="filter-tab" 
				:class="{ active: currentFilter === 'offsale' }"
				@click="handleFilter('offsale')"
			>
				已下架
			</view>
			<view 
				class="filter-tab" 
				:class="{ active: currentFilter === 'sold' }"
				@click="handleFilter('sold')"
			>
				已售出
			</view>
		</view>
		
		<view class="published-list">
			<view class="loading-container" v-if="isLoading">
				<uni-load-more status="loading" :content-text="{ contentdown: '加载中...', contentrefresh: '加载中...', contentnomore: '加载中...' }"></uni-load-more>
			</view>
			
			<view class="empty-state" v-else-if="filteredList.length === 0">
				<text class="empty-icon">📝</text>
				<text class="empty-text">{{ emptyText }}</text>
				<button class="btn btn-primary mt-20" @click="goToPublish" v-if="currentFilter === 'all'">发布商品</button>
			</view>
			
			<view class="published-item card" v-for="item in filteredList" :key="item.id" v-else>
				<view class="published-header">
					<view class="goods-info">
						<image class="goods-image" :src="item.image" mode="aspectFill" @click="goToDetail(item.id)"></image>
						<view class="info-right">
							<view class="goods-title" @click="goToDetail(item.id)">{{ item.title }}</view>
							<view class="goods-tags">
								<text class="tag tag-primary">{{ item.condition }}</text>
								<text class="tag tag-info">{{ item.delivery }}</text>
							</view>
							<view class="goods-meta">
								<text class="price">¥{{ item.price.toFixed(2) }}</text>
								<text class="original-price" v-if="item.originalPrice">¥{{ item.originalPrice.toFixed(2) }}</text>
							</view>
							<view class="goods-stats">
								<text class="view-count">{{ item.viewCount }}浏览</text>
								<text class="divider">|</text>
								<text class="like-count">{{ item.likeCount }}想要</text>
								<text class="divider">|</text>
								<text class="stock">库存{{ item.stock }}</text>
							</view>
						</view>
					</view>
					<view class="status-badge" :class="'status-' + item.status">
						{{ item.statusText }}
					</view>
				</view>
				<view class="published-footer">
					<text class="publish-time">发布时间：{{ formatTime(item.publishTime) }}</text>
					<view class="action-buttons">
						<button
							class="action-btn btn btn-sm btn-outline"
							@click="handleEdit(item)"
						>
							编辑
						</button>
						<button
							v-if="item.status === 'onsale'"
							class="action-btn btn btn-sm btn-warning"
							@click="handleOffShelf(item)"
						>
							下架
						</button>
						<button
							v-if="item.status === 'offsale'"
							class="action-btn btn btn-sm btn-primary"
							@click="handleOnShelf(item)"
						>
							上架
						</button>
						<button
							class="action-btn btn btn-sm btn-danger"
							@click="handleDelete(item)"
						>
							删除
						</button>
					</view>
				</view>
			</view>
			
			<uni-load-more
				v-if="filteredList.length > 0"
				:status="loadMoreStatus"
				:content-text="loadMoreText"
			></uni-load-more>
		</view>
	</view>
</template>

<script>
import { mockGoodsList } from '@/mock/index.js'
import common from '@/utils/common.js'
import storage from '@/utils/storage.js'

export default {
	data() {
		return {
			publishedList: [],
			currentFilter: 'all',
			isLoading: false,
			stats: {
				total: 0,
				onsale: 0,
				offsale: 0,
				sold: 0
			},
			loadMoreStatus: 'more',
			loadMoreText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中...',
				contentnomore: '没有更多了'
			}
		}
	},
	computed: {
		filteredList() {
			if (this.currentFilter === 'all') {
				return this.publishedList
			}
			return this.publishedList.filter(item => item.status === this.currentFilter)
		},
		emptyText() {
			const textMap = {
				all: '暂无发布的商品，快去发布吧',
				onsale: '暂无出售中的商品',
				offsale: '暂无已下架的商品',
				sold: '暂无已售出的商品'
			}
			return textMap[this.currentFilter]
		}
	},
	onLoad() {
		this.loadPublishedList()
	},
	onShow() {
		this.loadPublishedList()
	},
	onPullDownRefresh() {
		this.refreshData()
	},
	onReachBottom() {
		this.loadMore()
	},
	methods: {
		loadPublishedList() {
			this.isLoading = true
			const userId = 1
			const userGoodsList = storage.getStorage('user_goods_list') || []
			
			const mockUserGoods = mockGoodsList
				.filter(item => item.seller.id === userId)
				.map(item => ({
					...item,
					status: 'onsale',
					statusText: '出售中'
				}))
			
			const storageUserGoods = userGoodsList.map(item => ({
				...item,
				status: item.status || 'onsale',
				statusText: item.statusText || '出售中'
			}))
			
			this.publishedList = [...storageUserGoods, ...mockUserGoods]
			this.updateStats()
			
			setTimeout(() => {
				this.isLoading = false
			}, 500)
		},
		updateStats() {
			this.stats.total = this.publishedList.length
			this.stats.onsale = this.publishedList.filter(item => item.status === 'onsale').length
			this.stats.offsale = this.publishedList.filter(item => item.status === 'offsale').length
			this.stats.sold = this.publishedList.filter(item => item.status === 'sold').length
		},
		handleFilter(filter) {
			this.currentFilter = filter
		},
		refreshData() {
			this.loadMoreStatus = 'more'
			this.loadPublishedList()
			uni.stopPullDownRefresh()
		},
		loadMore() {
			if (this.loadMoreStatus !== 'more') return
			this.loadMoreStatus = 'loading'
			setTimeout(() => {
				this.loadMoreStatus = 'noMore'
			}, 1000)
		},
		goToDetail(goodsId) {
			uni.navigateTo({
				url: `/pages/detail/detail?id=${goodsId}`
			})
		},
		handleEdit(item) {
			uni.navigateTo({
				url: `/pages/publish/publish?id=${item.id}&mode=edit`
			})
		},
		handleOffShelf(item) {
			uni.showModal({
				title: '提示',
				content: '确定要下架该商品吗？',
				success: (res) => {
					if (res.confirm) {
						item.status = 'offsale'
						item.statusText = '已下架'
						this.updateGoodsStatus(item.id, 'offsale')
						this.updateStats()
						uni.showToast({
							title: '商品已下架',
							icon: 'success'
						})
					}
				}
			})
		},
		handleOnShelf(item) {
			item.status = 'onsale'
			item.statusText = '出售中'
			this.updateGoodsStatus(item.id, 'onsale')
			this.updateStats()
			uni.showToast({
				title: '商品已上架',
				icon: 'success'
			})
		},
		handleDelete(item) {
			uni.showModal({
				title: '提示',
				content: '确定要删除该商品吗？删除后无法恢复',
				success: (res) => {
					if (res.confirm) {
						this.deleteGoods(item.id)
						this.publishedList = this.publishedList.filter(goods => goods.id !== item.id)
						this.updateStats()
						uni.showToast({
							title: '删除成功',
							icon: 'success'
						})
					}
				}
			})
		},
		updateGoodsStatus(goodsId, status) {
			const userGoodsList = storage.getStorage('user_goods_list') || []
			const index = userGoodsList.findIndex(item => item.id === goodsId)
			if (index !== -1) {
				userGoodsList[index].status = status
				userGoodsList[index].statusText = status === 'onsale' ? '出售中' : '已下架'
				storage.setStorage('user_goods_list', userGoodsList)
			}
		},
		deleteGoods(goodsId) {
			const userGoodsList = storage.getStorage('user_goods_list') || []
			const filteredList = userGoodsList.filter(item => item.id !== goodsId)
			storage.setStorage('user_goods_list', filteredList)
		},
		goToPublish() {
			uni.navigateTo({
				url: '/pages/publish/publish'
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
}

.stats-container {
	display: flex;
	background-color: #FFFFFF;
	padding: 30rpx 20rpx;
	margin-bottom: 20rpx;
	
	.stats-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.stats-num {
			font-size: 40rpx;
			color: #333333;
			font-weight: bold;
			margin-bottom: 10rpx;
			
			&.stats-green {
				color: #4CAF50;
			}
			
			&.stats-gray {
				color: #999999;
			}
			
			&.stats-orange {
				color: #FF9800;
			}
		}
		
		.stats-label {
			font-size: 24rpx;
			color: #999999;
		}
	}
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

.published-list {
	padding: 20rpx;
	
	.loading-container {
		padding: 100rpx 0;
		text-align: center;
	}
}

.published-item {
	margin-bottom: 20rpx;
	
	.published-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 20rpx;
		
		.goods-info {
			flex: 1;
			display: flex;
			margin-right: 20rpx;
			
			.goods-image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 8rpx;
				margin-right: 20rpx;
				background-color: #F5F5F5;
			}
			
			.info-right {
				flex: 1;
				
				.goods-title {
					font-size: 28rpx;
					color: #333333;
					line-height: 1.4;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					margin-bottom: 10rpx;
				}
				
				.goods-tags {
					margin-bottom: 10rpx;
					
					.tag {
						margin-right: 10rpx;
					}
				}
				
				.goods-meta {
					display: flex;
					align-items: center;
					font-size: 24rpx;
					color: #999999;
					margin-bottom: 10rpx;
					
					.price {
						font-size: 32rpx;
						color: #FF5722;
						font-weight: bold;
						margin-right: 15rpx;
					}
					
					.original-price {
						font-size: 24rpx;
						color: #999999;
						text-decoration: line-through;
					}
				}
				
				.goods-stats {
					display: flex;
					align-items: center;
					font-size: 22rpx;
					color: #999999;
					
					.divider {
						margin: 0 10rpx;
					}
					
					.stock {
						color: #4CAF50;
					}
				}
			}
		}
		
		.status-badge {
			padding: 8rpx 20rpx;
			border-radius: 20rpx;
			font-size: 24rpx;
			color: #FFFFFF;
			white-space: nowrap;
			
			&.status-onsale {
				background-color: #4CAF50;
			}
			
			&.status-offsale {
				background-color: #999999;
			}
			
			&.status-sold {
				background-color: #FF9800;
			}
		}
	}
	
	.published-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 20rpx;
		border-top: 1rpx solid #EEEEEE;
		
		.publish-time {
			font-size: 24rpx;
			color: #999999;
		}
		
		.action-buttons {
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
		margin-bottom: 30rpx;
	}
}
</style>
