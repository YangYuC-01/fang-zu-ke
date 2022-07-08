<template>
  <div class="quyu">
    <!-- 可修改文案和加载图标的颜色 -->
    <van-loading size="24px" vertical v-if="loadingShow">加载中...</van-loading>
    <template v-else>
      <van-picker :columns="columns" ref="picker" />
      <MyButton @cancel="cancel" @confirm="confirm"></MyButton>
    </template>
  </div>
</template>

<script>
import MyButton from '@/components/MyButton'
export default {
  name: 'QuYu',
  props: {
    conditionList: {
      type: Object,
      required: true
    }
  },
  created () {
    if (this.conditionList.area) {
      this.quyuList[0] = this.conditionList.area // 瑕疵
      this.quyuList[1] = this.conditionList.subway
      this.list()
    } else {
      this.timer = setInterval(() => {
        if (this.conditionList.area && this.conditionList.subway) {
          this.quyuList[0] = this.conditionList.area // 瑕疵
          this.quyuList[1] = this.conditionList.subway
          this.list()
        } else {
          this.loadingShow = true
        }
      }, 2000)
    }
  },
  data () {
    return {
      columns: [],
      quyuList: [],
      loadingShow: true,
      timer: null
    }
  },
  methods: {
    // 获取列表
    list () {
      // const arr = []
      // arr[0] = {
      //   text: this.quyuList[0].label,
      //   children: []
      // }
      // this.quyuList[0].children.forEach((item, index) => {
      //   arr[0].children.push({ text: item.label, children: [], value: item.value })
      //   if (item.children) {
      //     item.children.forEach(item2 => {
      //       arr[0].children[index].children.push({ text: item2.label, value: item2.value })
      //     })
      //   } else {
      //     arr[0].children[index].children.push({ text: '' })
      //   }
      // })

      // arr[1] = {
      //   text: this.quyuList[1].label,
      //   children: []
      // }
      // this.quyuList[1].children.forEach((item, index) => {
      //   arr[1].children.push({ text: item.label, children: [], value: item.value })
      //   if (item.children) {
      //     item.children.forEach(item2 => {
      //       arr[1].children[index].children.push({ text: item2.label, value: item2.value })
      //     })
      //   } else {
      //     arr[1].children[index].children.push({ text: '' })
      //   }
      // })
      //! 递归
      const fn = (obj) => {
        obj.text = obj.label
        if (obj.children) {
          obj.children = obj.children.map(item => fn(item))
        } else {
          obj.children = []
          obj.children.push({ text: '不限' })
        }
        return obj
      }
      fn(this.quyuList[0])
      fn(this.quyuList[1])

      // 关闭定时器
      clearInterval(this.timer)
      // 关闭 等候界面
      this.loadingShow = false
      // console.log(arr)
      this.columns.push(this.quyuList[0], this.quyuList[1])
    },
    // 取消
    cancel () {
      this.$emit('cancel')
    },
    // 确认
    confirm () {
      const picker = this.$refs.picker
      console.log(picker.getValues())
      const arr = picker.getValues()
      let areaVal = ''
      let subwayVal = ''

      if (arr[0].text === '区域') {
        if (arr[2].value === 'null') {
          areaVal = arr[1].value
        } else {
          areaVal = arr[2].value
        }
      } else {
        if (arr[2].value === 'null') {
          subwayVal = arr[1].value
        } else {
          subwayVal = arr[2].value
        }
      }

      const obj = { areaVal, subwayVal }
      this.$emit('quyu', obj)
      this.$emit('cancel')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    MyButton
  }
}
</script>

<style scoped lang='less'>
</style>
