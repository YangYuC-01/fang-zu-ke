<template>
<div class="chaoxiang">
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
  name: 'ChaoXiang',
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
      if (this.housesParamsList.oriented !== null) {
        this.housesParamsList.oriented.forEach(item => {
          this.columns.push(item.label)
        })
      }
    },
    onConfirm (val, index) {
      this.$emit('CXConfirm', { value: this.housesParamsList.oriented[index].value, text: val })
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
