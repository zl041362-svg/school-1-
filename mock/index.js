export const mockNotices = [
	{
		id: 1,
		title: '校园二手交易平台正式上线啦！',
		content: '欢迎来到校园二手交易平台，在这里你可以轻松买卖二手商品。',
		link: '/pages/faq/faq'
	},
	{
		id: 2,
		title: '新用户注册即送10元优惠券',
		content: '注册成为新用户，即可获得10元优惠券，满50元可用。',
		link: ''
	},
	{
		id: 3,
		title: '本周热门商品推荐：教材类',
		content: '本周教材类商品交易量最高，快来看看吧！',
		link: ''
	}
]

export const mockBanners = [
	{
		id: 1,
		image: '/static/logo.png',
		title: '新用户注册送10元优惠券',
		link: '/pages/faq/faq',
		type: 'activity'
	},
	{
		id: 2,
		image: '/static/logo.png',
		title: '热门教材推荐',
		link: '/pages/index/index?categoryId=2',
		type: 'goods'
	},
	{
		id: 3,
		image: '/static/logo.png',
		title: '电子产品专场',
		link: '/pages/index/index?categoryId=3',
		type: 'goods'
	}
]

export const mockHotSearch = [
	'教材',
	'笔记本电脑',
	'手机',
	'台灯',
	'自行车',
	'耳机',
	'键盘',
	'显示器'
]

export const mockCategories = [
	{
		id: 1,
		name: '全部',
		icon: '/static/logo.png'
	},
	{
		id: 2,
		name: '教材',
		icon: '/static/logo.png'
	},
	{
		id: 3,
		name: '电子产品',
		icon: '/static/logo.png'
	},
	{
		id: 4,
		name: '生活用品',
		icon: '/static/logo.png'
	},
	{
		id: 5,
		name: '运动器材',
		icon: '/static/logo.png'
	},
	{
		id: 6,
		name: '服装鞋包',
		icon: '/static/logo.png'
	},
	{
		id: 7,
		name: '图书',
		icon: '/static/logo.png'
	},
	{
		id: 8,
		name: '美妆',
		icon: '/static/logo.png'
	}
]

export const mockGoodsList = [
	{
		id: 1,
		title: '高等数学第七版 同济大学出版社',
		price: 25.00,
		originalPrice: 45.00,
		image: '/static/logo.png',
		categoryId: 2,
		condition: '九成新',
		delivery: '自提',
		stock: 10,
		seller: {
			id: 1,
			nickname: '小明同学',
			avatar: '/static/logo.png',
			credit: 5,
			soldCount: 12
		},
		viewCount: 156,
		likeCount: 23,
		isNew: true,
		isHot: true,
		publishTime: Date.now() - 3600000
	},
	{
		id: 2,
		title: 'MacBook Pro 2020款 M1芯片',
		price: 5800.00,
		originalPrice: 9299.00,
		image: '/static/logo.png',
		categoryId: 3,
		condition: '九五成新',
		delivery: '快递',
		stock: 1,
		seller: {
			id: 2,
			nickname: '科技达人',
			avatar: '/static/logo.png',
			credit: 5,
			soldCount: 8
		},
		viewCount: 342,
		likeCount: 67,
		isNew: false,
		publishTime: Date.now() - 86400000
	},
	{
		id: 3,
		title: '小米台灯 1S 护眼灯',
		price: 45.00,
		originalPrice: 129.00,
		image: '/static/logo.png',
		categoryId: 4,
		condition: '全新',
		delivery: '自提',
		stock: 5,
		seller: {
			id: 3,
			nickname: '生活家',
			avatar: '/static/logo.png',
			credit: 4,
			soldCount: 5
		},
		viewCount: 89,
		likeCount: 15,
		isNew: true,
		publishTime: Date.now() - 7200000
	},
	{
		id: 4,
		title: 'iPhone 12 128GB 黑色',
		price: 3200.00,
		originalPrice: 5999.00,
		image: '/static/logo.png',
		categoryId: 3,
		condition: '九成新',
		delivery: '快递',
		stock: 0,
		seller: {
			id: 4,
			nickname: '数码爱好者',
			avatar: '/static/logo.png',
			credit: 5,
			soldCount: 20
		},
		viewCount: 567,
		likeCount: 89,
		isNew: false,
		publishTime: Date.now() - 172800000
	},
	{
		id: 5,
		title: '英语四六级词汇书',
		price: 15.00,
		originalPrice: 35.00,
		image: '/static/logo.png',
		categoryId: 2,
		condition: '八成新',
		delivery: '自提',
		stock: 3,
		seller: {
			id: 5,
			nickname: '学霸',
			avatar: '/static/logo.png',
			credit: 5,
			soldCount: 15
		},
		viewCount: 123,
		likeCount: 28,
		isNew: false,
		publishTime: Date.now() - 259200000
	},
	{
		id: 6,
		title: '山地自行车 26寸',
		price: 280.00,
		originalPrice: 599.00,
		image: '/static/logo.png',
		categoryId: 5,
		condition: '八成新',
		delivery: '自提',
		stock: 2,
		seller: {
			id: 6,
			nickname: '骑行者',
			avatar: '/static/logo.png',
			credit: 4,
			soldCount: 3
		},
		viewCount: 78,
		likeCount: 12,
		isNew: true,
		publishTime: Date.now() - 1800000
	},
	{
		id: 7,
		title: '线性代数 第五版',
		price: 18.00,
		originalPrice: 38.00,
		image: '/static/logo.png',
		categoryId: 2,
		condition: '九成新',
		delivery: '自提',
		stock: 8,
		seller: {
			id: 7,
			nickname: '数学爱好者',
			avatar: '/static/logo.png',
			credit: 5,
			soldCount: 10
		},
		viewCount: 234,
		likeCount: 45,
		isNew: false,
		isHot: true,
		publishTime: Date.now() - 43200000
	},
	{
		id: 8,
		title: 'iPad Air 4 64GB WiFi版',
		price: 2800.00,
		originalPrice: 4799.00,
		image: '/static/logo.png',
		categoryId: 3,
		condition: '九五成新',
		delivery: '快递',
		stock: 1,
		seller: {
			id: 8,
			nickname: '数码小王子',
			avatar: '/static/logo.png',
			credit: 5,
			soldCount: 6
		},
		viewCount: 445,
		likeCount: 78,
		isNew: false,
		isHot: true,
		publishTime: Date.now() - 86400000
	},
	{
		id: 9,
		title: 'Nike Air Max 270 42码',
		price: 320.00,
		originalPrice: 899.00,
		image: '/static/logo.png',
		categoryId: 6,
		condition: '九成新',
		delivery: '快递',
		stock: 1,
		seller: {
			id: 9,
			nickname: '运动达人',
			avatar: '/static/logo.png',
			credit: 4,
			soldCount: 7
		},
		viewCount: 189,
		likeCount: 34,
		isNew: true,
		publishTime: Date.now() - 5400000
	},
	{
		id: 10,
		title: '大学物理 上下册',
		price: 30.00,
		originalPrice: 68.00,
		image: '/static/logo.png',
		categoryId: 2,
		condition: '八成新',
		delivery: '自提',
		stock: 4,
		seller: {
			id: 10,
			nickname: '物理系学长',
			avatar: '/static/logo.png',
			credit: 5,
			soldCount: 18
		},
		viewCount: 167,
		likeCount: 31,
		isNew: false,
		publishTime: Date.now() - 129600000
	},
	{
		id: 11,
		title: '机械键盘 红轴 RGB背光',
		price: 180.00,
		originalPrice: 399.00,
		image: '/static/logo.png',
		categoryId: 3,
		condition: '九成新',
		delivery: '快递',
		stock: 3,
		seller: {
			id: 11,
			nickname: '游戏玩家',
			avatar: '/static/logo.png',
			credit: 4,
			soldCount: 9
		},
		viewCount: 256,
		likeCount: 52,
		isNew: true,
		publishTime: Date.now() - 10800000
	},
	{
		id: 12,
		title: '瑜伽垫 防滑加厚',
		price: 25.00,
		originalPrice: 59.00,
		image: '/static/logo.png',
		categoryId: 5,
		condition: '全新',
		delivery: '自提',
		stock: 6,
		seller: {
			id: 12,
			nickname: '健身达人',
			avatar: '/static/logo.png',
			credit: 5,
			soldCount: 11
		},
		viewCount: 98,
		likeCount: 19,
		isNew: true,
		publishTime: Date.now() - 3600000
	},
	{
		id: 13,
		title: '三体全集 刘慈欣',
		price: 35.00,
		originalPrice: 75.00,
		image: '/static/logo.png',
		categoryId: 7,
		condition: '九成新',
		delivery: '自提',
		stock: 2,
		seller: {
			id: 13,
			nickname: '科幻迷',
			avatar: '/static/logo.png',
			credit: 5,
			soldCount: 14
		},
		viewCount: 312,
		likeCount: 67,
		isNew: false,
		isHot: true,
		publishTime: Date.now() - 64800000
	},
	{
		id: 14,
		title: 'MAC口红 Chili色号',
		price: 120.00,
		originalPrice: 175.00,
		image: '/static/logo.png',
		categoryId: 8,
		condition: '全新',
		delivery: '快递',
		stock: 1,
		seller: {
			id: 14,
			nickname: '美妆达人',
			avatar: '/static/logo.png',
			credit: 4,
			soldCount: 8
		},
		viewCount: 423,
		likeCount: 89,
		isNew: false,
		isHot: true,
		publishTime: Date.now() - 259200000
	},
	{
		id: 15,
		title: 'C语言程序设计 谭浩强',
		price: 20.00,
		originalPrice: 45.00,
		image: '/static/logo.png',
		categoryId: 2,
		condition: '九成新',
		delivery: '自提',
		stock: 7,
		seller: {
			id: 15,
			nickname: '程序员',
			avatar: '/static/logo.png',
			credit: 5,
			soldCount: 22
		},
		viewCount: 289,
		likeCount: 56,
		isNew: false,
		publishTime: Date.now() - 172800000
	},
	{
		id: 16,
		title: '蓝牙耳机 降噪版',
		price: 150.00,
		originalPrice: 299.00,
		image: '/static/logo.png',
		categoryId: 3,
		condition: '九五成新',
		delivery: '快递',
		stock: 2,
		seller: {
			id: 16,
			nickname: '音乐爱好者',
			avatar: '/static/logo.png',
			credit: 5,
			soldCount: 13
		},
		viewCount: 378,
		likeCount: 71,
		isNew: true,
		publishTime: Date.now() - 7200000
	},
	{
		id: 17,
		title: '优衣库羽绒服',
		price: 180.00,
		originalPrice: 599.00,
		image: '/static/logo.png',
		categoryId: 6,
		condition: '八成新',
		delivery: '快递',
		stock: 1,
		seller: {
			id: 17,
			nickname: '时尚达人',
			avatar: '/static/logo.png',
			credit: 4,
			soldCount: 5
		},
		viewCount: 145,
		likeCount: 28,
		isNew: false,
		publishTime: Date.now() - 216000000
	},
	{
		id: 18,
		title: '哑铃套装 20kg',
		price: 120.00,
		originalPrice: 299.00,
		image: '/static/logo.png',
		categoryId: 5,
		condition: '九成新',
		delivery: '自提',
		stock: 1,
		seller: {
			id: 18,
			nickname: '健身教练',
			avatar: '/static/logo.png',
			credit: 5,
			soldCount: 16
		},
		viewCount: 201,
		likeCount: 41,
		isNew: true,
		publishTime: Date.now() - 14400000
	},
	{
		id: 19,
		title: '百年孤独 马尔克斯',
		price: 22.00,
		originalPrice: 55.00,
		image: '/static/logo.png',
		categoryId: 7,
		condition: '九成新',
		delivery: '自提',
		stock: 3,
		seller: {
			id: 19,
			nickname: '文学爱好者',
			avatar: '/static/logo.png',
			credit: 5,
			soldCount: 19
		},
		viewCount: 267,
		likeCount: 58,
		isNew: false,
		publishTime: Date.now() - 86400000
	},
	{
		id: 20,
		title: '兰蔻粉水 400ml',
		price: 280.00,
		originalPrice: 680.00,
		image: '/static/logo.png',
		categoryId: 8,
		condition: '全新',
		delivery: '快递',
		stock: 1,
		seller: {
			id: 20,
			nickname: '护肤达人',
			avatar: '/static/logo.png',
			credit: 5,
			soldCount: 12
		},
		viewCount: 356,
		likeCount: 82,
		isNew: false,
		isHot: true,
		publishTime: Date.now() - 43200000
	}
]

export const mockUserInfo = {
	id: 1,
	nickname: '校园用户',
	avatar: '/static/logo.png',
	phone: '138****8888',
	credit: 5,
	soldCount: 8,
	boughtCount: 12,
	balance: 158.50
}

export const mockCartList = [
	{
		id: 1,
		goodsId: 1,
		title: '高等数学第七版 同济大学出版社',
		price: 25.00,
		image: '/static/logo.png',
		quantity: 1,
		selected: true
	},
	{
		id: 2,
		goodsId: 3,
		title: '小米台灯 1S 护眼灯',
		price: 45.00,
		image: '/static/logo.png',
		quantity: 1,
		selected: false
	}
]

export const mockOrderList = {
	bought: [
		{
			id: '202312290001',
			goodsId: 2,
			title: 'MacBook Pro 2020款 M1芯片',
			price: 5800.00,
			image: '/static/logo.png',
			status: 'completed',
			statusText: '已完成',
			quantity: 1,
			orderTime: Date.now() - 86400000 * 3
		},
		{
			id: '202312290002',
			goodsId: 1,
			title: '高等数学第七版 同济大学出版社',
			price: 25.00,
			image: '/static/logo.png',
			status: 'pending',
			statusText: '待收货',
			quantity: 2,
			orderTime: Date.now() - 86400000
		},
		{
			id: '202312290004',
			goodsId: 3,
			title: '小米手环6',
			price: 150.00,
			image: '/static/logo.png',
			status: 'cancelled',
			statusText: '已取消',
			quantity: 1,
			orderTime: Date.now() - 86400000 * 2
		}
	],
	sold: [
		{
			id: '202312290003',
			goodsId: 4,
			title: 'iPhone 12 128GB 黑色',
			price: 3200.00,
			image: '/static/logo.png',
			status: 'completed',
			statusText: '已完成',
			quantity: 1,
			orderTime: Date.now() - 86400000 * 5
		}
	]
}

export const mockFAQList = [
	{
		id: 1,
		category: '交易流程',
		questions: [
			{
				id: 1,
				question: '如何购买商品？',
				answer: '1. 浏览商品列表或搜索商品\n2. 点击商品进入详情页\n3. 点击"加入购物车"或直接购买\n4. 确认订单信息\n5. 选择支付方式完成支付'
			},
			{
				id: 2,
				question: '如何发布商品？',
				answer: '1. 进入"个人中心"\n2. 点击"发布商品"\n3. 上传商品图片\n4. 填写商品信息\n5. 设置价格和发货方式\n6. 提交审核'
			}
		]
	},
	{
		id: 2,
		category: '售后问题',
		questions: [
			{
				id: 3,
				question: '商品与描述不符怎么办？',
				answer: '收到商品后如发现与描述不符，请在3天内联系客服申请售后，我们会协助您与卖家协商解决。'
			},
			{
				id: 4,
				question: '可以申请退款吗？',
				answer: '商品未发货前可以申请退款；已发货但未签收的，可以申请拦截；已签收的商品，如存在质量问题可申请退款。'
			}
		]
	},
	{
		id: 3,
		category: '账号安全',
		questions: [
			{
				id: 5,
				question: '如何修改密码？',
				answer: '进入"个人中心"→"设置"→"账号安全"→"修改密码"，按照提示完成密码修改。'
			},
			{
				id: 6,
				question: '如何进行校园认证？',
				answer: '进入"个人中心"→"编辑资料"→"校园认证"，上传学生证或校园卡照片，等待审核通过即可。'
			}
		]
	},
	{
		id: 4,
		category: '平台规则',
		questions: [
			{
				id: 7,
				question: '什么是信誉等级？',
				answer: '信誉等级是根据用户的交易记录、评价情况等综合计算的，等级越高代表用户信誉越好。'
			},
			{
				id: 8,
				question: '如何提升信誉等级？',
				answer: '多完成交易、获得好评、及时发货、诚信经营都可以提升信誉等级。'
			}
		]
	}
]
