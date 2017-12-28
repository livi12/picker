<template>
    <div>
        <transition name="fade">
            <div class="mask" :class="[pickerShow?'show':'']" @click="cancel"></div>
        </transition>
        <transition name="animate">
            <div class="picker"  :class="[pickerShow?'show':'']">
                <div class="picker-head">
                    <div class="btn" @click="cancel">取消</div>
                    <div class="btn" @click="confirm">确定</div>
                </div>
                <div class="pick-box">
                    <div class="content" >
                        <div class="content-item" v-picker.year="{set:set}" ref="year" :data-index="nowYear - startYear" >
                            <div class="picker-item" >
                                <div class="item" :class="[{on:index+startYear==nowYear+1} ]" v-for="index in (endYear - startYear+1)" :key="index">{{startYear + index -1}}</div>
                            </div>
                        </div>
                        <div class="content-item"  v-picker.month="{set:set}" ref="month" :data-index="nowMonth-1" v-if="level==2 || level==3">
                            <div class="picker-item">
                                <div class="item" :class="[{on :index==nowMonth},{disabled:disabledMonth(index)}]" v-for="index in 12" :key="index">{{index}}</div>
                            </div>
                        </div>
                        <div class="content-item" v-picker.day="{set:set}" ref="day" :data-index="nowDay-1" v-if="level==3">
                            <div class="picker-item">
                                <div class="item" :class="[{on :index==nowDay},{disabled:disabledDay(index)}]" v-for="index in days" :key="index">{{index}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="line"></div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script type="text/javascript">

    export default {
      name: 'timerPicker',
      props: {
        showTime: {
          type: String,
        },
        startTime: {
          type: String,
        },
        endTime: {
          type: String,
        },
        pickerShow: {
          type: Boolean,
        },
        reset: {
          type: Boolean,
          default: false,
        },
        dot: {
          type: String,
          default: '-',
        },
        level: {
          type: Number,
          default: 3,
        },
      },
      data() {
        return {
          nowYear: +this.showTime.split(this.dot)[0],
          nowMonth: +this.showTime.split(this.dot)[1],
          nowDay: +this.showTime.split(this.dot)[2],
          itemHeigth: 0,
          firstIn: true,
          disableConfirm: false,
        };
      },
      mounted() {
        this.firstIn = true;
        const dom = this.$refs.year.firstChild;
        this.itemHeigth = Number.parseFloat(dom.firstChild.clientHeight);
        // 不重置，将数据回填
        if (!this.reset) {
          this.getInitIndex();
        } else {
          this.firstIn = false;
        }
      },
      methods: {
        // 确定按钮
        confirm() {
          if (this.level == 3) {
            if (this.$refs.day.firstChild.children[this.nowDay - 1].className.indexOf('disabled') > -1) {
              return;
            }
            this.$emit('confirmFn', `${this.nowYear}-${this.nowMonth}-${this.nowDay}`);
          } else if (this.level == 2) {
            if (this.$refs.month.firstChild.children[this.nowMonth - 1].className.indexOf('disabled') > -1) {
              return;
            }
            this.$emit('confirmFn', `${this.nowYear}-${this.nowMonth}`);
          } else if (this.level == 1) {
            this.$emit('confirmFn', `${this.nowYear}`);
          }
        },
        // 取消按钮
        cancel() {
          this.$emit('cancelFn');
        },
        set(name, index) {
          if (name === 'year') {
            this.nowYear = (this.startYear + index) > this.endYear ? this.endYear : this.startYear + index;
          } else if (name === 'month') {
            this.nowMonth = index + 1;
          } else {
            this.nowDay = index + 1;
          }
        },
        // 有默认的选择信息
        getInitIndex() {
          this.$refs.year.children[0].style.transform = `translateY(${-this.itemHeigth * (this.nowYear - this.startYear)}px)`;
          if (this.level ==2 || this.level ==3){
            this.$refs.month.children[0].style.transform = `translateY(${-this.itemHeigth * (this.nowMonth - 1)}px)`;
          }else if (this.level ==3 ){
            this.$refs.day.children[0].style.transform = `translateY(${-this.itemHeigth * (this.nowDay - 1)}px)`;
          }
        },

        disabledMonth(index) {
          return (this.nowYear <= this.startYear) && (index < this.startMonth) || (this.nowYear >= this.endYear) && (index > this.endMonth);
        },
        disabledDay(index) {
          return (this.nowYear == this.startYear && this.nowMonth < this.startMonth || this.nowYear == this.startYear && this.nowMonth == this.startMonth && (index < this.startDay)) || (this.nowYear == this.endYear && this.nowMonth > this.endMonth || this.nowYear == this.endYear && this.nowMonth == this.endMonth && (index > this.endDay));
        },
      },
      computed: {
        startYear() {
          return +this.startTime.split(this.dot)[0];
        },
        startMonth() {
          return +this.startTime.split(this.dot)[1];
        },
        startDay() {
          return +this.startTime.split(this.dot)[2];
        },
        endYear() {
          return +this.endTime.split(this.dot)[0];
        },
        endMonth() {
          return +this.endTime.split(this.dot)[1];
        },
        endDay() {
          return +this.endTime.split(this.dot)[2];
        },
        // 某年某月的数据
        days() {
          return new Date(this.nowYear, this.nowMonth, 0).getDate();
        },
      },
      watch: {
        startTime(val) {
          this.startYear = val.split(this.dot)[0];
          this.startMonth = val.split(this.dot)[1];
          this.startDay = val.split(this.dot)[2];
        },
        endTime(val) {
          this.endYear = val.split(this.dot)[0];
          this.endMonth = val.split(this.dot)[1];
          this.endDay = val.split(this.dot)[2];
        },
        nowMonth() {
          if (this.firstIn) { return; }
          this.nowDay = 0;
          this.$refs.day.children[0].style.transform = 'translateY(0)';
        },
        days() {
          if (this.nowDay > this.days) {
            this.nowDay = this.days;
            this.$refs.day.children[0].style.transform = `translateY(${-this.itemHeigth * (this.nowDay - 1)}px)`;
          }
        },
        pickerShow(val) {
          if (val) {
            const dom = this.$refs.year.firstChild;
            this.itemHeigth = Number.parseFloat(dom.firstChild.clientHeight);
          } else if (this.reset) {
            this.firstIn = true;
            this.nowYear = 0;
            this.nowMonth = 0;
            this.nowDay = 0;
            this.$refs.year.children[0].style.transform = 'translateY(0)';
            this.$refs.month.children[0].style.transform = 'translateY(0)';
            this.$refs.day.children[0].style.transform = 'translateY(0)';
          }
        },
      },
      directives: {
        picker: {
          inserted(el, binding) {
            let startY = '';
            let differY = '';
            let currentY = 0;
            const dom = el.children[0];
            const len = dom.children.length;
            let index = 0;
            let maxY = -(len - 1);
            let r = 0;
            el.addEventListener('touchstart', (e) => {
              r = Number.parseFloat(dom.firstChild.clientHeight);
              e.preventDefault();
              maxY = -(el.children[0].children.length - 1);
              if (dom.style.transform.indexOf('translateY(0px)') > -1) {
                currentY = 0;
              } else {
                currentY = -el.getAttribute('data-index');
              }
              const ev = e.touches[0];
              startY = ev.clientY;
            });
            el.addEventListener('touchmove', (e) => {
              e.preventDefault();
              const ev = e.touches[0];
              differY = ev.clientY - startY;
              dom.style.transition = 'transform 0s';
              dom.style.transform = `translateY(${currentY * r + differY}px)`;
            });
            el.addEventListener('touchend', (e) => {
              let name = '';
              e.preventDefault();
              const ev = e.changedTouches[0];
              differY = ev.clientY - startY;
              dom.style.transition = 'transform .3s';
              if (differY <= -r / 2) {
                currentY += Math.floor(differY / r);
                if (currentY <= maxY)currentY = maxY;
              } else if (differY >= r / 2) {
                currentY += Math.floor(differY / r);
                if (currentY >= 0)currentY = 0;
              }
              dom.style.transform = `translateY(${currentY * r}px)`;
              index = Math.floor(Math.abs(currentY / 1));// 记录当前位移在数组中的索引,必须取整，否则会出现浮点数
              if (binding.modifiers.year) {
                name = 'year';
              } else if (binding.modifiers.month) {
                name = 'month';
              } else if (binding.modifiers.day) {
                name = 'day';
              }
              binding.value.set(name, index);
            });
          },
        },
      },
    };
</script>
<style lang="scss" scoped>
    $font-base-size: 24;
    $font-size: (26rem/$font-base-size);
    $line-Height: (62rem/$font-base-size);
    .mask{
        position:fixed;
        left: 0;
        bottom: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.6);
        visibility: hidden;
        &.show{
          visibility: visible;
        }
    }
    .picker{
        position:fixed;
        left: 0;
        bottom: 0;
        z-index: 10;
        width: 100%;
        background: #EDEDED;
        visibility: hidden;
        &.show{
          visibility: visible;
        }
        .picker-head{
            display: flex;
            justify-content: space-between;
            height: (74rem/$font-base-size);
            align-items:center;
            background: #fff;
            padding:0 (16rem/$font-base-size);
            .btn{
                font-size: (30rem/$font-base-size);
                color: #357EFB;
            }
        }
        .pick-box{
            height: (362rem/$font-base-size);
            justify-content: space-around;
            position: relative;
            .content{
                display: flex;
                height: 100%;
                overflow: hidden;
            }
            .content-item{
                display: block;
                flex-grow:1;
                text-align: center;
                height: 100%;
                flex-shrink: 0;
                width: 33.3%;
                position: relative;
                top: $line-Height*2;
                z-index: 2;
                .picker-item{
                    width: 100%;
                    & .item{
                        color: #B0B0B0;
                        height: $line-Height;
                        line-height: $line-Height;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        text-align: center;
                        font-size: (36rem/$font-base-size);
                        &.disabled{
                          color:#dcdcdc;
                        }
                    }
                    & .on{
                        color: #333333;
                    }
                }
            }
            .line{
                position: absolute;
                top: $line-Height*2;
                left: 0;
                width: 100%;
                height: $line-Height;
                border-top:1px solid #bebebe ;
                border-bottom:1px solid #bebebe ;
                z-index: 1;
            }
        }
    }
</style>
