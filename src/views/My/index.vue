<template>
  <div class="my-content">
    <div class="my-title">
      <div class="bg-image"></div>
      <div class="my-info">
        <div class="my-avatar">
          <img src="http://liufusong.top:8080/img/profile/avatar.png" v-if="!userInfo.avatar" />
          <img :src="`http://liufusong.top:8080${userInfo.avatar}`" v-else />
        </div>
        <div class="my-avatar1"></div>
        <span>{{ userInfo ? userInfo.nickname :'游客' }}</span>
        <button @click="$router.push({name:'login'})" v-if="!userInfo.avatar">去登录</button>
        <div class="quitbtn" v-else>
          <button @click="quitBtn">退出</button>
          <div></div>
          <span>
            编辑个人资料
            <van-icon name="play" />
          </span>
        </div>
      </div>
    </div>

    <van-grid :column-num="3" :border="false" class="my-function" :clickable="true">
      <van-grid-item icon="star-o" text="我的收藏" @click="myCollection" />
      <van-grid-item icon="wap-home-o" text="我的出租" @click="myHire" />
      <van-grid-item icon="clock-o" text="看房记录" />
      <van-grid-item icon="balance-list-o" text="成为房主" />
      <van-grid-item icon="manager-o" text="个人资料" />
      <van-grid-item icon="service-o" text="联系我们" />
    </van-grid>

    <div class="my-footer">
      <img src="http://liufusong.top:8080/img/profile/join.png" alt />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MY',
  created () {
    this.getUserInfo()
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async getUserInfo () {
      if (this.token) {
        try {
          const { data } = await getUserInfo()
          console.log(data)
          this.userInfo = data.body
        } catch (err) {
          console.log('获取用户信息', err)
          this.$toast('请先登录')
          this.$store.commit('getAdd', null)
          this.userInfo = {}
        }
      }
    },
    myCollection () {
      this.$router.push({ name: 'mycollection' })
    },
    myHire () {
      this.$router.push({ name: 'myhire' })
    },
    quitBtn () {
      this.$dialog.confirm({
        title: '提示',
        message: '是否确认退出'
      })
        .then(() => {
          this.$store.commit('getAdd', null)
          this.userInfo = {}
        })
        .catch(() => {

        })
    }
  },
  computed: {
    ...mapState(['token'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.my-content {
  padding-bottom: 50px;
  .my-title {
    position: relative;
    height: 300px;
    // background-color: pink;
    .bg-image {
      height: 191px;
      width: 100%;
      background: url("http://liufusong.top:8080/img/profile/bg.png") no-repeat;
      background-size: cover;
    }
    .my-info {
      z-index: 1;
      display: flex;
      align-items: center;
      flex-direction: column;
      position: absolute;
      bottom: 0;
      left: 28px;
      width: 319px;
      height: 165px;
      background-color: #fff;
      box-shadow: 0 0 10px 3px #ddd;
      font-size: 13px;
      span {
        margin-bottom: 15px;
      }

      button {
        width: 69px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background-color: #21b97a;
        color: #fff;
        border: none;
        border-radius: 5px;
      }

      .my-avatar {
        position: absolute;
        top: -35px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 1px;
        padding-bottom: 1px;
        width: 70px;
        height: 70px;
        background-color: #fff;
        border-radius: 50%;
        border: 5px solid #f5f5f5;
        box-shadow: 0 2px 2px #bdbdbd;

        img {
          width: 60px;
          height: 60px;
        }
      }
      .my-avatar1 {
        width: 70px;
        height: 55px;
        // background-color: skyblue;
      }
    }

    .quitbtn {
      position: relative;
      display: flex;
      justify-items: center;
      align-items: center;
      flex-direction: column;
      div {
        height: 30px;
        width: 69px;
      }
      span {
        color: #999;
        font-size: 12px;
      }
      button {
        top: -10px;
        width: 50px;
        height: 20px;
        position: absolute;
        margin-bottom: 3px;
        text-align: center;
        line-height: 20px;
        border-radius: 10px;
      }
    }
  }
  .my-function {
    margin-bottom: 5px;
    .van-grid-item {
      height: 97px;
      /deep/.van-grid-item__text {
        font-size: 13px;
      }
    }
    /deep/.van-icon {
      font-size: 22px;
    }
  }

  .my-footer {
    text-align: center;
    img {
      width: 345px;
      height: 85px;
    }
  }
}
</style>
