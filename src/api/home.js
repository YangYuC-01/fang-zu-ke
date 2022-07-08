import request from '@/utils/request'

// 轮播图
export const swiper = () => request({
  method: 'GET',
  url: '/home/swiper'
})
