<template>
	<view class="page">
		<view class="faq-list">
			<view class="faq-category" v-for="category in faqList" :key="category.id">
				<view class="category-title">{{ category.category }}</view>
				<uni-collapse>
					<uni-collapse-item
						v-for="question in category.questions"
						:key="question.id"
						:title="question.question"
					>
						<view class="answer-content">
							<rich-text :nodes="formatAnswer(question.answer)"></rich-text>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
		</view>
		
		<view class="contact-section">
			<view class="contact-item" @click="handleContact">
				<uni-icons type="chatbubble" size="20" color="#4CAF50"></uni-icons>
				<text class="contact-text">联系客服</text>
			</view>
			<view class="contact-item" @click="handleFeedback">
				<uni-icons type="compose" size="20" color="#4CAF50"></uni-icons>
				<text class="contact-text">意见反馈</text>
			</view>
		</view>
	</view>
</template>

<script>
import { mockFAQList } from '@/mock/index.js'

export default {
	data() {
		return {
			faqList: []
		}
	},
	onLoad(options) {
		this.loadFAQList(options.id)
	},
	methods: {
		loadFAQList(id) {
			this.faqList = mockFAQList
			if (id) {
				this.faqList.forEach(category => {
					const question = category.questions.find(q => q.id === parseInt(id))
					if (question) {
						question.open = true
					}
				})
			}
		},
		formatAnswer(answer) {
			return answer.replace(/\n/g, '<br>')
		},
		handleContact() {
			uni.showModal({
				title: '联系客服',
				content: '客服电话：400-123-4567\n工作时间：9:00-18:00',
				showCancel: false
			})
		},
		handleFeedback() {
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
}

.faq-list {
	.faq-category {
		margin-bottom: 30rpx;
		
		.category-title {
			font-size: 28rpx;
			color: #333333;
			font-weight: bold;
			margin-bottom: 20rpx;
		}
		
		.answer-content {
			padding: 20rpx 0;
			font-size: 26rpx;
			color: #666666;
			line-height: 1.8;
		}
	}
}

.contact-section {
	display: flex;
	justify-content: center;
	padding: 40rpx 0;
	margin-top: 40rpx;
	background-color: #FFFFFF;
	border-radius: 16rpx;
	
	.contact-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 40rpx;
		
		.contact-text {
			font-size: 24rpx;
			color: #666666;
			margin-top: 10rpx;
		}
	}
}
</style>
