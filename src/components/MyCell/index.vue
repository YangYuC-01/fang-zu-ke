<template>
  <van-list
    class="MyCell"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
<CellItem :houseList="houseList" :houseObj="houseObj"></CellItem>
  </van-list>
</template>

<script>
import { getHouse } from '@/api/house'
import CellItem from '@/components/Celltem'
export default {
  name: 'MyCell',
  props: {
    houseObj: {
      type: Object,
      required: true
    }
  },
  created () {

  },
  data () {
    return {
      houseList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    // 获取房屋列表
    async onLoad () {
      try {
        const { data } = await getHouse(this.houseObj)
        console.log('房屋列表', data)
        if (data.body.count < 20 || data.body.list === []) {
          this.finished = true
        }
        this.houseList.push(...data.body.list)
        // eslint-disable-next-line vue/no-mutating-props
        this.houseObj.start = this.houseObj.end + 1
        // eslint-disable-next-line vue/no-mutating-props
        this.houseObj.end = this.houseObj.end + 20
        this.$toast.success('数据更新成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取数据失败')
      }
      this.loading = false
    }

  },
  computed: {
    watchObj () {
      const watchObj = {}
      watchObj.area = this.houseObj.area
      watchObj.subway = this.houseObj.subway
      watchObj.rentType = this.houseObj.rentType
      watchObj.price = this.houseObj.price
      return watchObj
    }
  },
  watch: {
    watchObj: {
      deep: true,
      handler () {
        this.houseObj.start = 1
        this.houseObj.end = 20
        this.houseList = []
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        this.onLoad()
      }
    }
  },
  filters: {},
  components: {
    CellItem
  }
}
</script>

<style scoped lang='less'>
.MyCell {
  // .box {
  //   display: flex;
  //   height: 120px;
  //   padding-top: 15px;
  //   border-bottom: 1px solid #e5e5e5;

  //   .left {
  //     min-width: 118px;
  //     height: 80px;
  //     padding-right: 12px;
  //     img {
  //       width: 100%;
  //       height: 100%;
  //     }
  //   }

  //   .right {
  //     .title {
  //       width: 250px;

  //       font-weight: 600;
  //       font-size: 15px;
  //       overflow: hidden;
  //       text-overflow: ellipsis;
  //       white-space: nowrap;
  //       vertical-align: middle;
  //     }
  //     .Information {
  //       font-size: 13px;
  //       color: #afb2b3;
  //     }

  //     .subway {
  //       display: flex;
  //       span {
  //         color: #39becd;
  //         background: #e1f5f8;
  //         font-size: 12px;
  //         border-radius: 3px;
  //         padding: 4px 5px;
  //         margin-right: 5px;
  //         line-height: 12px;
  //       }
  //     }

  //     .money {
  //       color: #fa5741;
  //       .top {
  //         font-size: 16px;
  //         font-weight: 600;
  //       }
  //       .bottom {
  //         font-size: 12px;
  //       }
  //     }
  //   }
  // }
}
</style>
