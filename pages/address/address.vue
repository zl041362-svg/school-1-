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
		
		<view class="form-overlay" v-if="showForm" @click="closeForm">
			<view class="form-card" @click.stop>
				<view class="form-header">
					<text class="form-title">{{ isEditing ? '编辑地址' : '新增地址' }}</text>
					<uni-icons type="close" size="20" color="#999" @click="closeForm"></uni-icons>
				</view>
				<view class="form-body">
					<view class="form-item">
						<text class="form-label">收货人</text>
						<input class="form-input" v-model="formData.name" placeholder="请输入收货人姓名" />
					</view>
					<view class="form-item">
						<text class="form-label">手机号</text>
						<input class="form-input" v-model="formData.phone" type="number" placeholder="请输入手机号" />
					</view>
					<view class="form-item">
						<text class="form-label">省/市/区</text>
						<input class="form-input" v-model="formData.province" placeholder="省份" style="width:30%" />
						<input class="form-input" v-model="formData.city" placeholder="城市" style="width:30%;margin-left:10rpx" />
						<input class="form-input" v-model="formData.district" placeholder="区县" style="width:30%;margin-left:10rpx" />
					</view>
					<view class="form-item">
						<text class="form-label">详细地址</text>
						<input class="form-input" v-model="formData.detail" placeholder="街道/楼栋/门牌号" />
					</view>
					<view class="form-item">
						<text class="form-label">设为默认</text>
						<switch :checked="formData.isDefault" @change="e => formData.isDefault = e.detail.value" color="#4CAF50" />
					</view>
				</view>
				<view class="form-footer">
					<button class="btn btn-primary" @click="handleFormSubmit">保存</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import storage from '@/utils/storage.js'

export default {
	data() {
		return {
			addressList: [],
			showForm: false,
			isEditing: false,
			editId: null,
			formData: {
				name: '',
				phone: '',
				province: '',
				city: '',
				district: '',
				detail: '',
				isDefault: false
			}
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
		resetForm() {
			this.formData = { name: '', phone: '', province: '', city: '', district: '', detail: '', isDefault: false }
			this.editId = null
		},
		openForm(item) {
			if (item) {
				this.isEditing = true
				this.editId = item.id
				this.formData = { ...item }
			} else {
				this.isEditing = false
				this.resetForm()
			}
			this.showForm = true
		},
		closeForm() {
			this.showForm = false
		},
		handleEdit(item) {
			this.openForm(item)
		},
		handleAdd() {
			this.openForm(null)
		},
		handleFormSubmit() {
			if (!this.formData.name.trim()) {
				uni.showToast({ title: '请输入收货人姓名', icon: 'none' })
				return
			}
			if (!this.formData.phone.trim()) {
				uni.showToast({ title: '请输入手机号', icon: 'none' })
				return
			}
			if (this.formData.isDefault) {
				this.addressList.forEach(item => item.isDefault = false)
			}
			if (this.isEditing) {
				const index = this.addressList.findIndex(item => item.id === this.editId)
				if (index !== -1) {
					this.addressList[index] = { ...this.formData, id: this.editId }
				}
			} else {
				const newId = this.addressList.length > 0 ? Math.max(...this.addressList.map(a => a.id)) + 1 : 1
				this.addressList.unshift({ ...this.formData, id: newId })
			}
			storage.setStorage(storage.STORAGE_KEYS.ADDRESS, this.addressList)
			this.closeForm()
			uni.showToast({ title: this.isEditing ? '修改成功' : '添加成功', icon: 'success' })
		},
		handleDelete(id) {
			uni.showModal({
				title: '提示',
				content: '确定要删除该地址吗？',
				success: (res) => {
					if (res.confirm) {
						this.addressList = this.addressList.filter(item => item.id !== id)
						storage.setStorage(storage.STORAGE_KEYS.ADDRESS, this.addressList)
						uni.showToast({ title: '删除成功', icon: 'success' })
					}
				}
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

.form-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999;
	display: flex;
	align-items: flex-end;
	
	.form-card {
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 20rpx 20rpx 0 0;
		max-height: 80vh;
		overflow-y: auto;
		
		.form-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx;
			border-bottom: 1rpx solid #EEEEEE;
			
			.form-title {
				font-size: 32rpx;
				color: #333333;
				font-weight: bold;
			}
		}
		
		.form-body {
			padding: 20rpx 30rpx;
			
			.form-item {
				display: flex;
				align-items: center;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #F5F5F5;
				
				.form-label {
					width: 140rpx;
					font-size: 28rpx;
					color: #333333;
				}
				
				.form-input {
					flex: 1;
					font-size: 28rpx;
					color: #333333;
				}
			}
		}
		
		.form-footer {
			padding: 20rpx 30rpx;
			padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
			
			.btn {
				width: 100%;
				border-radius: 40rpx;
			}
		}
	}
}
</style>
