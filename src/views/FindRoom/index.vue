<template>
  <div class="find-room">
    <!-- 顶部搜索 -->
    <van-nav-bar left-arrow @click-left="$router.back()">
      <template #title>
        <searchNavBar></searchNavBar>
      </template>
    </van-nav-bar>
    <!-- 顶部搜索结束 -->

    <!-- 筛选栏 -->
    <div class="shaixuan">
      <van-row>
        <van-col span="6" @click="(popShow = true), (com = 'QuYu')" :class="{active:com==='QuYu'}">
          区域
          <van-icon name="arrow-down" />
        </van-col>
        <van-col span="6" @click="(popShow = true), (com = 'FangShi')" :class="{active:com==='FangShi'}">
          方式
          <van-icon name="arrow-down" />
        </van-col>
        <van-col span="6" @click="(popShow = true), (com = 'ZuJin')" :class="{active:com==='ZuJin'}">
          租金
          <van-icon name="arrow-down" />
        </van-col>
        <van-col span="6" @click="ShaiXuanShow=true" :class="{active:ShaiXuanShow}">
          筛选
          <van-icon name="arrow-down" />
        </van-col>
      </van-row>
    </div>
    <!-- 筛选栏结束 -->

    <div class="a">
      <!-- 区域弹出层 -->
    <van-popup v-model="popShow" class="quyuPP">
      <component
      class="component"
        :is="com"
        :conditionList="conditionList"
        @cancel="popShow = false"
        @quyu="houseObj.area=$event.areaVal,houseObj.subway=$event.subwayVal"
        @myManner="houseObj.rentType = $event"
        @MyMoney="houseObj.price = $event"
      ></component>
    </van-popup>
    <!-- 弹出层结束 -->
    </div>

    <div class="b">
      <!-- 筛选弹出层 -->
    <van-popup v-model="ShaiXuanShow" position="right" class="shaixuanPP" :style="{ height: '100%',width:'80%'}">
      <ShaiXuan :conditionList="conditionList" @cancel="ShaiXuanShow=false"></ShaiXuan>
    </van-popup>

    <!-- 筛选弹出层结束 -->
    </div>

    <!-- 房屋列表 -->
    <MyCell :houseObj="houseObj"></MyCell>
    <!-- 房屋列表结束 -->
  </div>
</template>

<script>
import searchNavBar from '@/components/searchNavBar'
import QuYu from './components/QuYu.vue'
import FangShi from './components/FangShi.vue'
import ZuJin from './components/ZuJin.vue'
import MyCell from '@/components/MyCell'
import ShaiXuan from './components/ShaiXuan.vue'
import { getCondition } from '@/api/house'
export default {
  name: 'FindRoom',
  created () {
    this.getConditionList()
  },
  data () {
    return {
      popShow: false, // 区域弹出层
      ShaiXuanShow: false, // 筛选弹出层
      com: '', // 弹出层显示的组件
      conditionList: {}, // 全部查询条件列表
      houseObj: {
        // 根据条件获取房屋列表
        cityId: this.$store.state.nowCity[0].id,
        start: 1,
        end: 10,
        area: '',
        subway: '',
        rentType: '',
        price: ''
      }
    }
  },
  methods: {
    // 获取查询条件列表
    async getConditionList () {
      try {
        const { data } = await getCondition(this.$store.state.nowCity[0].id)
        console.log('查询条件', data)
        this.conditionList = data.body
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {
    popShow () {
      if (this.popShow === true) {
        this.ShaiXuanShow = false
      }
    },
    ShaiXuanShow () {
      if (this.ShaiXuanShow === true) {
        this.popShow = false
      }
    }
  },
  filters: {},
  components: {
    searchNavBar,
    QuYu,
    FangShi,
    ZuJin,
    ShaiXuan,
    MyCell
  }
}
</script>

<style scoped lang="less">
.find-room {
  /deep/.searchNavBar {
    .van-search {
      .van-search__label {
        .van-icon {
          color: #333;
        }
      }
    }
  }
  .van-nav-bar {
    /deep/.van-nav-bar__title {
      max-width: 100%;
      margin-left: 30px;
    }
  }
  .shaixuan {
    position: sticky;
    top: 0;
    z-index: 2017;
    .active {
      color: #21b97a;
    }
    .van-row {
      display: flex;
      height: 40px;
      justify-content: space-around;
      font-size: 17px;
      text-align: center;
      line-height: 40px;
      border-bottom: 1px solid #e4e6f0;
      background-color: #fff;
    }
  }

/deep/.van-overlay {
  z-index: 2000 !important;
}
/deep/.b .van-overlay {
  z-index: 2018 !important;
}
  .quyuPP.van-popup {
    z-index: 2015 !important;
    position: fixed;
    width: 100%;
    top: 218px;
  }
  /deep/.shaixuanPP.van-popup {
    z-index: 2100 !important;
  }
}
</style>
