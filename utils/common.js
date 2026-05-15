const formatPrice = (price) => {
	return '¥' + parseFloat(price).toFixed(2)
}

const formatDate = (timestamp, format = 'YYYY-MM-DD HH:mm:ss') => {
	const date = new Date(timestamp)
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	const hour = String(date.getHours()).padStart(2, '0')
	const minute = String(date.getMinutes()).padStart(2, '0')
	const second = String(date.getSeconds()).padStart(2, '0')

	return format
		.replace('YYYY', year)
		.replace('MM', month)
		.replace('DD', day)
		.replace('HH', hour)
		.replace('mm', minute)
		.replace('ss', second)
}

const formatNumber = (num) => {
	if (num >= 10000) {
		return (num / 10000).toFixed(1) + '万'
	} else if (num >= 1000) {
		return (num / 1000).toFixed(1) + 'k'
	}
	return num.toString()
}

const debounce = (func, wait) => {
	let timeout
	return function(...args) {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			func.apply(this, args)
		}, wait)
	}
}

const throttle = (func, wait) => {
	let timeout
	return function(...args) {
		if (!timeout) {
			timeout = setTimeout(() => {
				timeout = null
				func.apply(this, args)
			}, wait)
		}
	}
}

const deepClone = (obj) => {
	if (obj === null || typeof obj !== 'object') return obj
	if (obj instanceof Date) return new Date(obj)
	if (obj instanceof Array) return obj.map(item => deepClone(item))
	if (obj instanceof Object) {
		const clonedObj = {}
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				clonedObj[key] = deepClone(obj[key])
			}
		}
		return clonedObj
	}
}

export default {
	formatPrice,
	formatDate,
	formatNumber,
	debounce,
	throttle,
	deepClone
}
