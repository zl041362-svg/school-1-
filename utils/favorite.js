import storage from '@/utils/storage.js'

export function getFavoriteList() {
	return storage.getStorage(storage.STORAGE_KEYS.FAVORITE) || []
}

export function isFavorite(goodsId) {
	const list = getFavoriteList()
	return list.includes(goodsId)
}

export function toggleFavorite(goodsId) {
	let list = getFavoriteList()
	const index = list.indexOf(goodsId)
	if (index !== -1) {
		list.splice(index, 1)
	} else {
		list.push(goodsId)
	}
	storage.setStorage(storage.STORAGE_KEYS.FAVORITE, list)
	return list
}

export function removeFavorite(goodsId) {
	let list = getFavoriteList()
	list = list.filter(id => id !== goodsId)
	storage.setStorage(storage.STORAGE_KEYS.FAVORITE, list)
	return list
}
