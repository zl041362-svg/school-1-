<template>
	<view class="page">
		<view class="cart-list">
			<view class="cart-item card" v-for="item in cartList" :key="item.id" :class="{ invalid: item.invalid }">
				<view class="item-left">
					<checkbox
						:checked="item.selected"
						@click="toggleSelect(item)"
						color="#4CAF50"
						:disabled="item.invalid"
					></checkbox>
					<image lazy-load class="goods-image" :src="item.image" mode="aspectFill" @click="goToDetail(item.goodsId)"></image>
				</view>
				<view class="item-right">
					<view class="goods-title" @click="goToDetail(item.goodsId)">{{ item.title }}</view>
					<view class="goods-tags" v-if="item.invalid">
						<text class="tag tag-danger">{{ item.invalidReason }}</text>
					</view>
					<view class="goods-bottom">
						<text class="goods-price">¥{{ item.price.toFixed(2) }}</text>
						<view class="quantity-control" v-if="!item.invalid">
							<button class="quantity-btn" @click="changeQuantity(item, -1)" :disabled="item.quantity <= 1">-</button>
							<text class="quantity">{{ item.quantity }}</text>
							<button class="quantity-btn" @click="changeQuantity(item, 1)">+</button>
						</view>
					</view>
					<view class="item-actions">
						<view class="action-item" @click="handleMoveToFavorite(item)">
							<uni-icons type="heart" size="16" color="#FF5722"></uni-icons>
							<text class="action-text">移入收藏</text>
						</view>
						<view class="action-item" @click="handleDelete(item)">
							<uni-icons type="trash" size="16" color="#999999"></uni-icons>
							<text class="action-text">删除</text>
						</view>
					</view>
				</view>
			</view>
			
			<view v-if="cartList.length === 0" class="empty-state">
				<text class="empty-icon">🛒</text>
				<text class="empty-text">购物车空空如也，快去选购吧</text>
				<button class="btn btn-primary mt-20" @click="goToIndex">去逛逛</button>
			</view>
			
			<view v-if="recommendList.length > 0 && cartList.length === 0" class="recommend-section">
				<view class="section-title">猜你喜欢</view>
				<scroll-view class="recommend-scroll" scroll-x :bounces="false">
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
				</scroll-view>
			</view>
		</view>
		
		<view class="bottom-bar" v-if="cartList.length > 0">
			<view class="bar-left">
				<checkbox
					:checked="allSelected"
					@click="toggleSelectAll"
					color="#4CAF50"
				></checkbox>
				<text class="select-text">全选</text>
				<button class="delete-btn btn btn-sm btn-outline" @click="handleBatchDelete" v-if="hasSelected">
					删除
				</button>
			</view>
			<view class="bar-right">
				<view class="price-detail" @click="openPriceDetail">
					<text class="total-label">合计：</text>
					<text class="total-price">¥{{ totalPrice.toFixed(2) }}</text>
					<uni-icons type="info" size="16" color="#999999"></uni-icons>
				</view>
				<button class="checkout-btn btn btn-primary" @click="handleCheckout" :disabled="selectedCount === 0">
					结算({{ selectedCount }})
				</button>
			</view>
		</view>
		
		<uni-popup ref="couponPopup" type="bottom">
			<view class="coupon-popup">
				<view class="popup-header">
					<text class="popup-title">选择优惠券</text>
					<uni-icons type="close" size="20" color="#999999" @click="closeCouponPopup"></uni-icons>
				</view>
				<scroll-view class="coupon-list" scroll-y :bounces="false">
					<view
						class="coupon-item"
						v-for="coupon in availableCoupons"
						:key="coupon.id"
						:class="{ selected: selectedCoupon && selectedCoupon.id === coupon.id }"
						@click="selectCoupon(coupon)"
					>
						<view class="coupon-left">
							<view class="coupon-amount">
								<text class="amount-symbol">¥</text>
								<text class="amount-value">{{ coupon.amount }}</text>
							</view>
							<view class="coupon-condition">满{{ coupon.condition }}可用</view>
						</view>
						<view class="coupon-right">
							<view class="coupon-name">{{ coupon.name }}</view>
							<view class="coupon-time">{{ coupon.expireTime }}到期</view>
						</view>
					</view>
					<view v-if="availableCoupons.length === 0" class="coupon-empty">
						<text class="empty-text">暂无可用优惠券</text>
					</view>
				</scroll-view>
				<view class="popup-footer">
					<button class="confirm-btn btn btn-primary" @click="confirmCoupon">确定</button>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="priceDetailPopup" type="center">
			<view class="price-detail-popup">
				<view class="popup-header">
					<text class="popup-title">价格明细</text>
					<uni-icons type="close" size="20" color="#999999" @click="closePriceDetail"></uni-icons>
				</view>
				<view class="detail-list">
					<view class="detail-item">
						<text class="detail-label">商品总额</text>
						<text class="detail-value">¥{{ goodsTotal.toFixed(2) }}</text>
					</view>
					<view class="detail-item" v-if="selectedCoupon">
						<text class="detail-label">优惠券</text>
						<text class="detail-value discount">-¥{{ selectedCoupon.amount.toFixed(2) }}</text>
					</view>
					<view class="detail-item">
						<text class="detail-label">运费</text>
						<text class="detail-value">¥{{ shippingFee.toFixed(2) }}</text>
					</view>
					<view class="detail-divider"></view>
					<view class="detail-item total">
						<text class="detail-label">实付金额</text>
						<text class="detail-value total-price">¥{{ totalPrice.toFixed(2) }}</text>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { mockCartList, mockGoodsList } from '@/mock/index.js'
import storage from '@/utils/storage.js'
import { createOrder } from '@/utils/order.js'

export default {
	data() {
		return {
			cartList: [],
			recommendList: [],
			availableCoupons: [],
			selectedCoupon: null,
			shippingFee: 0
		}
	},
	computed: {
		allSelected() {
			const validItems = this.cartList.filter(item => !item.invalid)
			return validItems.length > 0 && validItems.every(item => item.selected)
		},
		hasSelected() {
			return this.cartList.some(item => item.selected)
		},
		selectedCount() {
			return this.cartList.filter(item => item.selected && !item.invalid).length
		},
		goodsTotal() {
			return this.cartList.reduce((total, item) => {
				return total + (item.selected && !item.invalid ? item.price * item.quantity : 0)
			}, 0)
		},
		totalPrice() {
			let total = this.goodsTotal + this.shippingFee
			if (this.selectedCoupon) {
				total -= this.selectedCoupon.amount
			}
			return Math.max(0, total)
		}
	},
	onLoad() {
		this.loadCartList()
		this.loadRecommendList()
		this.loadCoupons()
	},
	onShow() {
		this.loadCartList()
	},
	methods: {
		loadCartList() {
			const savedCart = storage.getStorage(storage.STORAGE_KEYS.CART)
			this.cartList = savedCart || mockCartList
			this.checkInvalidItems()
		},
		saveCartList() {
			storage.setStorage(storage.STORAGE_KEYS.CART, this.cartList)
		},
		checkInvalidItems() {
			this.cartList.forEach(item => {
				const goods = mockGoodsList.find(g => g.id === item.goodsId)
				if (!goods) {
					item.invalid = true
					item.invalidReason = '商品已下架'
				} else if (goods.stock === 0) {
					item.invalid = true
					item.invalidReason = '库存不足'
				} else if (goods.stock < item.quantity) {
					item.invalid = true
					item.invalidReason = `库存不足，仅剩${goods.stock}件`
				} else {
					item.invalid = false
					item.invalidReason = ''
				}
			})
		},
		loadRecommendList() {
			this.recommendList = mockGoodsList.slice(0, 6)
		},
		loadCoupons() {
			this.availableCoupons = [
				{
					id: 1,
					name: '新人专享券',
					amount: 10,
					condition: 50,
					expireTime: '2024-12-31'
				},
				{
					id: 2,
					name: '满减券',
					amount: 20,
					condition: 100,
					expireTime: '2024-12-31'
				}
			]
		},
		toggleSelect(item) {
			if (item.invalid) return
			item.selected = !item.selected
			this.saveCartList()
		},
		toggleSelectAll() {
			const selected = !this.allSelected
			this.cartList.forEach(item => {
				if (!item.invalid) {
					item.selected = selected
				}
			})
			this.saveCartList()
		},
		changeQuantity(item, delta) {
			item.quantity += delta
			if (item.quantity < 1) {
				item.quantity = 1
			}
			this.saveCartList()
		},
		handleDelete(item) {
			uni.showModal({
				title: '提示',
				content: '确定要删除该商品吗？',
				success: (res) => {
					if (res.confirm) {
						this.cartList = this.cartList.filter(cartItem => cartItem.id !== item.id)
						this.saveCartList()
						uni.showToast({
							title: '删除成功',
							icon: 'success'
						})
					}
				}
			})
		},
		handleBatchDelete() {
			const selectedItems = this.cartList.filter(item => item.selected)
			if (selectedItems.length === 0) return
			
			uni.showModal({
				title: '提示',
				content: `确定要删除选中的${selectedItems.length}件商品吗？`,
				success: (res) => {
					if (res.confirm) {
						this.cartList = this.cartList.filter(item => !item.selected)
						this.saveCartList()
						uni.showToast({
							title: '删除成功',
							icon: 'success'
						})
					}
				}
			})
		},
		handleMoveToFavorite(item) {
			let favoriteList = storage.getStorage(storage.STORAGE_KEYS.FAVORITE) || []
			if (favoriteList.includes(item.goodsId)) {
				uni.showToast({
					title: '已收藏',
					icon: 'none'
				})
				return
			}
			
			favoriteList.push(item.goodsId)
			storage.setStorage(storage.STORAGE_KEYS.FAVORITE, favoriteList)
			
			this.cartList = this.cartList.filter(cartItem => cartItem.id !== item.id)
			this.saveCartList()
			
			uni.showToast({
				title: '已移入收藏',
				icon: 'success'
			})
		},
		handleCheckout() {
			const selectedItems = this.cartList.filter(item => item.selected && !item.invalid)
			if (selectedItems.length === 0) {
				uni.showToast({ title: '请选择要结算的商品', icon: 'none' })
				return
			}
			const hasInvalid = this.cartList.some(item => item.selected && item.invalid)
			if (hasInvalid) {
				uni.showToast({ title: '请先移除失效商品', icon: 'none' })
				return
			}
			uni.showModal({
				title: '确认下单',
				content: `共 ${selectedItems.length} 件商品，合计 ¥${this.totalPrice.toFixed(2)}，确认下单吗？`,
				success: (res) => {
					if (res.confirm) {
						createOrder(selectedItems)
						this.cartList = this.cartList.filter(item => !item.selected)
						this.saveCartList()
						uni.showToast({ title: '下单成功', icon: 'success' })
						setTimeout(() => {
							uni.switchTab({ url: '/pages/trade/trade' })
						}, 1500)
					}
				}
			})
		},
		selectCoupon(coupon) {
			this.selectedCoupon = coupon
		},
		confirmCoupon() {
			this.$refs.couponPopup.close()
		},
		closeCouponPopup() {
			this.$refs.couponPopup.close()
		},
		openPriceDetail() {
			this.$refs.priceDetailPopup.open()
		},
		closePriceDetail() {
			this.$refs.priceDetailPopup.close()
		},
		goToDetail(goodsId) {
			uni.navigateTo({
				url: `/pages/detail/detail?id=${goodsId}`
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
		padding-bottom: calc(120rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
}

.cart-list {
	padding: 20rpx;
}

.cart-item {
	display: flex;
	margin-bottom: 20rpx;
	
	&.invalid {
		opacity: 0.6;
	}
	
	.item-left {
		display: flex;
		align-items: center;
		margin-right: 20rpx;
		
		.goods-image {
			width: 160rpx;
			height: 160rpx;
			border-radius: 8rpx;
			margin-left: 20rpx;
			background-color: #F5F5F5;
		}
	}
	
	.item-right {
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
			margin: 10rpx 0;
		}
		
		.goods-bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.goods-price {
				font-size: 32rpx;
				color: #FF5722;
				font-weight: bold;
			}
			
			.quantity-control {
				display: flex;
				align-items: center;
				
				.quantity-btn {
					width: 72rpx;
					height: 72rpx;
					padding: 0;
					font-size: 28rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #F5F5F5;
					border: none;
					border-radius: 4rpx;
				}
				
				.quantity {
					width: 60rpx;
					text-align: center;
					font-size: 28rpx;
					color: #333333;
				}
			}
		}
		
		.item-actions {
			display: flex;
			justify-content: flex-end;
			margin-top: 10rpx;
			
			.action-item {
				display: flex;
				align-items: center;
				margin-left: 30rpx;
				padding: 10rpx 0;
				min-height: 72rpx;
				
				&:active {
					opacity: 0.7;
				}
				
				.action-text {
					font-size: 24rpx;
					color: #666666;
					margin-left: 6rpx;
				}
			}
		}
	}
}

.recommend-section {
	margin-top: 40rpx;
	
	.section-title {
		font-size: 28rpx;
		color: #333333;
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	
	.recommend-scroll {
		white-space: nowrap;
	}
	
	.recommend-list {
		display: inline-flex;
		padding: 0 10rpx;
	}
	
	.recommend-item {
		width: 240rpx;
		margin-right: 20rpx;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		overflow: hidden;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
		
		&:active {
			opacity: 0.85;
		}
		
		&:last-child {
			margin-right: 0;
		}
		
		.recommend-image {
			width: 100%;
			height: 240rpx;
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

.bottom-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #FFFFFF;
	padding: 20rpx;
	padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
	padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
	box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
	
	.bar-left {
		display: flex;
		align-items: center;
		
		.select-text {
			font-size: 28rpx;
			color: #333333;
			margin-left: 10rpx;
		}
		
		.delete-btn {
			margin-left: 20rpx;
		}
	}
	
	.bar-right {
		display: flex;
		align-items: center;
		
		.price-detail {
			display: flex;
			align-items: center;
			margin-right: 20rpx;
			
			.total-label {
				font-size: 28rpx;
				color: #666666;
			}
			
			.total-price {
				font-size: 36rpx;
				color: #FF5722;
				font-weight: bold;
			}
		}
		
		.checkout-btn {
			padding: 16rpx 40rpx;
			font-size: 28rpx;
			border-radius: 40rpx;
		}
	}
}

.coupon-popup {
	background-color: #FFFFFF;
	border-radius: 20rpx 20rpx 0 0;
	max-height: 70vh;
	
	.popup-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		border-bottom: 1rpx solid #EEEEEE;
		
		.popup-title {
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
		}
	}
	
	.coupon-list {
		max-height: 50vh;
		padding: 20rpx;
		
		.coupon-item {
			display: flex;
			padding: 20rpx;
			background: linear-gradient(135deg, #FF9800 0%, #FFB74D 100%);
			border-radius: 12rpx;
			margin-bottom: 20rpx;
			
			&:active {
				opacity: 0.85;
			}
			
			&.selected {
				border: 2rpx solid #4CAF50;
			}
			
			.coupon-left {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 20rpx;
				border-right: 2rpx dashed rgba(255, 255, 255, 0.5);
				
				.coupon-amount {
					display: flex;
					align-items: baseline;
					
					.amount-symbol {
						font-size: 28rpx;
						color: #FFFFFF;
					}
					
					.amount-value {
						font-size: 48rpx;
						color: #FFFFFF;
						font-weight: bold;
					}
				}
				
			.coupon-condition {
				font-size: 24rpx;
				color: rgba(255, 255, 255, 0.9);
				margin-top: 8rpx;
			}
			}
			
			.coupon-right {
				flex: 1;
				padding: 20rpx;
				
				.coupon-name {
					font-size: 28rpx;
					color: #FFFFFF;
					font-weight: bold;
					margin-bottom: 8rpx;
				}
				
			.coupon-time {
				font-size: 24rpx;
				color: rgba(255, 255, 255, 0.8);
			}
			}
		}
		
		.coupon-empty {
			text-align: center;
			padding: 100rpx 0;
			
			.empty-text {
				font-size: 28rpx;
				color: #999999;
			}
		}
	}
	
	.popup-footer {
		padding: 20rpx;
		border-top: 1rpx solid #EEEEEE;
		
		.confirm-btn {
			width: 100%;
			border-radius: 40rpx;
		}
	}
}

.price-detail-popup {
	background-color: #FFFFFF;
	border-radius: 16rpx;
	width: 600rpx;
	
	.popup-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		border-bottom: 1rpx solid #EEEEEE;
		
		.popup-title {
			font-size: 32rpx;
			color: #333333;
			font-weight: bold;
		}
	}
	
	.detail-list {
		padding: 30rpx;
		
		.detail-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			
			&.total {
				margin-top: 20rpx;
				padding-top: 20rpx;
				border-top: 1rpx solid #EEEEEE;
			}
			
			.detail-label {
				font-size: 28rpx;
				color: #666666;
			}
			
			.detail-value {
				font-size: 28rpx;
				color: #333333;
				
				&.discount {
					color: #FF5722;
				}
				
				&.total-price {
					font-size: 36rpx;
					color: #FF5722;
					font-weight: bold;
				}
			}
		}
		
		.detail-divider {
			height: 1rpx;
			background-color: #EEEEEE;
			margin: 20rpx 0;
		}
	}
}
</style>
