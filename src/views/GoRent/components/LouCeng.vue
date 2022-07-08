<template>
<div class="louceng">
    <van-picker
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
</div>
</template>

<script>
export default {
  name: 'LouCeng',
  created () {
    this.setColumns()
  },
  props: {
    housesParamsList: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      columns: []
    }
  },
  methods: {
    setColumns () {
      if (this.housesParamsList.floor !== null) {
        this.housesParamsList.floor.forEach(item => {
          this.columns.push(item.label)
        })
      }
    },
    onConfirm (val, index) {
      this.$emit('LCConfirm', { value: this.housesParamsList.floor[index].value, text: val })
      this.onCancel()
    },
    onCancel () {
      this.$emit('onCancel')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>

</style>
