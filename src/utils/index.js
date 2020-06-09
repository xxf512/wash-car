/*
 * @Author: your name
 * @Date: 2020-06-05 17:03:09
 * @LastEditTime: 2020-06-05 17:09:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wash-car\src\utils\index.js
 */
import auth from './auth'

export default (Vue) => {
  Vue.prototype.$tools = {
    auth
  }
}
