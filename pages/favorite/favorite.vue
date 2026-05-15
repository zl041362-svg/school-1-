<template>
	<view class="page">
		<view class="favorite-list">
			<view class="favorite-item card" v-for="item in favoriteList" :key="item.id">
				<image class="goods-image" :src="item.image" mode="aspectFill" @click="goToDetail(item.id)"></image>
				<view class="goods-info">
					<view class="goods-title" @click="goToDetail(item.id)">{{ item.title }}</view>
					<view class="goods-tags">
						<text class="tag tag-primary">{{ item.condition }}</text>
						<text class="tag tag-info">{{ item.delivery }}</text>
					</view>
					<view class="goods-price">¥{{ item.price.toFixed(2) }}</view>
				</view>
				<button class="remove-btn btn btn-sm btn-outline" @click="handleRemove(item.id)">取消收藏</button>
			</view>
			
			<view v-if="favoriteList.length === 0" class="empty-state">
				<text class="empty-icon">❤️</text>
				<text class="empty-text">暂无收藏商品，快去收藏喜欢的吧</text>
				<button class="btn btn-primary mt-20" @click="goToIndex">去逛逛</button>
			</view>
		</view>
	</view>
</template>

<script>
import { mockGoodsList } from '@/mock/index.js'
import storage from '@/utils/storage.js'

export default {
	data() {
		return {
			favoriteList: []
		}
	},
	onLoad() {
		this.loadFavoriteList()
	},
	onShow() {
		this.loadFavoriteList()
	},
	methods: {
		loadFavoriteList() {
			const favoriteIds = storage.getStorage(storage.STORAGE_KEYS.FAVORITE) || []
			this.favoriteList = mockGoodsList.filter(item => favoriteIds.includes(item.id))
		},
		handleRemove(id) {
			uni.showModal({
				title: '提示',
				content: '确定要取消收藏吗？',
				success: (res) => {
					if (res.confirm) {
						let favoriteIds = storage.getStorage(storage.STORAGE_KEYS.FAVORITE) || []
						favoriteIds = favoriteIds.filter(itemId => itemId !== id)
						storage.setStorage(storage.STORAGE_KEYS.FAVORITE, favoriteIds)
						this.loadFavoriteList()
						uni.showToast({
							title: '已取消收藏',
							icon: 'success'
						})
					}
				}
			})
		},
		goToDetail(id) {
			uni.navigateTo({
				url: `/pages/detail/detail?id=${id}`
			})
		},
		goToIndex() {
			uni.switchTab({
				url: '/pages/index/index'
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

.favorite-list {
	padding: 20rpx;
}

.favorite-item {
	display: flex;
	margin-bottom: 20rpx;
	position: relative;
	
	.goods-image {
		width: 180rpx;
		height: 180rpx;
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
		
		.goods-tags {
			margin-top: 10rpx;
			
			.tag {
				margin-right: 10rpx;
			}
		}
		
		.goods-price {
			font-size: 32rpx;
			color: #FF5722;
			font-weight: bold;
		}
	}
	
	.remove-btn {
		position: absolute;
		bottom: 20rpx;
		right: 20rpx;
	}
}
</style>
