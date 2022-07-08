import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import { Toast } from 'vant'
import Login from '@/views/login'
import Home from '@/views/Home'
import FindRoom from '@/views/FindRoom'
import Information from '@/views/Information'
import My from '@/views/My'

Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'findroom',
        name: 'findroom',
        component: FindRoom
      },
      {
        path: 'information',
        component: Information
      },
      {
        path: 'my',
        name: 'my',
        component: My
      }
    ]
  },
  {
    path: '/baiduditu',
    name: 'baiduditu',
    component: () => import('@/views/Home/BaiDu.vue')
  },
  {
    path: '/citylist',
    name: 'citylist',
    component: () => import('@/views/cityList')
  },
  {
    path: '/house/:house_id/:houseObj',
    props: true,
    name: 'house',
    component: () => import('@/views/house')
  },
  {
    path: '/mycollection',
    name: 'mycollection',
    component: () => import('@/views/My/components/MyCollection.vue')
  },
  {
    path: '/myhire',
    name: 'myhire',
    component: () => import('@/views/My/components/MyHire.vue')
  },
  {
    path: '/gorent',
    name: 'gorent',
    component: () => import('@/views/GoRent')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (to.path !== '/mycollection' && to.path !== '/myhire' && to.path !== '/gorent') {
    next()
  } else {
    if (token) {
      next()
    } else {
      Toast('请先登录')
      next('/login')
    }
  }
})

export default router
