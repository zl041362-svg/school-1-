<template>
	<view class="page">
		<view class="category-section">
			<scroll-view class="category-sidebar" scroll-y>
				<view
					class="category-item"
					:class="{ active: currentCategoryIndex === index }"
					v-for="(item, index) in categories"
					:key="item.id"
					@click="handleCategoryClick(index)"
				>
					{{ item.name }}
				</view>
			</scroll-view>
			<scroll-view class="category-content" scroll-y>
				<view class="goods-grid">
					<view
						class="goods-card"
						v-for="item in goodsList"
						:key="item.id"
						@click="goToDetail(item.id)"
					>
						<image class="goods-image" :src="item.image" mode="aspectFill"></image>
						<view class="goods-info">
							<view class="goods-title">{{ item.title }}</view>
							<view class="goods-price">¥{{ item.price.toFixed(2) }}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { mockCategories, mockGoodsList } from '@/mock/index.js'

export default {
	data() {
		return {
			currentCategoryIndex: 0,
			categories: mockCategories,
			goodsList: []
		}
	},
	onLoad() {
		this.loadGoodsList()
	},
	methods: {
		handleCategoryClick(index) {
			this.currentCategoryIndex = index
			this.loadGoodsList()
		},
		loadGoodsList() {
			const categoryId = this.categories[this.currentCategoryIndex].id
			if (categoryId === 1) {
				this.goodsList = mockGoodsList
			} else {
				this.goodsList = mockGoodsList.filter(item => item.categoryId === categoryId)
			}
		},
		goToDetail(id) {
			uni.navigateTo({
				url: `/pages/detail/detail?id=${id}`
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.page {
	height: 100vh;
	background-color: #F5F5F5;
}

.category-section {
	display: flex;
	height: 100vh;
}

.category-sidebar {
	width: 200rpx;
	background-color: #F8F8F8;
	
	.category-item {
		padding: 30rpx 20rpx;
		font-size: 28rpx;
		color: #666666;
		text-align: center;
		border-left: 6rpx solid transparent;
		
		&.active {
			background-color: #FFFFFF;
			color: #4CAF50;
			border-left-color: #4CAF50;
			font-weight: bold;
		}
	}
}

.category-content {
	flex: 1;
	background-color: #FFFFFF;
	padding: 20rpx;
}

.goods-grid {
	display: flex;
	flex-wrap: wrap;
	margin: -10rpx;
	
	.goods-card {
		width: calc(50% - 20rpx);
		margin: 10rpx;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		overflow: hidden;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
		
		.goods-image {
			width: 100%;
			height: 300rpx;
			background-color: #F5F5F5;
		}
		
		.goods-info {
			padding: 15rpx;
			
			.goods-title {
				font-size: 26rpx;
				color: #333333;
				line-height: 1.4;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				margin-bottom: 10rpx;
			}
			
			.goods-price {
				font-size: 28rpx;
				color: #FF5722;
				font-weight: bold;
			}
		}
	}
}
</style>
