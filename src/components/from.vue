<template>
  <div class="from">
    <van-nav-bar
      title="洗车开单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field
          name="licenseNumber"
          label="车牌号"
        >
        <template #input>
          <digit-input v-model="licenseNumber"/>
          <van-uploader :after-read="afterRead" :before-read="beforeRead">
            <van-icon class="icon-scan" name="photograph"/>
          </van-uploader>
        </template>
      </van-field>
      <van-field
        v-model="clientName"
        name="clientName"
        label="客户姓名"
        placeholder="请输入客户姓名"
      />
      <van-field name="gender" label="性别">
        <template #input>
          <van-radio-group v-model="gender" direction="horizontal">
            <van-radio name="MALE">先生</van-radio>
            <van-radio name="FEMALE">女士</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="phoneNum"
        name="phoneNum"
        maxlength='11'
        oninput="value=value.replace(/[^\d]/g,'')"
        label="手机号码"
        placeholder="请输入手机号码"
      />
      </van-cell-group>
      <van-cell-group style="margin-top: 10px;">
        <van-field
          readonly
          clickable
          name="estimatedDeliveryDate"
          :value="estimatedDeliveryDate"
          label="预计交车"
          placeholder="点击选择预计交车时间"
          @click="showTime = true"
        />
      <van-popup v-model="showTime" position="bottom">
        <van-datetime-picker
          type="datetime"
          :formatter="formatter"
          v-model="currentDate"
          @confirm="onConfirm"
          @cancel="showTime = false"
        />
      </van-popup>
        <van-cell title="业务员" is-link :value="businessManagerName" />
        <van-field
          readonly
          clickable
          name="technicianName"
          :value="technicianName"
          input-align="right"
          right-icon="arrow"
          label="技师"
          placeholder="请选择技师"
          @click="showUser = true"
        />
        <van-popup v-model="showUser" position="bottom">
          <van-picker
            show-toolbar
            value-key='showName'
            :columns="columns"
            @confirm="onConfirmUser"
            @cancel="showUser = false"
          />
        </van-popup>
        <van-field
          v-model="chargeMsg"
          name="chargeMsg"
          rows="2"
          autosize
          label="嘱咐"
          type="textarea"
          maxlength="225"
          placeholder="请输入客户嘱咐"
          show-word-limit
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <van-overlay :show="showOverlay" class="wrapper">
        <van-loading size="24px" vertical>车牌号识别中...</van-loading>
    </van-overlay>
  </div>
</template>

<script>
import rotateImg from '../utils/romoteImg.js'
import digitInput from './digitInput'
import * as imageConversion from 'image-conversion'
export default {
  data () {
    return {
      showOverlay: false,
      initInfoObj: {},
      showTime: false,
      showUser: false,
      licenseNumber: '',
      clientName: '',
      chargeMsg: '',
      currentDate: new Date(),
      gender: '',
      phoneNum: '',
      estimatedDeliveryDate: '',
      businessManagerName: '',
      columns: [],
      technicianId: '',
      technicianName: ''
    }
  },
  components: {
    digitInput
  },
  mounted () {
    this.initInfo()
  },
  methods: {
    beforeRead (file) {
      console.log('原始文件', file)
      return new Promise((resolve, reject) => {
        if (file.size > 1000000) {
          // 压缩至800k
          this.showOverlay = true
          rotateImg(file).then(img => {
            imageConversion.compressAccurately(img, 800).then(res => {
              const img = new File([res], file.name)
              resolve(img)
            })
          })
        } else {
          this.showOverlay = true
          resolve(file)
        }
      })
    },
    initInfo () {
      this.$axios.post('/adboss/wechartH5/initCreateOrder', {}).then(({ data }) => {
        this.initInfoObj = JSON.parse(JSON.stringify(data))
        const { technicianList, businessManagerName, estimatedDeliveryDate } = this.initInfoObj
        this.columns = technicianList.slice()
        this.businessManagerName = businessManagerName
        this.estimatedDeliveryDate = estimatedDeliveryDate
        this.currentDate = new Date(estimatedDeliveryDate)
      })
    },
    formatter (type, val) {
      const obj = {
        year: '年',
        month: '月',
        day: '日',
        hour: '时',
        minute: '分'
      }
      return `${val}${obj[type]}`
    },
    // 日期格式化
    dateFormat (fmt, date) {
      let ret
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        };
      }
      return fmt
    },
    onClickLeft () {
      this.$router.back(-1)
    },
    onConfirmUser (value) {
      this.technicianName = value.showName
      this.technicianId = value.id
      this.showUser = false
    },
    onConfirm (time) {
      this.estimatedDeliveryDate = this.dateFormat('YYYY-mm-dd HH:MM', time)
      this.showTime = false
    },
    afterRead (file) {
      console.log('压缩文件', file)
      this.$axios.post('/adboss/wechartH5/distinLicenseNumber', { imgFileBase64: file.content }).then(({ data }) => {
        console.log(data)
        if (data.retCode === '0000') {
          const { licenseNumber } = data
          this.showOverlay = false
          this.$toast.success('识别成功！')
          // 填充数据
          this.licenseNumber = licenseNumber.split('').map(i => {
            return {
              value: i
            }
          })
          // 根据车牌号查询用户信息
          this.$axios.post('/adboss/wechartH5/clientInfoQuery', { licenseNumber: licenseNumber }).then(({ data }) => {
            if (data.retCode === '0000') {
              const { clientName, phoneNum, gender } = data
              this.clientName = clientName
              this.phoneNum = phoneNum
              this.gender = gender
            }
          })
        } else {
          this.showOverlay = false
          this.$toast.fail(data.retMsg || '识别失败，请手动输入！')
        }
      }).catch((error) => {
        console.log(error)
        this.showOverlay = false
        this.$toast.fail('识别失败，请手动输入！')
      })
    },
    onSubmit (val) {
      const { clientName, phoneNum, gender, estimatedDeliveryDate, technicianId, chargeMsg } = this
      const licenseNumber = (this.licenseNumber || []).reduce((p, i) => {
        p += i.value
        return p
      }, '')
      if (
        licenseNumber.length !== 7 || !clientName ||
        !phoneNum || !gender || !estimatedDeliveryDate || !technicianId
      ) {
        this.$toast.fail('请检查输入！')
      } else {
        // 确认开单
        const paramer = {
          clientName,
          phoneNum,
          gender,
          estimatedDeliveryDate,
          technicianId,
          chargeMsg,
          licenseNumber,
          orderNum: this.initInfoObj.orderNum
        }
        console.log(paramer)
        this.$axios.post('/adboss/wechartH5/comfirmOrder', paramer).then(({ data }) => {
          if (data.retCode === '0000') {
            this.$toast.success('开单成功！')
            this.$router.back(-1)
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.from {
  .icon-scan {
    margin-left: 30px;
    font-size: 25px;
    color: #333333;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
