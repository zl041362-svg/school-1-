import storage from '@/utils/storage.js'

export function generateOrderId() {
	const now = new Date()
	const y = now.getFullYear()
	const m = String(now.getMonth() + 1).padStart(2, '0')
	const d = String(now.getDate()).padStart(2, '0')
	const h = String(now.getHours()).padStart(2, '0')
	const mi = String(now.getMinutes()).padStart(2, '0')
	const s = String(now.getSeconds()).padStart(2, '0')
	const rand = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
	return `${y}${m}${d}${h}${mi}${s}${rand}`
}

export function createOrder(goodsList) {
	const orders = goodsList.map(goods => ({
		id: generateOrderId() + Math.floor(Math.random() * 100),
		goodsId: goods.goodsId || goods.id,
		title: goods.title,
		price: goods.price,
		image: goods.image,
		quantity: goods.quantity || 1,
		status: 'pending',
		statusText: '待收货',
		type: 'bought',
		orderTime: Date.now()
	}))

	const userOrderList = storage.getStorage(storage.STORAGE_KEYS.ORDER_LIST) || []
	storage.setStorage(storage.STORAGE_KEYS.ORDER_LIST, [...userOrderList, ...orders])
	return orders
}
