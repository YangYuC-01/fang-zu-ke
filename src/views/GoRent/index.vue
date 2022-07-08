<template>
  <div class="go-rent" :class="{pd:!searchShow}">
    <SearchHouse
      @onCancel="searchShow = false"
      v-show="searchShow"
      @searchHouse="houseName = $event.communityName,community=$event.community"
    ></SearchHouse>
    <div v-show="!searchShow">
      <!-- 导航栏 -->
      <NavBar title="发布房源" class="MyNavbar"></NavBar>
      <h3 class="title" style="color:#21b97a;font-size:15px;">房源信息</h3>
      <!-- 房源信息 -->
      <div class="house-information">
        <van-cell title="小区名称" is-link :value="houseName" @click="searchShow = true" />

        <van-field v-model="zuJin" type="number" label="租金" placeholder="请输入租金/月">
          <template #extra>
            <span style="color:#888">￥/月</span>
          </template>
        </van-field>

        <van-field v-model="mianJi" type="number" label="建筑面积" placeholder="请输入建筑面积">
          <template #extra>
            <span style="color:#888">m²</span>
          </template>
        </van-field>

        <van-cell title="户型" is-link :value="huXingText" @click="popShow=true,isComShow='HuXing'" />

        <van-cell
          title="所在楼层"
          is-link
          :value="louCengText"
          @click="popShow=true,isComShow='LouCeng'"
        />

        <van-cell
          title="朝向"
          is-link
          :value="chaoXiangText"
          @click="popShow=true,isComShow='ChaoXiang'"
        />
      </div>

      <!-- 弹出层 -->

      <van-popup v-model="popShow" position="bottom" :style="{ height: '40%' }">
        <component
          :is="isComShow"
          :housesParamsList="housesParamsList"
          @onCancel="popShow = false"
          @HXConfirm="huXingValue=$event.value,huXingText=$event.text"
          @LCConfirm="louCengValue=$event.value,louCengText=$event.text"
          @CXConfirm="chaoXiangValue=$event.value,chaoXiangText=$event.text"
        ></component>
      </van-popup>

      <!-- 房屋标题 -->
      <p class="house-title">房屋标题</p>
      <van-field
        :border="false"
        v-model="houseTitle"
        rows="1"
        autosize
        type="textarea"
        placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
      />

      <!-- 房屋图像 -->
      <p class="house-image">房屋图像</p>
      <!-- 上传图片 -->
      <van-uploader v-model="fileList" multiple :max-count="3" :after-read="afterRead" />

      <!-- 房屋配置 -->
      <p class="house-disposition">房屋配置</p>

      <div class="house-facilities">
        <van-grid :column-num="5" :border="false">
          <van-grid-item
            text="衣柜"
            @click="getFilterIcon('衣柜')"
            :class="{selected:setSelected('衣柜')}"
          >
            <template #icon>
              <i class="iconfont icon-yigui"></i>
            </template>
          </van-grid-item>

          <van-grid-item
            text="洗衣机"
            @click="getFilterIcon('洗衣机')"
            :class="{selected:setSelected('洗衣机')}"
          >
            <template #icon>
              <i class="iconfont icon-xiyiji"></i>
            </template>
          </van-grid-item>

          <van-grid-item
            text="空调"
            @click="getFilterIcon('空调')"
            :class="{selected:setSelected('空调')}"
          >
            <template #icon>
              <i class="iconfont icon-kongtiao"></i>
            </template>
          </van-grid-item>

          <van-grid-item
            text="天然气"
            @click="getFilterIcon('天然气')"
            :class="{selected:setSelected('天然气')}"
          >
            <template #icon>
              <i class="iconfont icon-meiqitianranqi"></i>
            </template>
          </van-grid-item>

          <van-grid-item
            text="冰箱"
            @click="getFilterIcon('冰箱')"
            :class="{selected:setSelected('冰箱')}"
          >
            <template #icon>
              <i class="iconfont icon-bingxiang"></i>
            </template>
          </van-grid-item>

          <van-grid-item
            text="暖气"
            @click="getFilterIcon('暖气')"
            :class="{selected:setSelected('暖气')}"
          >
            <template #icon>
              <i class="iconfont icon-nuanqi"></i>
            </template>
          </van-grid-item>

          <van-grid-item
            text="电视"
            @click="getFilterIcon('电视')"
            :class="{selected:setSelected('电视')}"
          >
            <template #icon>
              <i class="iconfont icon-dianshiji"></i>
            </template>
          </van-grid-item>

          <van-grid-item
            text="热水器"
            @click="getFilterIcon('热水器')"
            :class="{selected:setSelected('热水器')}"
          >
            <template #icon>
              <i class="iconfont icon-reshuiqianzhuang"></i>
            </template>
          </van-grid-item>

          <van-grid-item
            text="宽带"
            @click="getFilterIcon('宽带')"
            :class="{selected:setSelected('宽带')}"
          >
            <template #icon>
              <i class="iconfont icon-kuandai"></i>
            </template>
          </van-grid-item>

          <van-grid-item
            text="沙发"
            @click="getFilterIcon('沙发')"
            :class="{selected:setSelected('沙发')}"
          >
            <template #icon>
              <i class="iconfont icon-shafa"></i>
            </template>
          </van-grid-item>
        </van-grid>
      </div>

      <!-- 房屋描述 -->
      <p class="house-text">房屋描述</p>

      <van-field
        v-model="houseText"
        rows="2"
        autosize
        type="textarea"
        maxlength="100"
        placeholder="请输入房屋描述信息"
        show-word-limit
      />

      <!-- 底部按钮 -->
      <div class="footer">
        <div class="cancel" @click="quXiao">取消</div>
        <div class="submit" @click="submit">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import SearchHouse from './components/SearchHouse.vue'
import HuXing from './components/HuXing.vue'
import LouCeng from './components/LouCeng.vue'
import ChaoXiang from './components/ChaoXiang.vue'
// eslint-disable-next-line no-unused-vars
import { houseParams, setImages, publishHouse } from '@/api/goRent'
const formData = new FormData()
export default {
  name: 'GoRent',
  created () {
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    this.getHousesParamsList()
  },
  data () {
    return {
      searchShow: false, // 搜索显示
      houseName: '请输入小区名称',
      community: '', // 房子地址ID
      housesParamsList: {}, // 发布需要的条件
      zuJin: '', // 租金
      mianJi: '', // 面积
      huXingValue: '', // 户型
      huXingText: '请选择',
      louCengValue: '', // 楼层
      louCengText: '请选择',
      chaoXiangValue: '', // 朝向
      chaoXiangText: '请选择',
      houseTitle: '', // 房屋标题
      houseText: '', // 房屋描述
      iconList: [], // 房屋配置图标
      popShow: false, // 弹出层显示
      isComShow: '', // 显示哪个弹出层
      fileList: [],
      formData: null,
      houseImg: []
    }
  },
  methods: {
    // 获取发布条件
    async getHousesParamsList () {
      try {
        const { data } = await houseParams()
        console.log(data)
        this.housesParamsList = data.body
        this.$toast.success('获取发布条件成功')
      } catch (err) {
        this.$toast.fail('获取发布条件失败,请重试')
        console.log(err)
      }
    },
    // 房屋配置
    getFilterIcon (str) {
      const flag = this.iconList.some(item => item === str)
      if (flag) {
        const index = this.iconList.findIndex(item => item === str)
        this.iconList.splice(index, 1)
      } else {
        this.iconList.push(str)
      }
    },
    // 高亮
    setSelected (str) {
      return this.iconList.some(item => item === str)
    },
    // 上传图片
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      formData.append('file', file.file) // 获取上传图片信息
      this.formData = formData
    },
    // 取消
    quXiao () {
      this.$dialog.confirm({
        title: '提示',
        message: '放弃发布房源？'
      })
        .then(() => {
          this.$router.go(-1)
        })
        .catch(() => {
          // on cancel
        })
    },
    // 提交
    async submit () {
      if (!this.fileList.length) {
        return this.$toast.fail('请上传房屋图片')
      } else {
        // 上传图片请求
        const { data } = await setImages(this.formData)
        console.log('上传图片', data)
        // 处理返回的图片地址
        data.body.forEach(item => {
          this.houseImg.push(item)
        })
        const str = this.houseImg.join('|')
        // 判断图片地址是否返回
        if (str) {
          // 判断小区名称是否选择
          if (this.houseName === '请输入小区名称') {
            this.$toast('请输入小区名称')
            return
          }

          // loading框
          this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0
          })
          // 处理已上传的图片数据
          this.fileList.forEach(item => {
            item.url = item.content
          })

          // 发布房源网络请求
          try {
            const { data } = await publishHouse({
              title: this.houseTitle,
              description: this.houseText,
              houseImg: str,
              oriented: this.chaoXiangValue, // 朝向
              supporting: this.iconList.join('|'), // 配置
              price: this.zuJin, // 租金
              roomType: this.huXingValue, // 房型
              size: this.mianJi,
              floor: this.louCengValue, // 楼层
              tempSlides: this.fileList,
              community: this.community // 地址ID
            })
            console.log(data)
            this.$toast.success('')
            // 确认框
            this.$dialog.confirm({
              title: '提示',
              message: '房源发布成功',
              confirmButtonText: '继续发布',
              confirmButtonColor: '#108ee9',
              cancelButtonText: '去查看'
            })
              .then(() => {
              })
              .catch(() => {
                this.$router.push({ name: 'myhire' })
              })
          } catch (err) {
            console.log(err)
            this.$toast.fail('发布失败,请重新选择数据')
          }
        }
        // 清除图片上传数据
        this.formData = []
        this.houseImg = []
        this.fileList = []
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    NavBar,
    SearchHouse,
    HuXing,
    LouCeng,
    ChaoXiang
  }
}
</script>

<style scoped lang='less'>
.go-rent {
  background-color: #f5f5f9;
  .MyNavbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  .title,
  .house-title,
  .house-image,
  .house-disposition,
  .house-text {
    color: #333;
    background-color: #fff;
    font-size: 14px;
    padding: 15px 15px 9px;
    font-weight: normal;
    border-bottom: 1px solid #ddd;
  }

  .van-uploader {
    padding: 9px 8px 0;
    margin-bottom: 15px;
    background-color: #fff;
    width: 100%;
  }

  .house-facilities {
    padding-bottom: 20px;
    .van-grid {
      .iconfont {
        font-size: 25px;
      }
    }
  }

  .footer {
    height: 45px;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    div {
      flex: 1;
      font-size: 15px;
      text-align: center;
      line-height: 45px;
    }

    .cancel {
      background-color: #fff;
      color: #21b97a;
    }
    .submit {
      background-color: #21b97a;
      color: #fff;
    }
  }
}
.pd {
  padding-top: 45px;
  padding-bottom: 70px;
}
/deep/.selected {
  color: #21b97a !important;
  .van-grid-item__text {
    color: #21b97a !important;
  }
}
</style>
