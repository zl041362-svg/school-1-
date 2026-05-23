<template>
	<view class="page">
		<view class="address-list">
			<view class="address-item card" v-for="item in addressList" :key="item.id">
				<view class="address-header">
					<view class="user-info">
						<text class="name">{{ item.name }}</text>
						<text class="phone">{{ item.phone }}</text>
						<text class="default-tag" v-if="item.isDefault">默认</text>
					</view>
					<view class="address-actions">
						<uni-icons type="compose" size="20" color="#999999" @click="handleEdit(item)"></uni-icons>
						<uni-icons type="trash" size="20" color="#999999" @click="handleDelete(item.id)"></uni-icons>
					</view>
				</view>
				<view class="address-detail">{{ item.province }} {{ item.city }} {{ item.district }} {{ item.detail }}</view>
			</view>
			
			<view v-if="addressList.length === 0" class="empty-state">
				<text class="empty-icon">📍</text>
				<text class="empty-text">暂无收货地址，快去添加吧</text>
			</view>
		</view>
		
		<view class="add-btn-container">
			<button class="add-btn btn btn-primary btn-lg" @click="handleAdd">添加新地址</button>
		</view>
	</view>
</template>

<script>
import storage from '@/utils/storage.js'

export default {
	data() {
		return {
			addressList: []
		}
	},
	onLoad() {
		this.loadAddressList()
	},
	methods: {
		loadAddressList() {
			const saved = storage.getStorage(storage.STORAGE_KEYS.ADDRESS)
			if (saved && saved.length > 0) {
				this.addressList = saved
			} else {
				this.addressList = [
					{
						id: 1,
						name: '张三',
						phone: '138****8888',
						province: '北京市',
						city: '北京市',
						district: '海淀区',
						detail: '清华大学学生公寓1号楼101室',
						isDefault: true
					}
				]
			}
		},
		handleEdit(item) {
			uni.showToast({
				title: '功能开发中',
				icon: 'none'
			})
		},
		handleDelete(id) {
			uni.showModal({
				title: '提示',
				content: '确定要删除该地址吗？',
				success: (res) => {
					if (res.confirm) {
						this.addressList = this.addressList.filter(item => item.id !== id)
						storage.setStorage(storage.STORAGE_KEYS.ADDRESS, this.addressList)
						uni.showToast({
							title: '删除成功',
							icon: 'success'
						})
					}
				}
			})
		},
		handleAdd() {
			uni.showToast({
				title: '功能开发中',
				icon: 'none'
			})
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

.address-list {
	.address-item {
		margin-bottom: 20rpx;
		
		.address-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 15rpx;
			
			.user-info {
				display: flex;
				align-items: center;
				
				.name {
					font-size: 28rpx;
					color: #333333;
					font-weight: bold;
					margin-right: 15rpx;
				}
				
				.phone {
					font-size: 26rpx;
					color: #666666;
					margin-right: 15rpx;
				}
				
			.default-tag {
				padding: 2rpx 8rpx;
				background-color: #FF5722;
				color: #FFFFFF;
				font-size: 22rpx;
				border-radius: 4rpx;
			}
			}
			
			.address-actions {
				display: flex;
				
				uni-icons {
					margin-left: 20rpx;
				}
			}
		}
		
		.address-detail {
			font-size: 26rpx;
			color: #666666;
			line-height: 1.6;
		}
	}
}

.add-btn-container {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #FFFFFF;
	padding: 20rpx;
	padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
	padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
	box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
	
	.add-btn {
		width: 100%;
		border-radius: 40rpx;
	}
}
</style>
