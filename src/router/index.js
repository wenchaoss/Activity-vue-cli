import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import share from '@/components/share'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: index
    },
    {
      path:'/share',
      name: '分享页面',
      component: share
    }
  ]
})
