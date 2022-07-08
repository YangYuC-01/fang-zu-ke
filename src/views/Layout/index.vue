<template>
  <div class="layout-content">
    <router-view></router-view>
    <van-tabbar route active-color="rgb(33, 185, 122)">
      <van-tabbar-item replace to="/home" icon="home-o">
        首页
        <van-icon name="home-o" size="25" slot="icon" />
      </van-tabbar-item>
      <van-tabbar-item replace to="/findroom" icon="search">
        找房
        <van-icon name="search" size="25" slot="icon" />
      </van-tabbar-item>
      <van-tabbar-item replace to="/information" icon="todo-list-o">
        资讯
        <van-icon name="todo-list-o" size="25" slot="icon" />
      </van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="user-o">
        我的
        <van-icon name="user-o" size="25" slot="icon" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  created () {},
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.layout-content {
  padding-bottom: 50px;
  .van-hairline--top-bottom {
    border-top: 2px solid #ddd;
  }
  .van-tabbar-item {
    color: rgb(136, 136, 136);
  }
}
</style>
