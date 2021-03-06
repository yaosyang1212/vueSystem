import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// 登录路由
import login from '@/components/login'
// 主页路由
import home from '@/components/home'
// 欢迎路由
import welcome from '@/components/welcome'
import users from '@/components/user/users'
import rights from '@/components/power/rights'
import roles from '@/components/power/roles'
import categories from '@/components/goods/categories'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      // 登录页面的路由规则
      path: '/login',
      component: login
    },
    {
      // 主页路由规则
      path: '/home',
      component: home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: welcome },
        { path: '/users', component: users },
        { path: '/rights', component: rights },
        { path: '/roles', component: roles },
        { path: '/categories', component: categories }
      ]
    }
  ]
})
