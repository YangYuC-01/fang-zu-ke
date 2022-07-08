<template>
<div class="navBar">
  <van-nav-bar :title="title" left-arrow @click-left="$router.back()"/>
</div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    title: {
      type: String,
      default: '标题'
    }
  },
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

<style scoped lang='less'>
/deep/.van-nav-bar__left {
    padding-left: 20px;
  }
</style>
