<template>
  <div class="my-collection">
    <!-- 导航栏 -->
    <NavBar title="收藏列表" class="MyNavbar"></NavBar>
    <CellItem :houseList="houseList"></CellItem>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import CellItem from '@/components/Celltem'
import { collectionList } from '@/api/house'
export default {
  name: 'MyCollection',
  created () {
    this.getCollectionList()
  },
  data () {
    return {
      houseList: []
    }
  },
  methods: {
    async getCollectionList () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0 // 持续展示 toast
      })
      try {
        const { data } = await collectionList()
        console.log(data)
        this.houseList = data.body
        this.$toast.success('成功获取收藏列表')
      } catch (err) {
        this.$toast.fail('获取收藏列表失败')
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    NavBar,
    CellItem
  }
}
</script>

<style scoped lang='less'>
.my-collection {
  padding-top: 45px;
  .MyNavbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
}
</style>
