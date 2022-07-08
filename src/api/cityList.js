import request from '@/utils/request'

// 获取热门城市
export const hotCity = () => request({
  method: 'GET',
  url: '/area/hot'
})

// 获取城市列表
export const allCity = () => request({
  method: 'GET',
  url: '/area/city?level=1'

})

// 查询房源数据  地图
export const cityMap = id => request({
  method: 'GET',
  url: '/area/map',
  params: {
    id
  }
})
