<template>
  <div class="city-list">
    <NavBar title="城市列表"></NavBar>

    <div class="bottom">
      <van-index-bar :index-list="indexList">
      <div v-for="(item,index) in indexList" :key="index">
        <van-index-anchor :index="item">{{item==='#' ? '当前城市' : item === "热" ? '热门城市' : item}}</van-index-anchor>
        <van-cell v-for="(city,index) in getFilterCityList(item)" :key="index" @click="goHome(item,city)">
          <template #title>{{city.label}}</template>
        </van-cell>
      </div>
    </van-index-bar>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import { hotCity, allCity } from '@/api/cityList'
import { mapState } from 'vuex'
export default {
  name: 'CityList',
  created () {
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true
    })
    this.getHotCity()
    this.getAllCityList()
  },
  data () {
    return {
      indexList: ['#', '热'],
      hotCityList: [], // 热门城市
      allCityList: []
    }
  },
  methods: {
    async getHotCity () {
      try {
        const { data } = await hotCity()
        console.log('热门城市', data)
        this.hotCityList = data.body
      } catch (err) {
        console.log(err)
      }
    },
    async getAllCityList () {
      try {
        const { data } = await allCity()
        console.log('所有城市 ', data)
        let arr = []
        arr = data.body
        this.allCityList = arr.filter(item => {
          return !this.hotCityList.some(item1 => {
            return item.value === item1.value
          })
        })

        this.getIndexList()
      } catch (err) {
        console.log(err)
      }
    },
    getIndexList () {
      let arr = []
      this.allCityList.forEach(item => {
        const str = item.short.substr(0, 1).toUpperCase()
        arr.push(str)
      })
      arr = arr.sort()
      const newArr = [...new Set(arr)]
      this.indexList = [...this.indexList, ...newArr]
    },
    getFilterCityList (item) {
      let filterCityList = []

      if (item === '#') {
        filterCityList = this.nowCity
      } else if (item === '热') {
        filterCityList = this.hotCityList
      } else {
        filterCityList = this.allCityList.filter(city => {
          return city.short.substr(0, 1).toUpperCase() === item
        })
      }
      return filterCityList
    },
    goHome (item, city) {
      if (item !== '#' && item !== '热') {
        this.$toast('该城市暂无房源')
      } else {
        this.$router.back()
        this.$store.commit('setNowCity', { label: city.label, id: city.value || city.id })
      }
    }
  },
  computed: {
    ...mapState(['nowCity'])
  },
  watch: {},
  filters: {},
  components: {
    NavBar
  }
}
</script>

<style scoped lang='less'>
.city-list {
  .navBar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 200;
  }
  .bottom {
    position: fixed;
    top: 46px;
    height: 100%;
    width: 100%;
    overflow:scroll;

    .van-cell__title {
    font-size: 16px;
  }
  .van-cell {
    border-bottom: 1px solid #eee;
  }
  }
}
</style>
