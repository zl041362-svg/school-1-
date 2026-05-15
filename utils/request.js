const BASE_URL = 'https://api.example.com'
const TIMEOUT = 10000

const request = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: {
				'Content-Type': 'application/json',
				'Authorization': uni.getStorageSync('token') || ''
			},
			timeout: TIMEOUT,
			success: (res) => {
				if (res.statusCode === 200) {
					if (res.data.code === 200) {
						resolve(res.data.data)
					} else {
						uni.showToast({
							title: res.data.message || '请求失败',
							icon: 'none'
						})
						reject(res.data)
					}
				} else {
					uni.showToast({
						title: '网络请求失败',
						icon: 'none'
					})
					reject(res)
				}
			},
			fail: (err) => {
				uni.showToast({
					title: '网络连接失败',
					icon: 'none'
				})
				reject(err)
			}
		})
	})
}

const get = (url, data) => {
	return request({
		url,
		method: 'GET',
		data
	})
}

const post = (url, data) => {
	return request({
		url,
		method: 'POST',
		data
	})
}

const put = (url, data) => {
	return request({
		url,
		method: 'PUT',
		data
	})
}

const del = (url, data) => {
	return request({
		url,
		method: 'DELETE',
		data
	})
}

export default {
	get,
	post,
	put,
	del
}
