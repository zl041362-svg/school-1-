<template>
	<view class="page">
		<view class="form-section card">
			<view class="form-item">
				<text class="form-label"><text class="required">*</text>商品标题</text>
				<input class="form-input" v-model="formData.title" placeholder="请输入商品标题" />
			</view>
			<view class="form-error" v-if="errors.title">{{ errors.title }}</view>
			<view class="form-item">
				<text class="form-label"><text class="required">*</text>商品分类</text>
				<picker mode="selector" :range="categories" range-key="name" @change="handleCategoryChange">
					<view class="picker-value" :class="{ placeholder: !formData.categoryName }">{{ formData.categoryName || '请选择分类' }}</view>
				</picker>
			</view>
			<view class="form-error" v-if="errors.category">{{ errors.category }}</view>
			<view class="form-item">
				<text class="form-label"><text class="required">*</text>商品价格</text>
				<input class="form-input" v-model="formData.price" type="digit" placeholder="请输入价格" />
			</view>
			<view class="form-error" v-if="errors.price">{{ errors.price }}</view>
			<view class="form-item">
				<text class="form-label">原价</text>
				<input class="form-input" v-model="formData.originalPrice" type="digit" placeholder="请输入原价" />
			</view>
			<view class="form-item">
				<text class="form-label">库存数量</text>
				<input class="form-input" v-model="formData.stock" type="number" placeholder="请输入库存数量" />
			</view>
			<view class="form-item">
				<text class="form-label">商品成色</text>
				<picker mode="selector" :range="conditions" @change="handleConditionChange">
					<view class="picker-value">{{ formData.condition || '请选择成色' }}</view>
				</picker>
			</view>
			<view class="form-item">
				<text class="form-label">发货方式</text>
				<picker mode="selector" :range="deliveries" @change="handleDeliveryChange">
					<view class="picker-value">{{ formData.delivery || '请选择发货方式' }}</view>
				</picker>
			</view>
		</view>
		
		<view class="upload-section card">
			<view class="section-title">商品图片</view>
			<view class="upload-list">
				<view class="upload-item" v-for="(item, index) in formData.images" :key="index">
					<image lazy-load class="upload-image" :src="item" mode="aspectFill"></image>
					<view class="delete-btn" @click="removeImage(index)">
						<uni-icons type="close" size="20" color="#FFFFFF"></uni-icons>
					</view>
				</view>
				<view class="upload-btn" @click="chooseImage" v-if="formData.images.length < 9">
					<uni-icons type="camera" size="40" color="#CCCCCC"></uni-icons>
					<text class="upload-text">上传图片</text>
				</view>
			</view>
		</view>
		
		<view class="description-section card">
			<view class="section-title">商品描述</view>
			<textarea
				class="description-input"
				v-model="formData.description"
				placeholder="请详细描述商品的品牌、型号、购买时间、使用情况等"
				maxlength="500"
			></textarea>
			<view class="char-count">{{ formData.description.length }}/500</view>
		</view>
		
		<view class="submit-section">
			<button class="submit-btn btn btn-primary btn-lg" @click="handleSubmit">{{ isEditMode ? '保存修改' : '发布商品' }}</button>
		</view>
	</view>
</template>

<script>
import { mockCategories, mockGoodsList } from '@/mock/index.js'
import storage from '@/utils/storage.js'

export default {
	data() {
		return {
			isEditMode: false,
			editId: null,
			categories: mockCategories.slice(1),
			conditions: ['全新', '九五成新', '九成新', '八五成新', '八成新', '七成新', '六成新及以下'],
			deliveries: ['自提', '快递', '自提或快递'],
			errors: {},
			formData: {
				title: '',
				categoryId: '',
				categoryName: '',
				price: '',
				originalPrice: '',
				stock: 1,
				condition: '',
				delivery: '',
				images: [],
				description: ''
			}
		}
	},
	onLoad(options) {
		if (options.id && options.mode === 'edit') {
			this.isEditMode = true
			this.editId = parseInt(options.id)
			this.loadGoodsData()
		}
	},
	methods: {
		loadGoodsData() {
			const goods = mockGoodsList.find(item => item.id === this.editId)
			if (goods) {
				this.formData = {
					title: goods.title,
					categoryId: goods.categoryId,
					categoryName: this.getCategoryName(goods.categoryId),
					price: goods.price.toString(),
					originalPrice: goods.originalPrice ? goods.originalPrice.toString() : '',
					stock: goods.stock || 1,
					condition: goods.condition,
					delivery: goods.delivery,
					images: goods.image ? [goods.image] : [],
					description: goods.description || ''
				}
			}
		},
		getCategoryName(categoryId) {
			const category = this.categories.find(c => c.id === categoryId)
			return category ? category.name : ''
		},
		handleCategoryChange(e) {
			const index = e.detail.value
			this.formData.categoryId = this.categories[index].id
			this.formData.categoryName = this.categories[index].name
		},
		handleConditionChange(e) {
			this.formData.condition = this.conditions[e.detail.value]
		},
		handleDeliveryChange(e) {
			this.formData.delivery = this.deliveries[e.detail.value]
		},
		chooseImage() {
			uni.chooseImage({
				count: 9 - this.formData.images.length,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					this.formData.images = [...this.formData.images, ...res.tempFilePaths]
				}
			})
		},
		removeImage(index) {
			this.formData.images.splice(index, 1)
		},
		handleSubmit() {
			this.errors = {}
			let valid = true
			
			if (!this.formData.title.trim()) {
				this.errors.title = '请输入商品标题'
				valid = false
			}
			if (!this.formData.categoryId) {
				this.errors.category = '请选择商品分类'
				valid = false
			}
			if (!this.formData.price || parseFloat(this.formData.price) <= 0) {
				this.errors.price = '请输入有效价格'
				valid = false
			}
			if (!this.formData.condition) {
				uni.showToast({ title: '请选择商品成色', icon: 'none' })
				valid = false
			}
			if (!this.formData.delivery) {
				uni.showToast({ title: '请选择发货方式', icon: 'none' })
				valid = false
			}
			if (this.formData.images.length === 0) {
				uni.showToast({ title: '请上传商品图片', icon: 'none' })
				valid = false
			}
			if (!valid) return
			if (!valid) return
			
			if (!this.formData.description.trim()) {
				uni.showToast({
					title: '请输入商品描述',
					icon: 'none'
				})
				return
			}
			
			uni.showLoading({
				title: this.isEditMode ? '保存中...' : '发布中...'
			})
			
			setTimeout(() => {
				uni.hideLoading()
				
				const goodsData = {
					id: this.isEditMode ? this.editId : Date.now(),
					title: this.formData.title,
					price: parseFloat(this.formData.price),
					originalPrice: this.formData.originalPrice ? parseFloat(this.formData.originalPrice) : 0,
					stock: parseInt(this.formData.stock),
					categoryId: this.formData.categoryId,
					condition: this.formData.condition,
					delivery: this.formData.delivery,
					image: this.formData.images[0],
					description: this.formData.description,
					seller: {
						id: 1,
						nickname: '小明同学',
						avatar: '/static/logo.png',
						credit: 5,
						soldCount: 12
					},
					viewCount: 0,
					likeCount: 0,
					isNew: !this.isEditMode,
					publishTime: Date.now()
				}
				
				let userGoodsList = storage.getStorage(storage.STORAGE_KEYS.GOODS_LIST) || []
				
				if (this.isEditMode) {
					const index = userGoodsList.findIndex(item => item.id === this.editId)
					if (index !== -1) {
						userGoodsList[index] = { ...userGoodsList[index], ...goodsData }
					}
				} else {
					userGoodsList.unshift(goodsData)
				}
				
				storage.setStorage(storage.STORAGE_KEYS.GOODS_LIST, userGoodsList)
				
				uni.showToast({
					title: this.isEditMode ? '保存成功' : '发布成功',
					icon: 'success'
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1500)
			}, 1500)
		}
	}
}
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background-color: #F5F5F5;
	padding: 20rpx;
		padding-bottom: calc(120rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
}

.form-section {
	margin-bottom: 20rpx;
	
	.form-item {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #EEEEEE;
		
		&:last-child {
			border-bottom: none;
		}
		
		.form-label {
			width: 150rpx;
			font-size: 28rpx;
			color: #333333;
		}
		
		.form-input {
			flex: 1;
			font-size: 28rpx;
			color: #333333;
		}
		
		.picker-value {
			flex: 1;
			font-size: 28rpx;
			color: #333333;
			
			&.placeholder {
				color: #CCCCCC;
			}
		}
	}
	
	.form-error {
		font-size: 22rpx;
		color: #F44336;
		padding: 0 0 10rpx 150rpx;
	}
	
	.required {
		color: #F44336;
		margin-right: 4rpx;
	}
}

.upload-section {
	margin-bottom: 20rpx;
	
	.section-title {
		font-size: 28rpx;
		color: #333333;
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	
	.upload-list {
		display: flex;
		flex-wrap: wrap;
		margin: -10rpx;
		
		.upload-item {
			width: calc(33.33% - 20rpx);
			height: 200rpx;
			margin: 10rpx;
			position: relative;
			
			.upload-image {
				width: 100%;
				height: 100%;
				border-radius: 8rpx;
			}
			
		.delete-btn {
			position: absolute;
			top: -10rpx;
			right: -10rpx;
			width: 56rpx;
			height: 56rpx;
				background-color: rgba(0, 0, 0, 0.6);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		
		.upload-btn {
			width: calc(33.33% - 20rpx);
			height: 200rpx;
			margin: 10rpx;
			border: 2rpx dashed #DDDDDD;
			border-radius: 8rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background-color: #F8F8F8;
			
			.upload-text {
				font-size: 24rpx;
				color: #CCCCCC;
				margin-top: 10rpx;
			}
		}
	}
}

.description-section {
	margin-bottom: 20rpx;
	
	.section-title {
		font-size: 28rpx;
		color: #333333;
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	
	.description-input {
		width: 100%;
		min-height: 300rpx;
		font-size: 28rpx;
		color: #333333;
		line-height: 1.6;
	}
	
	.char-count {
		text-align: right;
		font-size: 24rpx;
		color: #999999;
		margin-top: 10rpx;
	}
}

.submit-section {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #FFFFFF;
	padding: 20rpx;
	padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
	padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
	box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
	
	.submit-btn {
		width: 100%;
		border-radius: 40rpx;
	}
}
</style>
