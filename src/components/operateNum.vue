<template>
    <div class="m-num-operation">
        <a href="javascript:;" class="minus" :class="[minNum>=inputNum?'disabled':'']" @click="subNum">-</a>
        <div class="num-box">
            <input class="number" @change="updateItemNum" v-model="inputNum" type="number" />
        </div>
        <a href="javascript:;" class="plus" :class="[maxNum<=inputNum?'disabled':'']" @click="addNum">+</a>
    </div>
</template>
<script type="text/javascript">
    export default {
      name: 'operateNum',
      props: {
        minNum: Number,
        maxNum: Number,
        inputVal: {
          type: Number,
          default: 1,
        },
        step: {
          type: Number,
          default: 1,
        },
      },
      data() {
        return {
          inputNum: this.inputVal,
        };
      },
      methods: {
        // 点击减函数
        subNum() {
          if (this.inputNum - this.step < this.minNum) {
            return false;
          }
          this.$emit('subNumFn');
          return true;
        },
        // 点击增函数
        addNum() {
          if (this.inputNum + this.step > this.maxNum) {
            return false;
          }
          this.$emit('addNumFn');
          return true;
        },
        // 点击修改函数
        updateItemNum() {
          if (this.inputNum > this.maxNum) {
            this.inputNum = this.maxNum;
          } else if (this.inputNum < this.minNum) {
            this.inputNum = this.maxNum;
          }
          this.$emit('updateFn', this.inputNum);
        },
      },
      watch: {
        inputVal(val) {
          this.inputNum = val;
        },
      },
    };
</script>

