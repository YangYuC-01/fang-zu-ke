import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/base.css'
import '@/style/iconfont/iconfont.css'
import Vant from 'vant'
// 引入全部样式
import 'vant/lib/index.less'

import 'amfe-flexible'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
