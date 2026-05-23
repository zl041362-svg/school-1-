<template>
	<view class="page">
		<view v-if="!goodsDetail.id" class="loading-state">
			<text class="loading-text">加载中...</text>
		</view>
		<template v-else>
		<swiper class="media-swiper" :indicator-dots="true" :autoplay="false" :circular="true">
			<swiper-item v-for="(item, index) in goodsDetail.images" :key="index">
				<image lazy-load class="media-image" :src="item" mode="aspectFill" @click="previewImage(index)"></image>
			</swiper-item>
		</swiper>
		
		<view class="goods-info-card card">
			<view class="price-section">
				<text class="price">¥{{ goodsDetail.price.toFixed(2) }}</text>
				<text class="original-price">¥{{ goodsDetail.originalPrice.toFixed(2) }}</text>
				<text class="discount">{{ discount }}折</text>
			</view>
			<view class="title-section">
				<text class="title">{{ goodsDetail.title }}</text>
			</view>
			<view class="tags-section">
				<text class="tag tag-primary">{{ goodsDetail.condition }}</text>
				<text class="tag tag-info">{{ goodsDetail.delivery }}</text>
			</view>
		</view>
		
		<view class="seller-card card">
			<view class="seller-header">
				<image lazy-load class="avatar" :src="goodsDetail.seller.avatar" mode="aspectFill"></image>
				<view class="seller-info">
					<view class="nickname">{{ goodsDetail.seller.nickname }}</view>
					<view class="credit">
						<text class="credit-text">信誉等级</text>
						<uni-rate :value="goodsDetail.seller.credit" readonly size="16"></uni-rate>
					</view>
				</view>
				<button class="follow-btn btn btn-sm btn-outline" @click="handleFollow">关注</button>
			</view>
			<view class="seller-stats">
				<view class="stat-item">
					<text class="stat-value">{{ goodsDetail.seller.soldCount }}</text>
					<text class="stat-label">已售</text>
				</view>
				<view class="stat-item">
					<text class="stat-value">{{ goodsDetail.viewCount }}</text>
					<text class="stat-label">浏览</text>
				</view>
				<view class="stat-item">
					<text class="stat-value">{{ goodsDetail.likeCount }}</text>
					<text class="stat-label">想要</text>
				</view>
			</view>
		</view>
		
		<view class="description-card card">
			<view class="card-title">商品描述</view>
			<rich-text class="description" :nodes="goodsDetail.description"></rich-text>
		</view>
		
		<view class="recommend-section">
			<view class="section-title">猜你喜欢</view>
			<view class="recommend-list">
				<view
					class="recommend-item"
					v-for="item in recommendList"
					:key="item.id"
					@click="goToDetail(item.id)"
				>
					<image lazy-load class="recommend-image" :src="item.image" mode="aspectFill"></image>
					<view class="recommend-info">
						<view class="recommend-title">{{ item.title }}</view>
						<view class="recommend-price">¥{{ item.price.toFixed(2) }}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bottom-bar">
			<view class="bar-left">
				<view class="bar-item" @click="handleFavorite">
					<uni-icons :type="isFavorite ? 'heart-filled' : 'heart'" :color="isFavorite ? '#FF5722' : '#999999'" size="24"></uni-icons>
					<text class="bar-text">收藏</text>
				</view>
				<view class="bar-item" @click="goToCart">
					<uni-icons type="cart" color="#999999" size="24"></uni-icons>
					<text class="bar-text">购物车</text>
					<uni-badge :text="cartCount" absolute="true" :offset="[5, -5]" size="small"></uni-badge>
				</view>
			</view>
			<view class="bar-right">
				<button class="action-btn btn btn-warning" @click="handleAddCart">加入购物车</button>
				<button class="action-btn btn btn-primary" @click="handleBuyNow">立即购买</button>
			</view>
		</view>
	</template>
</view>
</template>

<script>
import { mockGoodsList } from '@/mock/index.js'
import storage from '@/utils/storage.js'
import { addToCart, getCartCount } from '@/utils/cart.js'
import { isFavorite, toggleFavorite as toggleFav } from '@/utils/favorite.js'

export default {
	data() {
		return {
			goodsId: null,
			goodsDetail: {},
			isFavorite: false,
			cartCount: 0,
			recommendList: []
		}
	},
	computed: {
		discount() {
			if (!this.goodsDetail.originalPrice || !this.goodsDetail.price || this.goodsDetail.originalPrice === 0) {
				return '无'
			}
			return Math.round((this.goodsDetail.price / this.goodsDetail.originalPrice) * 10)
		}
	},
	onLoad(options) {
		this.goodsId = parseInt(options.id)
		this.loadGoodsDetail()
		this.loadRecommendList()
		this.checkFavoriteStatus()
		this.loadCartCount()
	},
	methods: {
		loadGoodsDetail() {
			const goods = mockGoodsList.find(item => item.id === this.goodsId)
			if (goods) {
				this.goodsDetail = {
					...goods,
					images: [
						goods.image,
						goods.image,
						goods.image
					],
					description: `<p>商品描述：</p>
						<p>1. 商品成色：${goods.condition}</p>
						<p>2. 发货方式：${goods.delivery}</p>
						<p>3. 商品详情：这是一件非常不错的商品，性价比很高，欢迎选购！</p>`
				}
			}
		},
		loadRecommendList() {
			this.recommendList = mockGoodsList.filter(item => item.id !== this.goodsId).slice(0, 4)
		},
		checkFavoriteStatus() {
			this.isFavorite = isFavorite(this.goodsId)
		},
		loadCartCount() {
			this.cartCount = getCartCount()
		},
		previewImage(index) {
			uni.previewImage({
				urls: this.goodsDetail.images,
				current: index
			})
		},
		handleFollow() {
			uni.showToast({
				title: '已关注',
				icon: 'success'
			})
		},
		handleFavorite() {
			toggleFav(this.goodsId)
			this.isFavorite = !this.isFavorite
			uni.showToast({
				title: this.isFavorite ? '已收藏' : '已取消收藏',
				icon: this.isFavorite ? 'success' : 'none'
			})
		},
		handleAddCart() {
			addToCart({
				id: this.goodsId,
				title: this.goodsDetail.title,
				price: this.goodsDetail.price,
				image: this.goodsDetail.image
			})
			this.cartCount = getCartCount()
			uni.showToast({
				title: '已加入购物车',
				icon: 'success'
			})
		},
		handleBuyNow() {
			uni.showToast({
				title: '功能开发中',
				icon: 'none'
			})
		},
		goToCart() {
			uni.navigateTo({
				url: '/pages/cart/cart'
			})
		},
		goToDetail(id) {
			uni.redirectTo({
				url: `/pages/detail/detail?id=${id}`
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background-color: #F5F5F5;
		padding-bottom: calc(120rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
}

.media-swiper {
	width: 100%;
	height: 500rpx;
	background-color: #FFFFFF;
	
	.media-image {
		width: 100%;
		height: 100%;
	}
}

.goods-info-card {
	margin: 20rpx;
	
	.price-section {
		display: flex;
		align-items: baseline;
		margin-bottom: 20rpx;
		
		.price {
			font-size: 48rpx;
			color: #FF5722;
			font-weight: bold;
			margin-right: 15rpx;
		}
		
		.original-price {
			font-size: 28rpx;
			color: #999999;
			text-decoration: line-through;
			margin-right: 15rpx;
		}
		
		.discount {
			font-size: 24rpx;
			color: #FF5722;
			padding: 2rpx 8rpx;
			border: 1rpx solid #FF5722;
			border-radius: 4rpx;
		}
	}
	
	.title-section {
		margin-bottom: 20rpx;
		
		.title {
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
			line-height: 1.5;
		}
	}
	
	.tags-section {
		.tag {
			margin-right: 10rpx;
		}
	}
}

.seller-card {
	margin: 0 20rpx 20rpx;
	
	.seller-header {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
		
		.avatar {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		
		.seller-info {
			flex: 1;
			
			.nickname {
				font-size: 28rpx;
				color: #333333;
				margin-bottom: 10rpx;
			}
			
			.credit {
				display: flex;
				align-items: center;
				font-size: 24rpx;
				color: #999999;
				
				.credit-text {
					margin-right: 10rpx;
				}
			}
		}
		
		.follow-btn {
			padding: 8rpx 20rpx;
			font-size: 24rpx;
		}
	}
	
	.seller-stats {
		display: flex;
		justify-content: space-around;
		
		.stat-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.stat-value {
				font-size: 32rpx;
				color: #333333;
				font-weight: bold;
				margin-bottom: 8rpx;
			}
			
			.stat-label {
				font-size: 24rpx;
				color: #999999;
			}
		}
	}
}

.description-card {
	margin: 0 20rpx 20rpx;
	
	.card-title {
		font-size: 28rpx;
		color: #333333;
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	
	.description {
		font-size: 28rpx;
		color: #666666;
		line-height: 1.8;
	}
}

.recommend-section {
	margin: 0 20rpx 20rpx;
	
	.section-title {
		font-size: 28rpx;
		color: #333333;
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	
	.recommend-list {
		display: flex;
		flex-wrap: wrap;
		margin: -10rpx;
		
		.recommend-item {
			width: calc(50% - 20rpx);
			margin: 10rpx;
			background-color: #FFFFFF;
			border-radius: 8rpx;
			overflow: hidden;
			
			.recommend-image {
				width: 100%;
				height: 300rpx;
				background-color: #F5F5F5;
			}
			
			.recommend-info {
				padding: 15rpx;
				
				.recommend-title {
					font-size: 26rpx;
					color: #333333;
					line-height: 1.4;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					margin-bottom: 10rpx;
				}
				
				.recommend-price {
					font-size: 28rpx;
					color: #FF5722;
					font-weight: bold;
				}
			}
		}
	}
}

.bottom-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	background-color: #FFFFFF;
	padding: 15rpx 20rpx;
	padding-bottom: calc(15rpx + constant(safe-area-inset-bottom));
	padding-bottom: calc(15rpx + env(safe-area-inset-bottom));
	box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
	
	.bar-left {
		display: flex;
		margin-right: 20rpx;
		
		.bar-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-right: 30rpx;
			position: relative;
			padding: 10rpx 0;
			min-height: 72rpx;
			
			&:active {
				opacity: 0.7;
			}
			
			.bar-text {
				font-size: 24rpx;
				color: #999999;
				margin-top: 4rpx;
			}
		}
	}
	
	.bar-right {
		flex: 1;
		display: flex;
		
		.action-btn {
			flex: 1;
			margin-right: 15rpx;
			border-radius: 40rpx;
			
			&:last-child {
				margin-right: 0;
			}
		}
	}
}
</style>
