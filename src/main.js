/*
 * @Author: your name
 * @Date: 2020-06-01 11:35:52
 * @LastEditTime: 2020-06-09 10:12:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wash-car\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Utils from './utils'
import base from './utils/base'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'

import './assets/less/common.less'
import './rem'
// import './utils/axios'

Vue.use(Vant)
Vue.prototype.$baseUrl = base.url
Vue.prototype.$axios = axios
Vue.config.productionTip = false

// 请求拦截
axios.interceptors.request.use(config => {
  // fd50885f-d8b7-43f5-ba2d-5d7da1f07db4
  config.headers.token = window.global.$tools.auth.getToken() || ''
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
  // 请求成功
  // 1. 根据自己项目需求定制自己的拦截
  // 2. 然后返回数据
  if (response.data.retCode === '9999') {
    // 跳转到授权页面
    window.global.$dialog.alert({
      message: '登录过期,请重新授权！'
    }).then(() => {
      window.global.$tools.auth.setToken()
      window.location.href = response.data.retMsg
    })
    return
  }
  return response
}, error => {
  // 请求失败
  if (error && error.response) {
    switch (error.response.status) {
      case 500:
        console.log(error.response)
        window.global.$toast.fail('服务器异常！')
        break
      case 404:
        console.log(error.response)
        window.global.$toast.fail('无法访问此资源！')
        break
      default:
        // 如果以上都不是的处理
        return Promise.reject(error)
    }
  }
})

Vue.use(Utils)

window.global = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
