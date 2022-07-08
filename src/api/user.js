import request from '@/utils/request'

// 获取用户信息
export const getUserInfo = () => request({
  method: 'GET',
  url: '/user'
})

// 获取用户收藏列表
export const getFavorites = () => request({
  method: 'GET',
  url: '/user/favorites'
})

// 获取已发布房源列表
export const getHouses = () => request({
  method: 'GET',
  url: '/user/houses'
})
