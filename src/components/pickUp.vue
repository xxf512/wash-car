<!--
 * @Author: your name
 * @Date: 2020-06-03 15:03:38
 * @LastEditTime: 2020-06-08 16:00:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wash-car\src\components\pickUp.vue
-->
<template>
  <div>
    <van-nav-bar
      title="接车单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tabs v-model="active" @click="onClick" color='#1989fa' title-active-color='#1989fa'>
      <van-tab :title='`服务中 (${orderList.length})`' name='SERVICEING'>
        <tabItem :orderList='orderList' @refresh='refresh'/>
      </van-tab>
      <van-tab :title='`已提车 (${orderList.length})`' name='COLLECTED'>
        <tabItem :orderList='orderList' type='COLLECTED' @refresh='refresh'/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import tabItem from './tabItem'
export default {
  data () {
    return {
      active: 'SERVICEING',
      orderList: []
    }
  },

  components: {
    tabItem
  },

  computed: {},

  mounted () {
    this.initInfo()
  },

  methods: {
    refresh (state) {
      this.initInfo(state)
    },
    onClick (name, title) {
      this.initInfo(name)
    },
    onClickLeft () {
      this.$router.back(-1)
    },
    initInfo (state = 'SERVICEING') {
      // 订单状态;SERVICEING(服务中);COLLECTED(已提车) 默认'服务中'
      this.$axios.post('/adboss/wechartH5/orderListQuery', { orderStatus: state }).then(({ data }) => {
        if (data.retCode === '0000') {
          this.orderList = data.orderVoList
        }
      })
    }
  }
}

</script>
<style lang='less' scoped>
</style>
