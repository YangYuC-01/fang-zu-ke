import request from '@/utils/request'

// 获取房屋查询条件
export const getCondition = id => request({
  method: 'GET',
  url: '/houses/condition',
  params: {
    id
  }
})

// 根据条件查询房屋
export const getHouse = params => request({
  method: 'GET',
  url: '/houses',
  params
})

// 查询房屋具体信息
export const getHouseMessage = id => request({
  method: 'GET',
  url: `/houses/${id}`
})

// 房屋是否收藏
export const collection = id => request({
  method: 'GET',
  url: `/user/favorites/${id}`
})

// 添加收藏
export const addCollection = id => request({
  method: 'POST',
  url: `/user/favorites/${id}`
})

// 房屋是否收藏
export const deleteCollection = id => request({
  method: 'DELETE',
  url: `/user/favorites/${id}`
})

// 查看收藏列表
export const collectionList = () => request({
  method: 'GET',
  url: '/user/favorites'
})

// 查看已发布房源列表
export const publishList = () => request({
  method: 'GET',
  url: '/user/houses'
})
