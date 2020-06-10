<!--
 * @Author: your name
 * @Date: 2020-06-03 15:03:38
 * @LastEditTime: 2020-06-10 16:03:33
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
      <van-tab :title='`服务中 (${serviceingLength})`' name='SERVICEING'>
        <van-list
          v-model="serviceingLoading"
          :immediate-check='false'
          :finished="serviceingFinished"
          finished-text="没有更多了"
          @load="serviceingOnLoad"
        >
          <tabItem :orderList='serviceingOrderList' @refresh='refresh'/>
        </van-list>
      </van-tab>
      <van-tab :title='`已提车 (${collectedLength})`' name='COLLECTED'>
        <van-list
          v-model="collectedLoading"
          :immediate-check='false'
          :finished="collectedFinished"
          finished-text="没有更多了"
          @load="collectedOnLoad"
        >
          <tabItem :orderList='collectedOrderList' type='COLLECTED' @refresh='refresh'/>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import tabItem from './tabItem'
export default {
  data () {
    return {
      serviceingPageNum: 1,
      collectedPageNum: 1,
      serviceingLoading: false,
      serviceingFinished: false,
      collectedLoading: false,
      collectedFinished: false,
      active: 'SERVICEING',
      serviceingLength: 0,
      collectedLength: 0,
      serviceingOrderList: [],
      collectedOrderList: []
    }
  },

  components: {
    tabItem
  },

  computed: {},

  mounted () {
    this.initInfo()
    this.initInfo('COLLECTED')
  },

  methods: {
    serviceingOnLoad () {
      // this.initInfo()
      if (this.serviceingOrderList.length < this.serviceingLength) {
        this.initInfo('SERVICEING', ++this.serviceingPageNum)
      }
      if (this.serviceingOrderList.length >= this.serviceingLength) {
        this.serviceingFinished = true
      }
    },
    collectedOnLoad () {
      // this.initInfo('COLLECTED')
      if (this.collectedOrderList.length < this.collectedLength) {
        this.initInfo('COLLECTED', ++this.collectedPageNum)
      }
      if (this.collectedOrderList.length >= this.collectedLength) {
        this.collectedFinished = true
      }
    },
    refresh (state) {
      this[`${state.toLocaleLowerCase()}OrderList`] = []
      this[`${state.toLocaleLowerCase()}Finished`] = false
      this[`${state.toLocaleLowerCase()}PageNum`] = 1
      this.initInfo()
      this.collectedOrderList = []
      this.collectedFinished = false
      this.collectedPageNum = 1
      this.initInfo('COLLECTED')
    },
    onClick (name, title) {
      this[`${name.toLocaleLowerCase()}OrderList`] = []
      this[`${name.toLocaleLowerCase()}Finished`] = false
      // this[`${name.toLocaleLowerCase()}Loading`] = false
      this[`${name.toLocaleLowerCase()}PageNum`] = 1
      this.initInfo(name)
    },
    onClickLeft () {
      this.$router.back(-1)
    },
    initInfo (state = 'SERVICEING') {
      // 订单状态;SERVICEING(服务中);COLLECTED(已提车) 默认'服务中'
      this.$axios.post('/adboss/wechartH5/orderListQuery', {
        orderStatus: state,
        pageNum: this[`${state.toLocaleLowerCase()}PageNum`]
      }).then(({ data }) => {
        if (data.retCode === '0000') {
          this[`${state.toLocaleLowerCase()}Length`] = data.recordCount
          this[`${state.toLocaleLowerCase()}OrderList`].push(...data.orderVoList)
          this[`${state.toLocaleLowerCase()}Loading`] = false
        }
      })
    }
  }
}

</script>
<style lang='less' scoped>
</style>
