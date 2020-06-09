<template>
  <div class="abbreviation">
    <div class="title">
      <span @click="save">完成</span>
    </div>
    <van-divider :style="{ marginTop: '0' }"/>
    <div class="content">
      <van-row v-for="(item, index) in data" :key="index" type="flex" justify="space-around">
        <van-col v-for="(i, idx) in item" span="2" :key="`i${idx}`">
          <div
            class="item"
            :class="{'active': currentIndex === i}"
            @click="handleClick(i)">{{ i}}</div>
        </van-col>
        <van-col span='2' v-if="index === 4">
          <div
            class="item"
            :class="{'active': currentIndex === -1}"
            @click="handleDel">
            <van-icon name="delete"/>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [
        ['京', '沪', '粤', '浙', '津', '渝', '川'],
        ['苏', '鄂', '皖', '湘', '闽', '黑', '吉'],
        ['辽', '鲁', '冀', '甘', '陕', '宁', '豫'],
        ['晋', '赣', '琼', '贵', '黔', '云', '桂'],
        ['青', '新', '蒙', '藏', '使', '临']
      ],
      currentIndex: ''
    }
  },

  components: {},

  computed: {},

  mounted () {},

  methods: {
    save () {
      this.$emit('save')
    },
    handleDel () {
      this.currentIndex = -1
      this.$emit('del')
    },
    handleClick (val) {
      this.currentIndex = val
      this.$emit('input', val)
    }
  }
}

</script>
<style lang='less' scoped>
.abbreviation {
  // padding: 20px 10px 10px;
  height: 100%;
  .title {
    text-align: right;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-weight: 600;
    color: #1989fa;
    padding: 0 10px 0;
  }
  .content {
    position: relative;
    height: 225px;
    .item {
      font-size: 18px;
      text-align: center;
      height: 35px;
      line-height: 35px;
      border: 1px solid #1989fa;
      color: #1989fa;
      border-radius: 5px;
      margin-bottom: 5px;
      font-weight: 600;
    }
    .active {
      color: #ffffff;
      background-color: #1989fa;
    }
  }
}
</style>
