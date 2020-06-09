<!--
 * @Author: your name
 * @Date: 2020-06-01 11:35:52
 * @LastEditTime: 2020-06-03 16:09:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wash-car\src\App.vue
-->
<template>
  <div id="app" class="Router">
    <transition :name="transitionName">
      <router-view/>
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
</style>
<style lang="less">
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 300ms;
   position: absolute;
   width:100%;
   left:0;
}
.slide-left-leave-to {
  display: none;
}
.slide-right-leave-to {
  display: none;
}
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

</style>
