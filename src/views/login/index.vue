<template>
  <div class="login-content">
    <navBar title="账号登录"></navBar>

    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="username"
        name="username"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '请填写密码' },{pattern:/^[a-zA-Z0-9_-]{5,8}$/,message:'用户名格式5-8位的字母和数字'}]"
      />
      <van-field
        v-model="password"
        name="password"
        type="password"
        autocomplete
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' },{pattern:/^[a-zA-Z0-9_-]{5,12}$/,message:'密码格式5-12位的字母和数字'}]"
      />
      <div style="margin: 16px;">
        <van-button square color="#1cb676" block type="info" native-type="submit">登 录</van-button>
      </div>
      <div class="enroll">
        <a href="javascript:;">还没有账号，去注册~</a>
      </div>
    </van-form>
  </div>
</template>

<script>
import navBar from '@/components/NavBar'
import { login } from '@/api/login'
export default {
  name: 'Login',
  created () { },
  data () {
    return {
      username: 'itheima',
      password: '123456'
    }
  },
  methods: {
    async onSubmit (values) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(values)
        console.log(res)
        this.$store.commit('getAdd', res.data.body.token)
        this.$toast.success('登录成功')
        // this.$router.push({ name: 'my' })
        this.$router.go(-1)
      } catch (err) {
        this.$toast.fail('登录失败，请稍后重试')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    navBar
  }
}
</script>

<style scoped lang='less'>
.login-content {
  .form {
    margin-top: 30px;
    .van-cell {
      margin-top: 13px;
      height: 60px;
      font-size: 18px;
      border: none;
      /deep/ .van-cell__value {
        border-bottom: 2px solid #ddd;
      }
    }
    .van-cell::after {
      border: none;
    }
    .van-button {
      height: 50px;
      font-size: 13px;
    }

    /deep/.enroll {
      margin-top: 2 0px;
      display: flex;
      justify-content: center;
      a {
        color: #666;
        font-size: 14px;
      }
    }
  }
}
</style>
