<!--
 * @Author: your name
 * @Date: 2020-06-03 15:19:49
 * @LastEditTime: 2020-06-08 17:47:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wash-car\src\components\tabItem.vue
-->
<template>
  <div class="pickUp">
    <!-- <van-cell v-for="item in list" :key="item">
      {{item}}
    </van-cell> -->
    <van-cell v-for="(item, index) in orderList" :key="index">
      <van-row gutter="20">
        <van-col span="4">
          <div class="left">
            <van-image
              round
              width="30px"
              height="30px"
              src="http://logo.16888.com/logoimage/200756165032737.jpg"
            />
            <div class="carName">上汽通用威朗</div>
          </div>
        </van-col>
        <van-col span="20">
          <div class="right">
            <div class="licenseNumber">
              <div class="label">
                <div>
                  <span style='font-weight: bold;'>{{item.licenseNumber}}</span>
                  <span style='margin-left: 5px; color: #909399; font-size: 12px;'>{{item.clientName}}</span>
                </div>
                <van-tag round type="primary">美容</van-tag>
              </div>
              <div class="btn" v-if="type === 'SERVICEING'">
                <van-button type="info" size="small" @click="handleClick(item)">确认提车</van-button>
              </div>
            </div>
            <div class="chargeMsg">
              <div class="msg">
                嘱咐： {{item.chargeMsg}}
              </div>
              <div class="tel">
                {{item.phoneNum}}
              </div>
            </div>
            <div class="time">
              <span>预交车时间：{{item.estimatedDeliveryDate}}</span>
            </div>
            <div class="bottom">
              <span>技术员：{{item.technicianName}}</span>
              <span style="margin-left: 10px;">{{item.createDate}}</span>
            </div>
          </div>
        </van-col>
      </van-row>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    orderList: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'SERVICEING'
    }
  },
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {
    handleClick (item) {
      this.$dialog.alert({
        title: '确定提车?',
        showCancelButton: true,
        beforeClose: (action, done) => {
          if (action === 'confirm') {
            this.$axios.post('/adboss/wechartH5/comfirmCollect', { orderNum: item.orderNum }).then(({ data }) => {
              if (data.retCode === '0000') {
                this.$toast.success('提车成功！')
                done()
                this.$emit('refresh', this.type)
              } else {
                this.$toast.fail(data.retMsg || '提车失败！')
                done()
              }
            }).catch((error) => {
              console.log(error)
              this.$toast.fail('服务器异常！')
              done()
            })
          } else {
            done()
          }
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.pickUp {
  .left {
    text-align: center;
    .carName {
      font-size: 12px;
      color: #909399;
    }
  }
  .right {
    .licenseNumber {
      // font-weight: bold;
      display: flex;
      justify-content: space-between;
      padding-bottom: 5px;
    }
    .chargeMsg {
      padding-bottom: 5px;
      display: flex;
      justify-content: space-between;
      .msg {
        font-size: 12px;
        color: #909399;
      }
      .tel {
        color: #409EFF;
        font-weight: bold;
      }
    }
    .time {
      padding-bottom: 5px;
    }
    .bottom {
      text-align: right;
    }
  }
}
</style>
