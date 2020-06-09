/*
 * @Author: your name
 * @Date: 2020-06-01 11:35:52
 * @LastEditTime: 2020-06-09 10:05:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wash-car\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { index: 0 }, // meta对象的index用来定义当前路由的层级,由小到大,由低到高
    component: Home
  },
  {
    path: '/from',
    name: 'From',
    meta: { index: 1 },
    component: () => import(/* webpackChunkName: "from" */ '../components/from.vue')
  },
  {
    path: '/pickUp',
    name: 'PickUp',
    meta: { index: 1 },
    component: () => import(/* webpackChunkName: "pickUp" */ '../components/pickUp.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  // 判断是否在浏览器
  const getUrlParams = Vue.prototype.$tools.auth.getUrlParams
  if (getUrlParams('retCode') === '5555') {
    Vue.prototype.$dialog.alert({
      message: getUrlParams('retMsg')
    })
    return
  }
  // 获取token
  const token = Vue.prototype.$tools.auth.getToken()
  // 调用初始化接口
  var xhr = new XMLHttpRequest()
  xhr.open('POST', '/adboss/wechartH5/initIndex', false)
  xhr.setRequestHeader('token', token)
  xhr.send()
  let res
  if (xhr.status === 200) {
    res = JSON.parse(xhr.responseText)
  } else {
    res = null
  }
  if (res && res.retCode === '0000') {
    next()
  } else if (res && res.retCode === '9999') {
    // 跳转到授权页面
    Vue.prototype.$dialog.alert({
      message: '登录过期,请重新授权！'
    }).then(() => {
      Vue.prototype.$tools.auth.setToken()
      window.location.href = res.retMsg
    })
  } else {
    Vue.prototype.$dialog.alert({
      message: res.retMsg
    })
  }
})

export default router
