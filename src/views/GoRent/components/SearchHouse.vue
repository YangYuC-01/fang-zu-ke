<template>
  <div class="search-house">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @input="onInput"
      />
    </form>
    <van-cell :title="item.communityName" v-for="(item,index) in searchHouseList" :key="index"
    @click="cellFn(item)"/>
  </div>
</template>

<script>
import { searchHouse } from '@/api/goRent'
import { mapState } from 'vuex'
let timer = null
export default {
  name: 'SearchHouse',
  created () { },
  data () {
    return {
      value: '',
      searchHouseList: []
    }
  },
  methods: {
    onInput () {
      clearTimeout(timer)
      timer = setTimeout(async () => {
        try {
          const { data } = await searchHouse({
            name: this.value,
            id: this.nowCity[0].id
          })
          this.searchHouseList = data.body
          console.log(data)
        } catch (err) {
          console.log(err)
        }
      }, 500)
    },
    cellFn (item) {
      this.$emit('searchHouse', item)
      this.onCancel()
    },
    onSearch (val) {
      this.onInput()
    },
    onCancel () {
      this.$emit('onCancel')
    }
  },
  computed: {
    ...mapState(['nowCity'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.search-house {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  .van-cell {
    border-bottom: 1px solid #f1f1f1;
  }
}
</style>
