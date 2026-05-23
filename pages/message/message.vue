<template>
	<view class="page">
		<view class="message-list">
			<view class="message-item card" v-for="item in messageList" :key="item.id">
				<view class="message-header">
					<view class="message-type" :class="'type-' + item.type">
						<uni-icons :type="getTypeIcon(item.type)" size="20" color="#FFFFFF"></uni-icons>
					</view>
					<view class="message-title">{{ item.title }}</view>
					<text class="message-time">{{ formatTime(item.time) }}</text>
				</view>
				<view class="message-content">{{ item.content }}</view>
				<view class="message-footer" v-if="item.action">
					<button class="action-btn btn btn-sm btn-outline" @click="handleAction(item)">
						{{ item.action }}
					</button>
				</view>
			</view>
			
			<view v-if="messageList.length === 0" class="empty-state">
				<text class="empty-icon">📬</text>
				<text class="empty-text">暂无消息</text>
			</view>
		</view>
	</view>
</template>

<script>
import common from '@/utils/common.js'

export default {
	data() {
		return {
			messageList: [
				{
					id: 1,
					type: 'order',
					title: '订单通知',
					content: '您购买的商品"MacBook Pro 2020款 M1芯片"已发货，请注意查收。',
					time: Date.now() - 3600000,
					action: '查看订单'
				},
				{
					id: 2,
					type: 'system',
					title: '系统通知',
					content: '您的商品"高等数学第七版"已成功发布，等待买家购买。',
					time: Date.now() - 86400000,
					action: null
				},
				{
					id: 3,
					type: 'chat',
					title: '私信消息',
					content: '小明同学：你好，请问这个台灯还在吗？',
					time: Date.now() - 172800000,
					action: '回复'
				}
			]
		}
	},
	methods: {
		getTypeIcon(type) {
			const iconMap = {
				order: 'notification',
				system: 'notification',
				chat: 'chatbubble'
			}
			return iconMap[type] || 'notification'
		},
		handleAction(item) {
			if (item.type === 'order') {
				uni.switchTab({
					url: '/pages/trade/trade'
				})
			} else if (item.type === 'chat') {
				uni.showModal({
					title: '回复消息',
					editable: true,
					placeholderText: '输入回复内容',
					content: item.content,
					success: (res) => {
						if (res.confirm && res.content) {
							uni.showToast({ title: '已回复', icon: 'success' })
						}
					}
				})
			} else {
				const messages = this.messageList.map(m =>
					m.id === item.id ? { ...m, read: true } : m
				)
				this.messageList = messages
				uni.showToast({ title: '已标记为已读', icon: 'none' })
			}
		},
		formatTime(timestamp) {
			return common.formatDate(timestamp, 'MM-DD HH:mm')
		}
	}
}
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background-color: #F5F5F5;
	padding: 20rpx;
}

.message-list {
	.message-item {
		margin-bottom: 20rpx;
		
		.message-header {
			display: flex;
			align-items: center;
			margin-bottom: 15rpx;
			
			.message-type {
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 15rpx;
				
				&.type-order {
					background-color: #FF9800;
				}
				
				&.type-system {
					background-color: #2196F3;
				}
				
				&.type-chat {
					background-color: #4CAF50;
				}
			}
			
			.message-title {
				flex: 1;
				font-size: 28rpx;
				color: #333333;
				font-weight: bold;
			}
			
			.message-time {
				font-size: 24rpx;
				color: #999999;
			}
		}
		
		.message-content {
			font-size: 26rpx;
			color: #666666;
			line-height: 1.6;
			margin-bottom: 15rpx;
		}
		
		.message-footer {
			text-align: right;
		}
	}
}
</style>
