import request from '@/utils/request.js'

export const getNoticeList = () => {
	return request.get('/notice/list')
}

export const getHotSearch = () => {
	return request.get('/search/hot')
}

export const getSearchSuggest = (keyword) => {
	return request.get('/search/suggest', { keyword })
}

export const searchGoods = (params) => {
	return request.get('/goods/search', params)
}

export const getGoodsList = (params) => {
	return request.get('/goods/list', params)
}

export const getGoodsDetail = (id) => {
	return request.get('/goods/detail', { id })
}

export const getCategoryList = () => {
	return request.get('/category/list')
}

export const addCart = (data) => {
	return request.post('/cart/add', data)
}

export const getCartList = () => {
	return request.get('/cart/list')
}

export const removeCart = (ids) => {
	return request.post('/cart/remove', { ids })
}

export const updateCart = (data) => {
	return request.put('/cart/update', data)
}

export const addFavorite = (goodsId) => {
	return request.post('/favorite/add', { goodsId })
}

export const removeFavorite = (goodsId) => {
	return request.post('/favorite/remove', { goodsId })
}

export const getFavoriteList = () => {
	return request.get('/favorite/list')
}

export const publishGoods = (data) => {
	return request.post('/goods/publish', data)
}

export const getOrderList = (type) => {
	return request.get('/order/list', { type })
}

export const getOrderDetail = (orderId) => {
	return request.get('/order/detail', { orderId })
}

export const cancelOrder = (orderId) => {
	return request.post('/order/cancel', { orderId })
}

export const confirmOrder = (orderId) => {
	return request.post('/order/confirm', { orderId })
}

export const getUserInfo = () => {
	return request.get('/user/info')
}

export const updateUserInfo = (data) => {
	return request.put('/user/update', data)
}

export const getAddressList = () => {
	return request.get('/address/list')
}

export const addAddress = (data) => {
	return request.post('/address/add', data)
}

export const updateAddress = (data) => {
	return request.put('/address/update', data)
}

export const deleteAddress = (id) => {
	return request.post('/address/delete', { id })
}

export const getWalletInfo = () => {
	return request.get('/wallet/info')
}

export const getMessageList = () => {
	return request.get('/message/list')
}

export const getFAQList = () => {
	return request.get('/faq/list')
}
