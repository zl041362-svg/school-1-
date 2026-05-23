<template>
	<view class="page">
		<view class="setting-list">
			<view class="setting-group">
				<view class="setting-item" @click="goToProfile">
					<text class="setting-label">编辑资料</text>
					<uni-icons type="right" size="16" color="#CCCCCC"></uni-icons>
				</view>
				<view class="setting-item" @click="handleCampusAuth">
					<text class="setting-label">校园认证</text>
					<view class="setting-value">
						<text class="auth-status" :class="authStatusClass">
							{{ authStatusText }}
						</text>
					</view>
					<uni-icons type="right" size="16" color="#CCCCCC"></uni-icons>
				</view>
			</view>
			
			<view class="setting-group">
				<view class="setting-item">
					<text class="setting-label">消息通知</text>
					<switch :checked="settings.messageEnabled" @change="handleMessageChange" color="#4CAF50"></switch>
				</view>
				<view class="setting-item">
					<text class="setting-label">声音提醒</text>
					<switch :checked="settings.soundEnabled" @change="handleSoundChange" color="#4CAF50"></switch>
				</view>
			</view>
			
			<view class="setting-group">
				<view class="setting-item" @click="handleClearCache">
					<text class="setting-label">清理缓存</text>
					<text class="setting-value">{{ cacheSize }}</text>
					<uni-icons type="right" size="16" color="#CCCCCC"></uni-icons>
				</view>
				<view class="setting-item" @click="handleAbout">
					<text class="setting-label">关于我们</text>
					<uni-icons type="right" size="16" color="#CCCCCC"></uni-icons>
				</view>
			</view>
			
			<view class="setting-group">
				<view class="setting-item" @click="handleFeedback">
					<text class="setting-label">意见反馈</text>
					<uni-icons type="right" size="16" color="#CCCCCC"></uni-icons>
				</view>
				<view class="setting-item" @click="handleContact">
					<text class="setting-label">联系客服</text>
					<uni-icons type="right" size="16" color="#CCCCCC"></uni-icons>
				</view>
			</view>
			
			<view class="setting-group">
				<view class="setting-item danger" @click="handleLogout">
					<text class="setting-label">退出登录</text>
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
			userInfo: {
				isAuth: false
			},
			settings: {
				messageEnabled: true,
				soundEnabled: true
			},
			cacheSize: '12.5MB'
		}
	},
	computed: {
		authStatusText() {
			if (this.userInfo.isAuth === true) return '已认证'
			if (this.userInfo.isAuth === 'pending') return '审核中'
			return '未认证'
		},
		authStatusClass() {
			if (this.userInfo.isAuth === true) return 'success'
			if (this.userInfo.isAuth === 'pending') return 'warning'
			return 'pending'
		}
	},
	onLoad() {
		this.loadUserInfo()
	},
	methods: {
		loadUserInfo() {
			const saved = storage.getStorage(storage.STORAGE_KEYS.USER_INFO)
			this.userInfo.isAuth = saved ? saved.isAuth || false : false
		},
		goToProfile() {
			uni.navigateTo({
				url: '/pages/profile/profile'
			})
		},
		handleCampusAuth() {
			uni.showModal({
				title: '校园认证',
				editable: true,
				placeholderText: '请输入学号',
				content: '请填写以下信息完成校园身份认证',
				success: (res) => {
					if (res.confirm && res.content) {
						const userInfo = storage.getStorage(storage.STORAGE_KEYS.USER_INFO) || {}
						userInfo.isAuth = 'pending'
						userInfo.studentId = res.content
						storage.setStorage(storage.STORAGE_KEYS.USER_INFO, userInfo)
						this.userInfo.isAuth = 'pending'
						uni.showToast({ title: '已提交认证申请', icon: 'success' })
					}
				}
			})
		},
		handleMessageChange(e) {
			this.settings.messageEnabled = e.detail.value
		},
		handleSoundChange(e) {
			this.settings.soundEnabled = e.detail.value
		},
		handleClearCache() {
			uni.showModal({
				title: '提示',
				content: '确定要清理缓存吗？',
				success: (res) => {
					if (res.confirm) {
						uni.showLoading({
							title: '清理中...'
						})
						setTimeout(() => {
							uni.hideLoading()
							this.cacheSize = '0KB'
							uni.showToast({
								title: '清理完成',
								icon: 'success'
							})
						}, 1000)
					}
				}
			})
		},
		handleAbout() {
			uni.showModal({
				title: '关于我们',
				content: '校园二手交易平台 v1.0.0\n为校园用户提供便捷的二手商品交易服务',
				showCancel: false
			})
		},
		handleFeedback() {
			uni.showModal({
				title: '意见反馈',
				editable: true,
				placeholderText: '请描述您遇到的问题或建议',
				success: (res) => {
					if (res.confirm && res.content && res.content.trim()) {
						const feedbackList = storage.getStorage('feedback_list') || []
						feedbackList.unshift({
							id: Date.now(),
							content: res.content.trim(),
							time: Date.now()
						})
						storage.setStorage('feedback_list', feedbackList)
						uni.showToast({ title: '感谢您的反馈', icon: 'success' })
					}
				}
			})
		},
		handleContact() {
			uni.showModal({
				title: '联系客服',
				content: '客服电话：400-123-4567\n工作时间：9:00-18:00',
				showCancel: false
			})
		},
		handleLogout() {
			uni.showModal({
				title: '提示',
				content: '确定要退出登录吗？',
				success: (res) => {
					if (res.confirm) {
						storage.removeStorage(storage.STORAGE_KEYS.TOKEN)
						storage.removeStorage(storage.STORAGE_KEYS.USER_INFO)
						storage.removeStorage(storage.STORAGE_KEYS.CART)
						storage.removeStorage(storage.STORAGE_KEYS.FAVORITE)
						storage.removeStorage(storage.STORAGE_KEYS.NOTICE_CLOSED)
						uni.showToast({
							title: '已退出登录',
							icon: 'success'
						})
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}, 1500)
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
}

.setting-list {
	padding: 20rpx;
}

.setting-group {
	background-color: #FFFFFF;
	border-radius: 16rpx;
	margin-bottom: 20rpx;
	overflow: hidden;
	
	.setting-item {
		display: flex;
		align-items: center;
		padding: 30rpx 20rpx;
		border-bottom: 1rpx solid #EEEEEE;
		
		&:active {
			background-color: #FAFAFA;
		}
		
		&:last-child {
			border-bottom: none;
		}
		
		&.danger {
			justify-content: center;
			
			.setting-label {
				color: #F44336;
			}
		}
		
		.setting-label {
			flex: 1;
			font-size: 28rpx;
			color: #333333;
		}
		
		.setting-value {
			margin-right: 10rpx;
			
			.auth-status {
				font-size: 24rpx;
				padding: 4rpx 12rpx;
				border-radius: 4rpx;
				
				&.success {
					color: #4CAF50;
					background-color: rgba(76, 175, 80, 0.1);
				}
				
			&.pending {
				color: #FF9800;
				background-color: rgba(255, 152, 0, 0.1);
			}
			
			&.warning {
				color: #FF9800;
				background-color: rgba(255, 152, 0, 0.1);
			}
		}
		}
	}
}
</style>
