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
						<text class="auth-status" :class="authStatusClass">{{ authStatusText }}</text>
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
				<view class="setting-item" @click="openFeedbackForm">
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
		
		<!-- 校园认证弹窗 -->
		<view class="form-overlay" v-if="showAuthForm" @click="closeAuthForm">
			<view class="form-card" @click.stop>
				<view class="form-header">
					<text class="form-title">校园认证</text>
					<text class="form-subtitle">请上传学生证或校园卡照片完成认证</text>
					<uni-icons type="close" size="20" color="#999" @click="closeAuthForm"></uni-icons>
				</view>
				<view class="form-body">
					<view class="form-item">
						<text class="form-label">真实姓名</text>
						<input class="form-input" v-model="authForm.name" placeholder="请输入真实姓名" />
					</view>
					<view class="form-item">
						<text class="form-label">学号</text>
						<input class="form-input" v-model="authForm.studentId" type="text" placeholder="请输入学号" />
					</view>
					<view class="form-item column">
						<text class="form-label">证件照片</text>
						<view class="upload-area" @click="chooseAuthImage">
							<image lazy-load v-if="authForm.idCardImage" class="upload-preview" :src="authForm.idCardImage" mode="aspectFit"></image>
							<view v-else class="upload-placeholder">
								<uni-icons type="camera" size="48" color="#CCCCCC"></uni-icons>
								<text class="upload-text">点击上传学生证/校园卡</text>
							</view>
						</view>
					</view>
				</view>
				<view class="form-footer">
					<button class="btn btn-primary" @click="submitAuth" :disabled="submitting">提交认证</button>
				</view>
			</view>
		</view>
		
		<!-- 意见反馈弹窗 -->
		<view class="form-overlay" v-if="showFeedbackForm" @click="closeFeedbackForm">
			<view class="form-card" @click.stop>
				<view class="form-header">
					<text class="form-title">意见反馈</text>
					<uni-icons type="close" size="20" color="#999" @click="closeFeedbackForm"></uni-icons>
				</view>
				<view class="form-body">
					<view class="feedback-tags">
						<text 
							class="feedback-tag" 
							:class="{ active: feedbackForm.type === item }"
							v-for="item in feedbackTypes" 
							:key="item"
							@click="feedbackForm.type = item"
						>{{ item }}</text>
					</view>
					<view class="form-item">
						<textarea 
							class="feedback-textarea" 
							v-model="feedbackForm.content" 
							placeholder="请详细描述您遇到的问题或建议，我们会尽快处理..."
							maxlength="300"
						></textarea>
						<text class="char-count">{{ feedbackForm.content.length }}/300</text>
					</view>
				</view>
				<view class="form-footer">
					<button class="btn btn-primary" @click="submitFeedback">提交反馈</button>
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
			userInfo: { isAuth: false },
			settings: { messageEnabled: true, soundEnabled: true },
			cacheSize: '12.5MB',
			showAuthForm: false,
			showFeedbackForm: false,
			submitting: false,
			authForm: { name: '', studentId: '', idCardImage: '' },
			feedbackForm: { type: '功能建议', content: '' },
			feedbackTypes: ['功能建议', '问题反馈', '其他']
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
			uni.navigateTo({ url: '/pages/profile/profile' })
		},
		openAuthForm() {
			this.showAuthForm = true
		},
		closeAuthForm() {
			this.showAuthForm = false
		},
		handleCampusAuth() {
			if (this.userInfo.isAuth === true) {
				uni.showToast({ title: '您已通过校园认证', icon: 'none' })
				return
			}
			if (this.userInfo.isAuth === 'pending') {
				uni.showToast({ title: '认证审核中，请耐心等待', icon: 'none' })
				return
			}
			this.openAuthForm()
		},
		chooseAuthImage() {
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					this.authForm.idCardImage = res.tempFilePaths[0]
				}
			})
		},
		submitAuth() {
			if (!this.authForm.name.trim()) {
				uni.showToast({ title: '请输入真实姓名', icon: 'none' })
				return
			}
			if (!this.authForm.studentId.trim()) {
				uni.showToast({ title: '请输入学号', icon: 'none' })
				return
			}
			if (!this.authForm.idCardImage) {
				uni.showToast({ title: '请上传证件照片', icon: 'none' })
				return
			}
			this.submitting = true
			const userInfo = storage.getStorage(storage.STORAGE_KEYS.USER_INFO) || {}
			userInfo.isAuth = 'pending'
			userInfo.studentId = this.authForm.studentId
			userInfo.realName = this.authForm.name
			storage.setStorage(storage.STORAGE_KEYS.USER_INFO, userInfo)
			this.userInfo.isAuth = 'pending'
			setTimeout(() => {
				this.submitting = false
				this.closeAuthForm()
				uni.showToast({ title: '认证申请已提交', icon: 'success' })
			}, 800)
		},
		openFeedbackForm() {
			this.showFeedbackForm = true
		},
		closeFeedbackForm() {
			this.showFeedbackForm = false
		},
		submitFeedback() {
			if (!this.feedbackForm.content.trim()) {
				uni.showToast({ title: '请输入反馈内容', icon: 'none' })
				return
			}
			const feedbackList = storage.getStorage('feedback_list') || []
			feedbackList.unshift({
				id: Date.now(),
				type: this.feedbackForm.type,
				content: this.feedbackForm.content.trim(),
				time: Date.now()
			})
			storage.setStorage('feedback_list', feedbackList)
			this.feedbackForm.content = ''
			this.feedbackForm.type = '功能建议'
			this.closeFeedbackForm()
			uni.showToast({ title: '感谢您的反馈', icon: 'success' })
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

/* 表单弹窗 */
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
		max-height: 85vh;
		overflow-y: auto;
		
		.form-header {
			position: relative;
			padding: 30rpx;
			border-bottom: 1rpx solid #EEEEEE;
			
			.form-title {
				display: block;
				font-size: 32rpx;
				color: #333333;
				font-weight: bold;
			}
			
			.form-subtitle {
				display: block;
				font-size: 24rpx;
				color: #999999;
				margin-top: 8rpx;
			}
			
			uni-icons {
				position: absolute;
				top: 30rpx;
				right: 30rpx;
			}
		}
		
		.form-body {
			padding: 20rpx 30rpx;
			
			.form-item {
				display: flex;
				align-items: center;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #F5F5F5;
				
				&.column {
					flex-direction: column;
					align-items: flex-start;
					
					.form-label {
						margin-bottom: 15rpx;
					}
				}
				
				.form-label {
					width: 140rpx;
					font-size: 28rpx;
					color: #333333;
					flex-shrink: 0;
				}
				
				.form-input {
					flex: 1;
					font-size: 28rpx;
					color: #333333;
				}
			}
			
			.upload-area {
				width: 100%;
				height: 260rpx;
				border: 2rpx dashed #DDDDDD;
				border-radius: 12rpx;
				overflow: hidden;
				
				.upload-preview {
					width: 100%;
					height: 100%;
				}
				
				.upload-placeholder {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					
					.upload-text {
						font-size: 24rpx;
						color: #999999;
						margin-top: 15rpx;
					}
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

/* 反馈标签 */
.feedback-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 15rpx;
	margin-bottom: 20rpx;
	
	.feedback-tag {
		padding: 12rpx 24rpx;
		font-size: 24rpx;
		color: #666666;
		background-color: #F5F5F5;
		border-radius: 20rpx;
		
		&.active {
			color: #4CAF50;
			background-color: rgba(76, 175, 80, 0.1);
		}
	}
}

.feedback-textarea {
	width: 100%;
	height: 200rpx;
	font-size: 28rpx;
	color: #333333;
	padding: 15rpx;
	background-color: #F5F5F5;
	border-radius: 8rpx;
}

.char-count {
	font-size: 22rpx;
	color: #999999;
	text-align: right;
	padding-top: 10rpx;
}
</style>
