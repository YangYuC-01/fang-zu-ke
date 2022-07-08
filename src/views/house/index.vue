<template>
  <div class="house">
    <!-- 导航栏 -->
    <NavBar :title="houseMessage.community" class="MyNavbar"></NavBar>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>

    <!-- 房屋信息 -->
    <div class="house-info">
      <p>{{ houseMessage.title }}</p>
      <span v-for="(str, index) in houseMessage.tags" :key="index" class="subway">{{ str }}</span>

      <!-- 面积 租金 -->
      <div class="middle">
        <div class="one">
          <div>
            {{ houseMessage.price }}
            <span>/月</span>
          </div>
          <i>租金</i>
        </div>
        <div class="two">
          <div>{{ houseMessage.roomType }}</div>
          <i>房型</i>
        </div>
        <div class="three">
          <div>{{ houseMessage.size }}平米</div>
          <i>面积</i>
        </div>
      </div>

      <!-- 装修 -->
      <div class="zhuangxiu">
        <div class="left">
          <div>
            装修：
            <span>精装</span>
          </div>
          <div>
            楼层：
            <span>{{ houseMessage.floor }}</span>
          </div>
        </div>
        <div class="right">
          <div>
            朝向：
            <span v-for="(str, index) in houseMessage.oriented" :key="index">
              {{
              str
              }}
            </span>
          </div>
          <div>
            类型：
            <span>普通住宅</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 地图 -->
    <div class="map">
      <h4>测试</h4>
      <div class="bottom">地图</div>
    </div>

    <!-- 房屋配套 -->
    <div class="house-facilities">
      <p>房屋配套</p>
      <van-grid :column-num="5" :border="false">
        <van-grid-item text="衣柜" v-if="getFilterIcon('衣柜')">
          <template #icon>
            <i class="iconfont icon-yigui"></i>
          </template>
        </van-grid-item>

        <van-grid-item text="洗衣机" v-if="getFilterIcon('洗衣机')">
          <template #icon>
            <i class="iconfont icon-xiyiji"></i>
          </template>
        </van-grid-item>

        <van-grid-item text="空调" v-if="getFilterIcon('空调')">
          <template #icon>
            <i class="iconfont icon-kongtiao"></i>
          </template>
        </van-grid-item>

        <van-grid-item text="天然气" v-if="getFilterIcon('天然气')">
          <template #icon>
            <i class="iconfont icon-meiqitianranqi"></i>
          </template>
        </van-grid-item>

        <van-grid-item text="冰箱" v-if="getFilterIcon('冰箱')">
          <template #icon>
            <i class="iconfont icon-bingxiang"></i>
          </template>
        </van-grid-item>

        <van-grid-item text="暖气" v-if="getFilterIcon('暖气')">
          <template #icon>
            <i class="iconfont icon-nuanqi"></i>
          </template>
        </van-grid-item>

        <van-grid-item text="电视" v-if="getFilterIcon('电视')">
          <template #icon>
            <i class="iconfont icon-dianshiji"></i>
          </template>
        </van-grid-item>

        <van-grid-item text="热水器" v-if="getFilterIcon('热水器')">
          <template #icon>
            <i class="iconfont icon-reshuiqianzhuang"></i>
          </template>
        </van-grid-item>

        <van-grid-item text="宽带" v-if="getFilterIcon('宽带')">
          <template #icon>
            <i class="iconfont icon-kuandai"></i>
          </template>
        </van-grid-item>

        <van-grid-item text="沙发" v-if="getFilterIcon('沙发')">
          <template #icon>
            <i class="iconfont icon-shafa"></i>
          </template>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 房屋概况 -->
    <div class="house-circumstance">
      <p>房屋概况</p>
      <div class="homeowner">
        <div class="top">
          <div class="left">
            <img src="http://liufusong.top:8080/img/avatar.png" alt="头像" />
            <div class="info">
              <div class="name">王女士</div>
              <div class="renzheng">
                <van-icon name="success" />
                <span>已认证房主</span>
              </div>
            </div>
          </div>

          <div class="right">
            <span>发信息</span>
          </div>
        </div>

        <div
          class="bottom"
        >1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。 2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。 3.人车分流，环境优美。 4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。</div>
      </div>
    </div>

    <!-- 猜你喜欢 -->
    <div class="like">
      <p>猜你喜欢</p>
      <van-loading size="24px" vertical v-if="!houseList[0]">加载中...</van-loading>
      <template v-else>
        <div
          class="box"
          v-for="(item,index) in houseList"
          :key="index"
          @click="$router.push({name:'house',params:{'house_id':item.houseCode,'houseObj':houseObj}})"
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
      </template>
    </div>

    <!-- 收藏 -->
    <div class="footer">
      <van-loading  class="collection" v-if="collectionLoading"/>
      <div class="collection" @click="collectionFn" v-else>
        <van-icon :name="isCollectionShow ?'star':'star-o'" :color="isCollectionShow ?'orange':'#999' "/>收藏
      </div>
      <div class="inline">在线资讯</div>
      <div class="Phone">电话预约</div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import { getHouseMessage, getHouse, collection, addCollection, deleteCollection } from '@/api/house'
export default {
  name: 'House',
  props: {
    house_id: {
      type: [Number, String],
      required: true
    },
    houseObj: {
      type: String,
      required: true
    }
  },
  created () {
    this.getHouseMessage()
    this.getHouseList()
    this.collection()
  },
  data () {
    return {
      houseMessage: {},
      images: [],
      filterIcon: [],
      obj: JSON.parse(this.houseObj),
      houseList: [],
      isCollectionShow: '', // 房屋是否收藏
      collectionLoading: false // 收藏等待
    }
  },
  methods: {
    async getHouseMessage () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await getHouseMessage(this.house_id)
        this.houseMessage = data.body
        console.log(data)
        this.filterIcon = data.body.supporting
        // this.getImages()
        this.$toast.success('成功获取房屋信息')
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取失败，请重试')
      }
    },
    getImages () {
      this.houseMessage.houseImg.forEach((item) => {
        this.images.push(`http://liufusong.top:8080/${item}`)
      })
    },
    getFilterIcon (str) {
      return this.filterIcon.some(item => item === str)
    },
    async getHouseList () {
      try {
        const { data } = await getHouse({
          cityId: this.houseObj.cityId,
          area: this.houseObj.area,
          subway: this.houseObj.subway,
          rentType: this.houseObj.rentType,
          price: this.houseObj.price,
          start: 1,
          end: 3
        })
        console.log(data)
        this.houseList = data.body.list
      } catch (err) {
        console.log(err)
      }
    },
    // 房屋是否收藏
    async collection () {
      try {
        const { data } = await collection(this.house_id)
        console.log('房屋是否收藏', data)
        if (data.status === 400) {
          return
        }
        this.isCollectionShow = data.body.isFavorite
      } catch (err) {
        console.log(err)
        this.$toast.fail('数据获取失败，请重试')
      }
    },
    // 收藏 删除收藏
    async collectionFn () {
      if (this.$store.state.token) {
        this.collectionLoading = true
        try {
          if (this.isCollectionShow) {
          // 已收藏 删除收藏
            const { data } = await deleteCollection(this.house_id)
            console.log('删除收藏', data)
            this.isCollectionShow = false
          } else {
          // 未收藏 添加收藏
            const { data } = await addCollection(this.house_id)
            console.log('添加收藏', data)
            this.isCollectionShow = true
          }
          this.collectionLoading = false
        } catch (err) {
          console.log(err)
        }
      } else {
        this.$toast('请先登录')
        this.$router.push({ name: 'login' })
      }
    }
  },
  computed: {},
  watch: {
    $route (to, from) {
      // console.log(to)
      // console.log(from)
      this.$router.go(0)
    }
  },
  filters: {},
  components: {
    NavBar
  }
}
</script>

<style scoped lang="less">
.house {
  padding-top: 45px;
  padding-bottom: 50px;
  background-color: #f6f5f6;
  .MyNavbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    width: 99.8%;
  }

  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }

  .van-swipe {
    width: 100%;
    height: 230px;
  }

  .house-info {
    width: 99.8%;
    background-color: #fff;
    padding: 15px;
    margin-bottom: 5px;
    p {
      font-size: 16px;
      color: #333;
      margin: 16px 0 0 0;
    }
    .subway {
      color: #39becd;
      background: #e1f5f8;
      display: inline-block;
      font-size: 12px;
      border-radius: 3px;
      padding: 4px 5px;
      margin-right: 5px;
      line-height: 12px;
    }

    .middle {
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-top: 1px solid #cecece;
      border-bottom: 1px solid #cecece;
      margin: 15px 0;
      padding: 15px 0;
      i {
        font-size: 14px;
        color: #999;
        font-weight: normal;
      }
      .one,
      .two,
      .three {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        color: #fa5741;
        font-size: 18px;
        font-weight: bolder;
        span {
          font-size: 12px;
        }
      }
    }

    .zhuangxiu {
      display: flex;
      .left,
      .right {
        flex: 1;
        font-size: 13px;
        color: #999;
        span {
          color: #333;
        }
      }
    }
  }

  .map {
    width: 99.8%;
    h4 {
      padding: 0 11px;
      height: 44px;
      background-color: #fff;
      line-height: 44px;
      font-size: 14px;
      font-weight: normal;
      color: #333;
    }
    .bottom {
      height: 145px;
      background-color: pink;
    }
  }

  .house-facilities {
    width: 99.8%;
    background-color: #fff;
    padding: 0 10px;
    margin-bottom: 5px;
    p {
      font-size: 15px;
      padding: 15px 0;
      border-bottom: 1px solid #cecece;
    }
    .van-grid {
      .iconfont {
        font-size: 25px;
      }
    }
  }

  .house-circumstance {
    width: 99.8%;
    background-color: #fff;
    padding: 0 10px;
    margin-bottom: 8px;
    p {
      font-size: 15px;
      padding: 15px 0;
      border-bottom: 1px solid #cecece;
      margin-bottom: 10px;
    }
    .homeowner {
      .top {
        position: relative;
        display: flex;
        height: 62px;
        .left {
          display: flex;
          img {
            width: 52px;
            height: 52px;
          }
          .info {
            display: flex;
            margin-left: 10px;
            align-items: center;
            justify-content: space-around;
            flex-direction: column;
            .name {
              font-size: 13px;
              color: #333;
              margin-right: 25px;
            }
            .renzheng {
              font-size: 12px;
              color: #fa5741;
            }
          }
        }

        .right {
          position: absolute;
          right: 10px;
          span {
            right: 15px;
            top: 25px;
            color: #33be85;
            border: 1px solid #33be85;
            border-radius: 3px;
            padding: 3px 15px;
            font-size: 14px;
          }
        }
      }

      .bottom {
        padding: 10px 0;
        font-size: 14px;
        color: #333;
      }
    }
  }

  .like {
    width: 99.8%;
    background-color: #fff;
    padding: 0 10px;
    margin-bottom: 8px;
    p {
      font-size: 15px;
      padding: 15px 0;
      border-bottom: 1px solid #cecece;
      margin-bottom: 10px;
    }

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
  }

  .footer {
    display: flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #cecece;
    text-align: center;
    font-size: 17px;
    color: #999;
    background-color: #fff;
    div {
      flex: 1;
      border-right: 1px solid #e8e8e9;
    }
    .Phone {
      background-color: #21b97a;
      color: #fff;
    }
  }
}
</style>
