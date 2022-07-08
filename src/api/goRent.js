import request from '@/utils/request'

// 小区关键词查询
export const searchHouse = params => request({
  method: 'GET',
  url: '/area/community',
  params
})

// 发布房屋所需的条件
export const houseParams = () => request({
  method: 'GET',
  url: '/houses/params'
})

// 房屋图像上传
export const setImages = data => request({
  method: 'POST',
  'content-type': 'multipart/form-data',
  url: '/houses/image',
  data
})

// 发布房源
export const publishHouse = data => request({
  method: 'POST',
  url: '/user/houses',
  data
})
