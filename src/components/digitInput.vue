<template>
  <div class="six-digit-wrapper">
    <input v-for="(item,index) in digits"
      :key="index"
      :ref="`ref${index}`"
      class="input"
      :class="{'active': currentInput === index}"
      v-model="item.value"
      type="text"
      @focus='onFocus(index)'
      @blur='onBlur(index)'
      @input="onInput(index)"
      @keyup.delete="onDelete(index)"
      maxlength="1" />
      <van-popup v-model="showPicker" position="bottom">
        <abbreviation @input="input" @del="del" @save='save'/>
      </van-popup>
  </div>
</template>
<script>
import abbreviation from './abbreviation'
export default {
  props: {
    value: {
      default: ''
    }
  },
  components: {
    abbreviation
  },
  data () {
    return {
      digits: [],
      currentInput: -1,
      showPicker: false
    }
  },
  computed: {
  },
  watch: {
    value: {
      handler (val) {
        if (!val) {
          this.digits = Array.from({ length: 7 }, () => ({ value: '' })).slice()
          return
        }
        this.digits = val
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    save () {
      this.showPicker = false
      if (this.digits[0].value) {
        this.$refs.ref1[0].focus()
      }
    },
    del () {
      this.$set(this.digits, 0, { value: '' })
    },
    input (val) {
      this.$set(this.digits, 0, { value: val })
    },
    onFocus (index) {
      this.currentInput = index
      if (index === 0) {
        this.$refs.ref0[0].setAttribute('readonly', 'readonly')
        setTimeout(() => {
          this.$refs.ref0[0].removeAttribute('readonly')
          this.showPicker = true
        }, 200)
        // this.showPicker = true
      }
    },
    onBlur (index) {
      this.currentInput = -1
    },
    onInput (index) {
      // index < 6 ，如果是第7格，不触发光标移动至下一个输入框。
      if (this.digits[index].value && index < 6) {
        this.$refs['ref' + (index + 1)][0].focus()
      }
      this.$emit('input', this.digits)
    },
    onDelete (index) {
      // 如果是第1格，不触发光标移动至上一个输入框
      if (index > 0) {
        this.$refs['ref' + (index - 1)][0].focus()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.six-digit-wrapper {
  display: flex;
  flex-direction: row;
  .input {
    display: flex;
    width: 18px;
    margin-left: 10px;
    font-size: 15px;
    color: #333333;
    text-align: center;
    outline: none; // 去除选中状态边框
    border: solid 2px #d2d2d2;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
  }
  .active {
    border: solid 2px #1989fa;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
  }
}
</style>
