<template>
<div>
    <div
      class="box"
      v-for="(item,index) in houseList"
      :key="index"
      @click="$router.push({name:'house',params:{'house_id':item.houseCode,'houseObj':JSON.stringify(houseObj)}})"
    >
      <div class="left">
        <img :src="`http://liufusong.top:8080${item.houseImg}`" />
      </div>
      <div class="right">
        <div class="title">{{item.title}}</div>
        <div class="Information">
          <span>{{item.desc}}</span>
        </div>
        <div class="subway">
          <span v-for="(str,index) in item.tags" :key="index">{{str}}</span>
        </div>
        <div class="money">
          <span class="top">{{item.price}}</span>
          <span class="bottom">元/月</span>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'CellItem',
  props: {
    houseList: {
      type: Array,
      required: true
    },
    houseObj: {
      type: Object,
      // required: true
      default: function () {
        return {
          cityId: this.$store.state.nowCity[0].id,
          area: '',
          subway: '',
          rentType: '',
          price: ''
        }
      }
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
.box {
    display: flex;
    height: 120px;
    padding-top: 15px;
    border-bottom: 1px solid #e5e5e5;

    .left {
      min-width: 118px;
      height: 80px;
      padding-right: 12px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .right {
      .title {
        width: 250px;

        font-weight: 600;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }
      .Information {
        font-size: 13px;
        color: #afb2b3;
      }

      .subway {
        display: flex;
        span {
          color: #39becd;
          background: #e1f5f8;
          font-size: 12px;
          border-radius: 3px;
          padding: 4px 5px;
          margin-right: 5px;
          line-height: 12px;
        }
      }

      .money {
        color: #fa5741;
        .top {
          font-size: 16px;
          font-weight: 600;
        }
        .bottom {
          font-size: 12px;
        }
      }
    }
  }
</style>
