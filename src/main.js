import Vue from 'vue'
import App from './App'
import router from './router'
// 导入全局样式
import './assets/css/global.css'
// 导入字体图标库
import './assets/fonts/iconfont.css'
// 导入axios
import axios from 'axios'
// 导入element
import ElementUI from 'element-ui'
Vue.use(ElementUI)
// 添加路由导航守卫，只有登录的情况下才可以访问有权限的页面，否则跳转到登录页面
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取令牌
  const token = sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})
// 配置axios的基本路径
axios.defaults.baseURL = 'http://www.liulongbin.top:8888/api/private/v1/'
Vue.prototype.$http = axios
// 在每次请求的请求头中，添加 token 令牌
axios.interceptors.request.use(
  function (config) {
    // 获取令牌
    const token = sessionStorage.getItem('token')
    // console.log(config)
    // 将令牌添加都每次的ajax中
    config.headers.Authorization = token
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
