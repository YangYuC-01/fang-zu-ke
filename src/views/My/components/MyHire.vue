<template>
<div class="my-hire">
    <!-- 导航栏 -->
    <NavBar title="我的房源" class="MyNavbar"></NavBar>
    <CellItem :houseList="houseList"></CellItem>
</div>
</template>

<script>
import NavBar from '@/components/NavBar'
import { publishList } from '@/api/house'
import CellItem from '@/components/Celltem'
export default {
  name: 'MyHire',
  created () {
    this.getHouseList()
  },
  data () {
    return {
      houseList: []
    }
  },
  methods: {
    async getHouseList () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0

      })
      try {
        const { data } = await publishList()
        console.log(data)
        this.houseList = data.body
        this.$toast.success('数据获取成功')
      } catch (err) {
        this.$toast.fail('获取数据失败')
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
.my-hire {
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
