<!--
 * @Author: your name
 * @Date: 2020-06-01 11:35:52
 * @LastEditTime: 2020-06-03 15:05:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wash-car\src\views\Home.vue
-->
<template>
  <div class="main">
    <van-nav-bar
      title="车颜控"
    />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <van-grid>
      <van-grid-item text="接车单" icon='logistics' to='/pickUp'>
      </van-grid-item>
      <van-grid-item text="洗车开单" icon='send-gift-o' to="/from">
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>

export default {
  components: {
  },
  mounted () {
  }
}
</script>
<style scoped lang="less">
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>
