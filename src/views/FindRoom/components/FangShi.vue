<template>
  <div class="fangshi">
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
  name: 'FangShi',
  props: {
    conditionList: {
      type: Object,
      required: true
    }
  },
  created () {
    if (this.conditionList.rentType) {
      this.fsList = this.conditionList.rentType
      this.list()
    } else {
      this.timer = setInterval(() => {
        if (this.conditionList.rentType) {
          this.fsList = this.conditionList.rentType
          this.list()
        } else {
          this.loadingShow = true
        }
      }, 1000)
    }
  },
  data () {
    return {
      columns: [],
      fsList: [],
      loadingShow: true,
      timer: null
    }
  },
  methods: {
    // 获取列表项
    list () {
      this.fsList.forEach(item => {
        this.columns.push({ text: item.label, value: item.value })
      })
      // 关闭定时器
      clearInterval(this.timer)
      // 关闭 等候界面
      this.loadingShow = false
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
      this.$emit('myManner', arr[0].value)
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
