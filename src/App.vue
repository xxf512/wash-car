<!--
 * @Author: your name
 * @Date: 2020-06-01 11:35:52
 * @LastEditTime: 2020-06-09 11:37:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wash-car\src\App.vue
-->
<template>
  <div id="app" class="router">
    <transition :name="transitionName">
      <router-view class="router-view"/>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: ''
    }
  },
  watch: { // 使用watch 监听$router的变化
    $route (to, from) {
      // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
    }
  }
}
</script>
<style>
.router-view {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}
</style>
<style lang="less">
.router {
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 300ms;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    perspective: 1000;
  }
  // .slide-left-leave-to {
  //   display: none;
  // }
  // .slide-right-leave-to {
  //   display: none;
  // }
  .slide-right-enter {
    opacity: 0;
    transform: translateX(-100%);
  }
  .slide-right-leave-active {
    opacity: 0;
    transform: translateX(100%);
  }
  .slide-left-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .slide-left-leave-active {
    opacity: 0;
    transform: translateX(-100%);
  }
}
</style>
