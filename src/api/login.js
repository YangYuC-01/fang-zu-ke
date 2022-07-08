import request from '@/utils/request'

// 用户登录
export const login = data => request({
  method: 'POST',
  url: '/user/login',
  data
})
