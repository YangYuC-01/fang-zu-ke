<template>
  <div class="shaixuan">
    <van-loading size="24px" vertical v-if="loadingShow">加载中...</van-loading>

    <template v-else>
      <dl>
        <dt>户型</dt>
        <dd>
          <span
            v-for="item in sxList[0]"
            :class="{active:activeList.some(cls=> cls === item.value)}"
            @click="active(item.value)"
            :key="item.value"
          >{{item.label}}</span>
        </dd>

        <dt>朝向</dt>
        <dd>
          <span
            v-for="item in sxList[1]"
            :class="{active:activeList.some(cls=> cls === item.value)}"
            @click="active(item.value)"
            :key="item.value"
          >{{item.label}}</span>
        </dd>

        <dt>楼层</dt>
        <dd>
          <span
            v-for="item in sxList[2]"
            :class="{active:activeList.some(cls=> cls === item.value)}"
            @click="active(item.value)"
            :key="item.value"
          >{{item.label}}</span>
        </dd>

        <dt>房屋亮点</dt>
        <dd>
          <span
            v-for="item in sxList[3]"
            :class="{active:activeList.some(cls=> cls === item.value)}"
            @click="active(item.value)"
            :key="item.value"
          >{{item.label}}</span>
        </dd>
      </dl>
      <MyButton @cancel="cancel" @confirm="confirm" class="btn"></MyButton>
    </template>
  </div>
</template>

<script>
import MyButton from '@/components/MyButton'
export default {
  name: 'ShaiXuan',
  props: {
    conditionList: {
      type: Object,
      required: true
    }
  },
  created () {
    if (this.conditionList.rentType) {
      this.push()
    } else {
      this.timer = setInterval(() => {
        if (this.conditionList.rentType) {
          this.push()
        } else {
          this.loadingShow = true
        }
      }, 1000)
    }
  },
  data () {
    return {
      sxList: [],
      loadingShow: true,
      timer: null,
      activeList: []
    }
  },
  methods: {
    push () {
      this.sxList.push(this.conditionList.roomType)
      this.sxList.push(this.conditionList.oriented)
      this.sxList.push(this.conditionList.floor)
      this.sxList.push(this.conditionList.characteristic)
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
      console.log(1)
    },
    active (val) {
      const index = this.activeList.findIndex(cls => cls === val)
      if (index !== -1) {
        this.activeList.splice(index, 1)
      } else {
        this.activeList.push(val)
      }
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
.shaixuan {
  padding: 0 15px;
  dt {
    margin: 20px 0;
    font-size: 15px;
    color: #333;
  }
  dd {
    margin-left: 40px;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 14px;

    .active {
      border: 1px solid #21b97a;
      color: #21b97a;
      background-color: #defaef;
    }
    span {
      display: inline-block;
      height: 32px;
      width: 70px;
      margin: 0 18px 15px 0;
      border: 1px solid #ddd;
      border-radius: 3px;
      line-height: 32px;
      text-align: center;
      font-size: 12px;
      color: #888;
    }
  }
}
</style>
