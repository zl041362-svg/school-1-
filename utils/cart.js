import storage from '@/utils/storage.js'

export function getCartList() {
	return storage.getStorage(storage.STORAGE_KEYS.CART) || []
}

export function getCartCount() {
	return getCartList().length
}

export function addToCart(goods) {
	let cartList = getCartList()
	const existItem = cartList.find(item => item.goodsId === goods.id)
	if (existItem) {
		existItem.quantity++
	} else {
		cartList.push({
			id: Date.now(),
			goodsId: goods.id,
			title: goods.title,
			price: goods.price,
			image: goods.image,
			quantity: 1,
			selected: true
		})
	}
	storage.setStorage(storage.STORAGE_KEYS.CART, cartList)
}

export function removeFromCart(cartItemId) {
	let cartList = getCartList()
	cartList = cartList.filter(item => item.id !== cartItemId)
	storage.setStorage(storage.STORAGE_KEYS.CART, cartList)
}

export function saveCartList(cartList) {
	storage.setStorage(storage.STORAGE_KEYS.CART, cartList)
}
