/*
 * @Author: your name
 * @Date: 2020-06-05 17:00:22
 * @LastEditTime: 2020-06-09 10:03:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wash-car\src\utils\auth.js
 */
// import Vue from 'vue'
const auth = {
  getToken () {
    if (window.localStorage.getItem('token')) {
      return window.localStorage.getItem('token')
    }
    if (auth.getUrlParams('retCode') === '0000') {
      const token = auth.getUrlParams('token')
      window.localStorage.setItem('token', token)
      return token
    }
    return ''
  },
  setToken () {
    // 清除token
    window.localStorage.setItem('token', '')
    auth.getToken()
  },
  getUrlParams (name = '') {
    var url = window.location.search
    if (url.indexOf('?') === 1) { return false }
    url = url.substr(1)
    url = url.split('&')
    var nameres
    // 获取全部参数及其值
    for (var i = 0; i < url.length; i++) {
      var info = url[i].split('=')
      var obj = {}
      obj[info[0]] = decodeURI(info[1])
      url[i] = obj
    }
    // 如果传入一个参数名称，就匹配其值
    if (name) {
      for (var j = 0; j < url.length; j++) {
        for (const key in url[j]) {
          if (key === name) {
            nameres = url[j][key]
          }
        }
      }
    } else {
      nameres = url
    }
    // 返回结果
    return nameres
  }
}

export default auth
