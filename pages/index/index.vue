<template>
	<view class="page">
		<swiper class="banner-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" circular @change="handleBannerChange">
			<swiper-item v-for="banner in banners" :key="banner.id">
				<image class="banner-image" :src="banner.image" mode="aspectFill" @click="handleBannerClick(banner)"></image>
			</swiper-item>
		</swiper>
		
		<uni-notice-bar
			v-if="showNotice && currentNotice"
			:scrollable="true"
			:single="true"
			:text="currentNotice.title"
			@click="handleNoticeClick"
			@close="handleNoticeClose"
		></uni-notice-bar>
		
		<view class="search-container">
			<uni-search-bar
				v-model="searchKeyword"
				placeholder="搜索商品"
				:focus="false"
				:show-action="true"
				action-text="搜索"
				@confirm="handleSearch"
				@cancel="handleSearchCancel"
				@focus="handleSearchFocus"
			></uni-search-bar>
			<view class="hot-search-tags" v-if="hotSearchTags.length > 0">
				<text class="hot-search-title">热门搜索：</text>
				<view class="search-tag-list">
					<text 
						class="search-tag" 
						v-for="tag in hotSearchTags" 
						:key="tag"
						@click="handleSearchTag(tag)"
					>
						{{ tag }}
					</text>
				</view>
			</view>
		</view>
		
		<view class="category-container">
			<scroll-view class="category-scroll" scroll-x="true" show-scrollbar="false" :bounces="false">
				<view 
					class="category-item" 
					:class="{ active: currentCategoryIndex === index }"
					v-for="(category, index) in mockCategories" 
					:key="category.id"
					@click="handleCategoryChange({ currentIndex: index })"
				>
					<image class="category-icon" :src="category.icon" mode="aspectFit"></image>
					<text class="category-name">{{ category.name }}</text>
				</view>
			</scroll-view>
		</view>
		
		<view class="filter-container">
			<view class="filter-item" :class="{ active: sortType === 'new' }" @click="handleSort('new')">
				最新发布
			</view>
			<view class="filter-item" :class="{ active: sortType === 'hot' }" @click="handleSort('hot')">
				最热推荐
			</view>
			<view class="filter-item" :class="{ active: sortType === 'price_asc' }" @click="handleSort('price_asc')">
				价格低→高
			</view>
			<view class="filter-item" :class="{ active: sortType === 'price_desc' }" @click="handleSort('price_desc')">
				价格高→低
			</view>
		</view>
		
		<view class="hot-section" v-if="hotGoodsList.length > 0">
			<view class="section-header">
				<text class="section-title">🔥 热门推荐</text>
				<text class="section-more" @click="handleMoreHot">查看更多</text>
			</view>
			<scroll-view class="hot-goods-scroll" scroll-x="true" show-scrollbar="false" :bounces="false">
				<view class="hot-goods-item" v-for="item in hotGoodsList" :key="item.id" @click="goToDetail(item.id)">
					<image class="hot-goods-image" :src="item.image" mode="aspectFill"></image>
					<view class="hot-goods-info">
						<text class="hot-goods-title">{{ item.title }}</text>
						<view class="hot-goods-meta">
							<text class="hot-price">¥{{ item.price.toFixed(2) }}</text>
							<text class="hot-views">{{ item.viewCount }}浏览</text>
						</view>
					</view>
					<view class="hot-tag" v-if="item.isHot">HOT</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="goods-list">
			<view class="loading-container" v-if="isLoading">
				<uni-load-more status="loading" :content-text="{ contentdown: '加载中...', contentrefresh: '加载中...', contentnomore: '加载中...' }"></uni-load-more>
			</view>
			
			<view class="empty-container" v-else-if="goodsList.length === 0">
				<image class="empty-image" src="/static/logo.png" mode="aspectFit"></image>
				<text class="empty-text">暂无商品</text>
				<button class="empty-btn btn btn-primary btn-sm" @click="handleRefresh">刷新</button>
			</view>
			
			<uni-list v-else>
				<uni-swipe-action v-for="item in goodsList" :key="item.id">
					<uni-swipe-action-item
						:right-options="swipeOptions"
						@click="handleSwipeClick($event, item)"
					>
						<view class="goods-item" @click="goToDetail(item.id)">
							<image class="goods-image" :src="item.image" mode="aspectFill"></image>
							<view class="goods-info">
								<view class="goods-title">
									<text v-if="item.isNew" class="new-tag">NEW</text>
									<text v-if="item.isHot" class="hot-tag">HOT</text>
									{{ item.title }}
								</view>
								<view class="goods-tags">
									<text class="tag tag-primary">{{ item.condition }}</text>
									<text class="tag tag-info">{{ item.delivery }}</text>
								</view>
								<view class="goods-price">
									<text class="price">¥{{ item.price.toFixed(2) }}</text>
									<text class="original-price" v-if="item.originalPrice">¥{{ item.originalPrice.toFixed(2) }}</text>
								</view>
								<view class="goods-meta">
									<text class="seller">{{ item.seller.nickname }}</text>
									<text class="divider">|</text>
									<text class="view-count">{{ item.viewCount }}浏览</text>
									<text class="divider">|</text>
									<text class="like-count">{{ item.likeCount }}想要</text>
									<text class="stock" v-if="item.stock">库存{{ item.stock }}</text>
								</view>
							</view>
						</view>
						<view class="goods-actions" @click.stop>
							<button class="action-btn btn btn-sm btn-outline" @click="handleAddToCart(item)">
								加入购物车
							</button>
							<button class="action-btn btn btn-sm btn-primary" @click="handleBuyNow(item)">
								立即购买
							</button>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</uni-list>
			
			<uni-load-more
				v-if="goodsList.length > 0"
				:status="loadMoreStatus"
				:content-text="loadMoreText"
			></uni-load-more>
		</view>
		
		<view class="faq-container">
			<uni-collapse>
				<uni-collapse-item title="帮助中心" :open="false">
					<view class="faq-content">
						<view class="faq-category" v-for="category in faqList" :key="category.id">
							<view class="faq-category-title">{{ category.category }}</view>
							<view
								class="faq-question"
								v-for="question in category.questions"
								:key="question.id"
								@click="goToFAQ(question)"
							>
								{{ question.question }}
							</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
import { mockNotices, mockBanners, mockCategories, mockGoodsList, mockFAQList, mockHotSearch } from '@/mock/index.js'
import storage from '@/utils/storage.js'
import { addToCart } from '@/utils/cart.js'
import { toggleFavorite as toggleFav } from '@/utils/favorite.js'

export default {
	data() {
		return {
			showNotice: true,
			currentNotice: null,
			noticeIndex: 0,
			banners: [],
			searchKeyword: '',
			hotSearchTags: [],
			mockCategories: [],
			currentCategoryIndex: 0,
			sortType: 'new',
			goodsList: [],
			hotGoodsList: [],
			isLoading: false,
			page: 1,
			pageSize: 10,
			loadMoreStatus: 'more',
			loadMoreText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中...',
				contentnomore: '没有更多了'
			},
			swipeOptions: [
				{
					text: '收藏',
					style: {
						backgroundColor: '#4CAF50'
					}
				}
			],
			faqList: []
		}
	},
	onLoad() {
		this.initData()
		this.checkNoticeStatus()
	},
	onPullDownRefresh() {
		this.refreshData()
	},
	onReachBottom() {
		this.loadMore()
	},
	methods: {
		initData() {
			this.isLoading = true
			this.currentNotice = mockNotices[0]
			this.banners = mockBanners
			this.hotSearchTags = mockHotSearch
			this.mockCategories = mockCategories
			this.goodsList = mockGoodsList
			this.hotGoodsList = mockGoodsList.filter(item => item.viewCount > 100).slice(0, 5)
			this.faqList = mockFAQList
			setTimeout(() => {
				this.isLoading = false
			}, 500)
		},
		checkNoticeStatus() {
			const closed = storage.getStorage(storage.STORAGE_KEYS.NOTICE_CLOSED)
			if (closed) {
				this.showNotice = false
			}
		},
		handleBannerChange(e) {
			console.log('Banner changed:', e)
		},
		handleBannerClick(banner) {
			if (banner.link && this.isValidRoute(banner.link)) {
				uni.navigateTo({
					url: banner.link
				})
			}
		},
		handleNoticeClick() {
			if (this.currentNotice.link && this.isValidRoute(this.currentNotice.link)) {
				uni.navigateTo({
					url: this.currentNotice.link
				})
			}
		},
		isValidRoute(url) {
			return /^\/pages\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)?(\?.*)?$/.test(url)
		},
		handleNoticeClose() {
			this.showNotice = false
			storage.setStorage(storage.STORAGE_KEYS.NOTICE_CLOSED, true)
		},
		handleSearch() {
			if (!this.searchKeyword.trim()) {
				uni.showToast({
					title: '请输入搜索关键词',
					icon: 'none'
				})
				return
			}
			this.saveSearchHistory(this.searchKeyword)
			this.filterGoodsByKeyword(this.searchKeyword)
		},
		handleSearchTag(tag) {
			this.searchKeyword = tag
			this.saveSearchHistory(tag)
			this.filterGoodsByKeyword(tag)
		},
		saveSearchHistory(keyword) {
			let history = storage.getStorage(storage.STORAGE_KEYS.SEARCH_HISTORY) || []
			history = history.filter(item => item !== keyword)
			history.unshift(keyword)
			history = history.slice(0, 10)
			storage.setStorage(storage.STORAGE_KEYS.SEARCH_HISTORY, history)
		},
		handleSearchCancel() {
			this.searchKeyword = ''
		},
		handleSearchFocus() {
		},
		filterGoodsByKeyword(keyword) {
			if (!keyword.trim()) {
				this.goodsList = mockGoodsList
				return
			}
			this.goodsList = mockGoodsList.filter(item =>
				item.title.toLowerCase().includes(keyword.toLowerCase())
			)
		},
		handleCategoryChange(e) {
			this.currentCategoryIndex = e.currentIndex
			this.refreshData()
		},
		handleSort(type) {
			this.sortType = type
			this.refreshData()
		},
		handleMoreHot() {
			this.handleSort('hot')
		},
		refreshData() {
			this.isLoading = true
			this.page = 1
			this.loadMoreStatus = 'more'
			this.loadGoodsList()
			uni.stopPullDownRefresh()
		},
		handleRefresh() {
			this.refreshData()
		},
		loadMore() {
			if (this.loadMoreStatus !== 'more') return
			this.loadMoreStatus = 'loading'
			this.page++
			this.loadGoodsList()
		},
		loadGoodsList() {
			setTimeout(() => {
				this.loadMoreStatus = 'noMore'
				this.isLoading = false
			}, 1000)
		},
		handleSwipeClick(e, item) {
			if (e.index === 0) {
				this.toggleFavorite(item)
			}
		},
		handleAddToCart(item) {
			addToCart(item)
			uni.showToast({
				title: '已加入购物车',
				icon: 'success'
			})
		},
		handleBuyNow(item) {
			this.saveViewHistory(item)
			uni.navigateTo({
				url: `/pages/detail/detail?id=${item.id}`
			})
		},
		toggleFavorite(item) {
			toggleFav(item.id)
			const list = storage.getStorage(storage.STORAGE_KEYS.FAVORITE) || []
			uni.showToast({
				title: list.includes(item.id) ? '已收藏' : '已取消收藏',
				icon: 'none'
		saveViewHistory(item) {
			let viewHistory = storage.getStorage(storage.STORAGE_KEYS.VIEW_HISTORY) || []
			viewHistory = viewHistory.filter(viewItem => viewItem.goodsId !== item.id)
			viewHistory.unshift({
				goodsId: item.id,
				title: item.title,
				image: item.image,
				price: item.price,
				viewTime: Date.now()
			})
			viewHistory = viewHistory.slice(0, 50)
			storage.setStorage(storage.STORAGE_KEYS.VIEW_HISTORY, viewHistory)
		},
		goToDetail(id) {
			const item = this.goodsList.find(goods => goods.id === id)
			if (item) {
				this.saveViewHistory(item)
			}
			uni.navigateTo({
				url: `/pages/detail/detail?id=${id}`
			})
		},
		goToFAQ(question) {
			const id = parseInt(question.id)
			if (isNaN(id)) return
			uni.navigateTo({
				url: `/pages/faq/faq?id=${question.id}`
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

.banner-swiper {
	width: 100%;
	height: 350rpx;
	
	.banner-image {
		width: 100%;
		height: 100%;
	}
}

.search-container {
	background-color: #FFFFFF;
	padding: 20rpx;
}

.hot-search-tags {
	padding: 20rpx 0;
	
	.hot-search-title {
		font-size: 26rpx;
		color: #666666;
		margin-bottom: 15rpx;
		display: block;
	}
	
	.search-tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 15rpx;
		
		.search-tag {
			padding: 10rpx 20rpx;
			background-color: #F5F5F5;
			color: #666666;
			font-size: 24rpx;
			border-radius: 20rpx;
		}
	}
}

.category-container {
	background-color: #FFFFFF;
	padding: 20rpx 0;
	
	.category-scroll {
		white-space: nowrap;
		padding: 0 20rpx;
		
		.category-item {
			display: inline-flex;
			flex-direction: column;
			align-items: center;
			margin-right: 30rpx;
			transition: all 0.3s;
			
			&:last-child {
				margin-right: 0;
			}
			
			.category-icon {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				background-color: #F5F5F5;
				margin-bottom: 10rpx;
				transition: all 0.3s;
			}
			
			.category-name {
				font-size: 24rpx;
				color: #666666;
				transition: all 0.3s;
			}
			
			&.active {
				.category-icon {
					transform: scale(1.1);
					box-shadow: 0 4rpx 12rpx rgba(76, 175, 80, 0.3);
				}
				
				.category-name {
					color: #4CAF50;
					font-weight: bold;
				}
			}
		}
	}
}

.filter-container {
	display: flex;
	background-color: #FFFFFF;
	padding: 20rpx;
	margin-bottom: 20rpx;
	
	.filter-item {
		flex: 1;
		text-align: center;
		font-size: 26rpx;
		color: #666666;
		position: relative;
		
		&.active {
			color: #4CAF50;
			font-weight: bold;
			
			&::after {
				content: '';
				position: absolute;
				bottom: -20rpx;
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

.hot-section {
	background-color: #FFFFFF;
	padding: 20rpx;
	margin-bottom: 20rpx;
	
	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		
		.section-title {
			font-size: 30rpx;
			color: #333333;
			font-weight: bold;
		}
		
		.section-more {
			font-size: 24rpx;
			color: #999999;
		}
	}
	
	.hot-goods-scroll {
		white-space: nowrap;
		
		.hot-goods-item {
			display: inline-block;
			width: 280rpx;
			margin-right: 20rpx;
			position: relative;
			
			&:last-child {
				margin-right: 0;
			}
			
			.hot-goods-image {
				width: 280rpx;
				height: 280rpx;
				border-radius: 8rpx;
				background-color: #F5F5F5;
			}
			
			.hot-goods-info {
				margin-top: 10rpx;
				
				.hot-goods-title {
					font-size: 26rpx;
					color: #333333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				
				.hot-goods-meta {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 10rpx;
					
					.hot-price {
						font-size: 28rpx;
						color: #FF5722;
						font-weight: bold;
					}
					
					.hot-views {
						font-size: 22rpx;
						color: #999999;
					}
				}
			}
			
			.hot-tag {
				position: absolute;
				top: 10rpx;
				left: 10rpx;
				padding: 4rpx 12rpx;
				background-color: #FF5722;
				color: #FFFFFF;
				font-size: 20rpx;
				border-radius: 4rpx;
				font-weight: bold;
			}
		}
	}
}

.goods-list {
	background-color: #FFFFFF;
	padding: 0 20rpx;
	
	.loading-container {
		padding: 100rpx 0;
		text-align: center;
	}
	
	.empty-container {
		padding: 100rpx 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.empty-image {
			width: 200rpx;
			height: 200rpx;
			margin-bottom: 30rpx;
		}
		
		.empty-text {
			font-size: 28rpx;
			color: #999999;
			margin-bottom: 30rpx;
		}
		
		.empty-btn {
			width: 200rpx;
		}
	}
}

.goods-item {
	display: flex;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #EEEEEE;
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
			
			.new-tag {
				display: inline-block;
				padding: 2rpx 8rpx;
				background-color: #FF5722;
				color: #FFFFFF;
				font-size: 20rpx;
				border-radius: 4rpx;
				margin-right: 8rpx;
			}
			
			.hot-tag {
				display: inline-block;
				padding: 2rpx 8rpx;
				background-color: #FF9800;
				color: #FFFFFF;
				font-size: 20rpx;
				border-radius: 4rpx;
				margin-right: 8rpx;
			}
		}
		
		.goods-tags {
			margin-top: 10rpx;
			
			.tag {
				margin-right: 10rpx;
			}
		}
		
		.goods-price {
			margin-top: 10rpx;
			
			.price {
				font-size: 32rpx;
				color: #FF5722;
				font-weight: bold;
				margin-right: 10rpx;
			}
			
			.original-price {
				font-size: 24rpx;
				color: #999999;
				text-decoration: line-through;
			}
		}
		
		.goods-meta {
			font-size: 24rpx;
			color: #999999;
			margin-top: 10rpx;
			
			.divider {
				margin: 0 10rpx;
			}
			
			.stock {
				margin-left: 15rpx;
				color: #4CAF50;
			}
		}
	}
	
	.goods-actions {
		display: flex;
		gap: 10rpx;
		margin-top: 10rpx;
		
		.action-btn {
			flex: 1;
		}
	}
}

.faq-container {
	margin-top: 20rpx;
	background-color: #FFFFFF;
	padding: 20rpx;
	
	.faq-content {
		.faq-category {
			margin-bottom: 30rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
			
			.faq-category-title {
				font-size: 28rpx;
				color: #333333;
				font-weight: bold;
				margin-bottom: 20rpx;
			}
			
			.faq-question {
				font-size: 26rpx;
				color: #666666;
				padding: 15rpx 20rpx;
				background-color: #F5F5F5;
				border-radius: 8rpx;
				margin-bottom: 15rpx;
				
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
}
</style>
