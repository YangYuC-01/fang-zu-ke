<template>
  <div class="searchNavBar">
    <van-search v-model="value" show-action placeholder="请输入小区或地址" disabled>
      <template #label>
        <div @click="$router.push({name:'citylist'})">
          <span>{{$store.state.nowCity[0].label}}</span>
        <van-icon name="arrow-down" />
        </div>
      </template>
      <template #action>
        <van-icon name="location-o" @click="$router.push({name:'baiduditu'})"/>
      </template>
    </van-search>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      value: ''
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.searchNavBar {
  .van-search  {
    // padding: 0;
    background-color: unset;
  }
 /deep/ .van-search__content {
    background-color: #fff;
    padding: 0;
  }
.van-cell {
  /deep/.van-field__left-icon {
    padding-left: 12px;
    border-left:1px solid #e5e5e5;
    color: #9c9fa1;
  }
}
.van-search__label {
  padding: 0 10px;
  font-size: 14px;
  color: #333;
}
.van-icon-location-o {
  margin-top:5px;
  font-size: 25px;
  color: #fff;
}
}
</style>
