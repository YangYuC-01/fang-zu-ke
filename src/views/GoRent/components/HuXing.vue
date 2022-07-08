<template>
  <div class="huxing">
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
  name: 'HuXing',
  props: {
    housesParamsList: {
      type: Object,
      required: true
    }
  },
  created () {
    this.setColumns()
  },
  data () {
    return {
      columns: []
    }
  },
  methods: {
    setColumns () {
      if (this.housesParamsList.roomType !== null) {
        this.housesParamsList.roomType.forEach(item => {
          this.columns.push(item.label)
        })
      }
    },
    onConfirm (val, index) {
      this.$emit('HXConfirm', { value: this.housesParamsList.roomType[index].value, text: val })
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
