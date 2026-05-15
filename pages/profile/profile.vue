<template>
	<view class="page">
		<view class="avatar-section">
			<view class="avatar-wrapper" @click="chooseAvatar">
				<image class="avatar" :src="formData.avatar" mode="aspectFill"></image>
				<view class="avatar-tip">点击更换</view>
			</view>
		</view>
		
		<view class="form-section card">
			<view class="form-item">
				<text class="form-label">昵称</text>
				<input class="form-input" v-model="formData.nickname" placeholder="请输入昵称" />
			</view>
			<view class="form-item">
				<text class="form-label">手机号</text>
				<input class="form-input" v-model="formData.phone" type="number" placeholder="请输入手机号" disabled />
			</view>
			<view class="form-item">
				<text class="form-label">性别</text>
				<picker mode="selector" :range="genders" @change="handleGenderChange">
					<view class="picker-value">{{ formData.gender || '请选择性别' }}</view>
				</picker>
			</view>
			<view class="form-item">
				<text class="form-label">个性签名</text>
				<input class="form-input" v-model="formData.signature" placeholder="请输入个性签名" />
			</view>
		</view>
		
		<view class="submit-section">
			<button class="submit-btn btn btn-primary btn-lg" @click="handleSubmit">保存</button>
		</view>
	</view>
</template>

<script>
import { mockUserInfo } from '@/mock/index.js'
import storage from '@/utils/storage.js'

export default {
	data() {
		return {
			genders: ['男', '女', '保密'],
			formData: {
				avatar: '',
				nickname: '',
				phone: '',
				gender: '',
				signature: ''
			}
		}
	},
	onLoad() {
		this.loadUserInfo()
	},
	methods: {
		loadUserInfo() {
			this.formData = {
				avatar: mockUserInfo.avatar,
				nickname: mockUserInfo.nickname,
				phone: '138****8888',
				gender: '保密',
				signature: ''
			}
		},
		chooseAvatar() {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					this.formData.avatar = res.tempFilePaths[0]
				}
			})
		},
		handleGenderChange(e) {
			this.formData.gender = this.genders[e.detail.value]
		},
		handleSubmit() {
			if (!this.formData.nickname.trim()) {
				uni.showToast({
					title: '请输入昵称',
					icon: 'none'
				})
				return
			}
			
			uni.showLoading({
				title: '保存中...'
			})
			
			setTimeout(() => {
				storage.setStorage(storage.STORAGE_KEYS.USER_INFO, this.formData)
				uni.hideLoading()
				uni.showToast({
					title: '保存成功',
					icon: 'success'
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1500)
			}, 1000)
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

.avatar-section {
	display: flex;
	justify-content: center;
	padding: 40rpx 0;
	
	.avatar-wrapper {
		position: relative;
		
		.avatar {
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			border: 4rpx solid #FFFFFF;
			box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
		}
		
		.avatar-tip {
			position: absolute;
			bottom: -10rpx;
			left: 50%;
			transform: translateX(-50%);
			background-color: rgba(0, 0, 0, 0.6);
			color: #FFFFFF;
			font-size: 20rpx;
			padding: 4rpx 12rpx;
			border-radius: 20rpx;
			white-space: nowrap;
		}
	}
}

.form-section {
	margin-bottom: 20rpx;
	
	.form-item {
		display: flex;
		align-items: center;
		padding: 25rpx 0;
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
		}
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
