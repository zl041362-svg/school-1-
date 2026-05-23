const STORAGE_KEYS = {
	TOKEN: 'token',
	USER_INFO: 'userInfo',
	SEARCH_HISTORY: 'searchHistory',
	CART: 'cart',
	FAVORITE: 'favorite',
	ADDRESS: 'address',
	NOTICE_CLOSED: 'noticeClosed',
	VIEW_HISTORY: 'viewHistory',
	ORDER_LIST: 'userOrderList',
	GOODS_LIST: 'userGoodsList',
	SETTINGS: 'userSettings'
}

const setStorage = (key, data) => {
	try {
		uni.setStorageSync(key, JSON.stringify(data))
		return true
	} catch (e) {
		console.error('存储失败:', e)
		return false
	}
}

const getStorage = (key) => {
	try {
		const data = uni.getStorageSync(key)
		return data ? JSON.parse(data) : null
	} catch (e) {
		console.error('读取失败:', e)
		return null
	}
}

const removeStorage = (key) => {
	try {
		uni.removeStorageSync(key)
		return true
	} catch (e) {
		console.error('删除失败:', e)
		return false
	}
}

const clearStorage = () => {
	try {
		uni.clearStorageSync()
		return true
	} catch (e) {
		console.error('清空失败:', e)
		return false
	}
}

export default {
	STORAGE_KEYS,
	setStorage,
	getStorage,
	removeStorage,
	clearStorage
}
