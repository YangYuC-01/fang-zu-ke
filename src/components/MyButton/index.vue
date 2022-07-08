<template>
<div class="button">
    <div class="left" @click="$emit('cancel')">取消</div>
    <div class="right" @click="$emit('confirm')">确认</div>
</div>
</template>

<script>
export default {
  name: 'MyButton',
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
.button {
  display: flex;
  height: 50px;
  font-size: 18px;
  .left {
    flex: 1;
    background-color: #fff;
    text-align: center;
    line-height: 50px;
    color: #21b97a;
  }
  .right {
    flex: 2;
    background-color: #21b97a;
    text-align: center;
    line-height: 50px;
    color: #fff;
  }
}
</style>
