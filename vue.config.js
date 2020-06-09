/*
 * @Author: your name
 * @Date: 2020-06-04 14:22:07
 * @LastEditTime: 2020-06-08 17:46:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wash-car\vue.config.js
 */
module.exports = {
  // lintOnSave: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'cheap-module-source-map',
    devServer: {
      disableHostCheck: true,
      // port: 8902,
      proxy: {
        '/adboss/wechartH5/': {
          target: 'http://cheyankong.nat300.top',
          // target: 'http://epabt3.natappfree.cc/adboss',
          changeOrigin: true,
          logLevel: 'debug',
          pathRewrite: {
            '^/': ''
          }
        }
      }
    }
  }
}
