<template>
  <div class="baidu">
    <div id="container"></div>
    <van-nav-bar title="地图找房" left-arrow @click-left="$router.back()" fixed style="z-index:111" />
  </div>
</template>

<script>
// https://lbsyun.baidu.com/jsdemo.htm#eAddMarker'
import { cityMap } from '@/api/cityList'
export default {
  created () {
    this.getMapList()
  },
  mounted () {

  },
  data () {
    return {
      mapList: []
    }
  },
  methods: {
    async getMapList () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await cityMap(this.$store.state.nowCity[0].id)
        console.log(data)
        this.mapList = data.body
        // this.mapList = data.body
        this.$toast.success('获取数据成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取数据失败')
      }

      if (this.mapList.length) { // ! ! ! ？？？
        const { BMapGL } = window
        const myCity = new BMapGL.LocalCity()// 获取当前电脑所在的城市

        const arr = this.mapList

        myCity.get(function (result) {
          console.log(result)// 杭州
          const map = new BMapGL.Map('container')
          const point = new BMapGL.Point(result.center.lng, result.center.lat)// 绘制地图
          map.centerAndZoom(point, 15)// 根据某城市的中心点绘制图 15是缩放级别

          // 每个区在区的中心点画一个标记
          arr.forEach((item, index) => {
            const point1 = new BMapGL.Point(item.coord.latitude, item.coord.longitude)// 经纬度在接口中通过城市名字获取
            const content = `${item.label}${item.count}套`
            const label = new BMapGL.Label(content, { // 创建文本标注
              position: point1,
              offset: new BMapGL.Size(10, 20)
            })
            map.addOverlay(label) // 将标注添加到地图中

            label.setStyle({ // 设置label的样式
              color: '#fff',
              fontSize: '14px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'pink',
              textAlign: 'center',
              lineHeight: '40px'
            })

            label.addEventListener('click', function () {
              map.centerAndZoom(point1, 18)
            })
          })
        })
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
  }
}
</script>

<style scoped lang='less'>
#container {
  width: 100vw;
  height: 100vh;
}
</style>
