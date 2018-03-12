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
                        <div class="content-item" >
                            <div class="picker-item"  v-picker.firstList="{set:set}" ref="firstList" :data-index="pIndex">
                                <div class="item" :class="{on :index==pIndex}" v-for="(val,index) of pickList" :key="index">{{val[label].name || val.name}}</div>
                            </div>
                        </div>
                        <div class="content-item">
                            <div class="picker-item"  v-picker.secondList="{set:set}" ref="secondList" :data-index="cIndex" v-if="level==2 || level==3">
                                <div class="item" :class="{on :index==cIndex}" v-for="(val,index) of secondList" :key="index">{{val[label].name|| val.name}}</div>
                            </div>
                        </div>
                        <div class="content-item">
                            <div class="picker-item" v-picker.thirdList="{set:set}" ref="thirdList" :data-index="tIndex" v-if="level==3">
                                <div class="item" :class="{on :index==tIndex}" v-for="(val,index) of thirdList" :key="index">{{val[label].name|| val.name}}</div>
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
      name: 'picker',
      props: {
        pickerNames: {
          type: String,
        },
        pickerShow: {
          type: Boolean,
        },
        reset: {
          type: Boolean,
          default: false,
        },
        pickList: {
          type: Array,
        },
        label: {
          type: String,
          default: 'name',
        },
        listLabel: {
          type: String,
          default: 'children',
        },
        dot: {
          type: String,
          default: ',',
        },
        level: {
          type: Number,
          default: 3,
        },
      },
      data() {
        return {
          pIndex: 0,
          cIndex: 0,
          tIndex: 0,
          itemHeigth: 0,
          firstIn: true,
        };
      },
      mounted() {
        this.firstIn = true;
        const dom = this.$refs.firstList;
        this.itemHeigth = dom.firstChild.clientHeight;
        this.windowResize();
        // 不重置，将数据回填
        if (!this.reset) {
          this.getAddreessIndex();
        } else {
          this.firstIn = false;
        }
      },
      methods: {
        // 确定按钮
        confirm() {
          const pramas = {};
          pramas.firstList = this.pickList[this.pIndex][this.label];
          if (this.level === 2 || this.level === 3) {
            pramas.secondList = this.secondList[this.cIndex][this.label];
          }
          if (this.thirdList.length) {
            pramas.thirdList = this.thirdList[this.tIndex][this.label];
          }
          this.$emit('confirmFn', pramas);
        },
        // 取消按钮
        cancel() {
          this.$emit('cancelFn');
        },
        // 调整窗口大小
        windowResize() {

            console.log('windowResize  in 11');
          window.addEventListener('resize', () => {
            console.log('windowResize  in');

            const dom = this.$refs.firstList;
            this.itemHeigth = dom.firstChild.clientHeight;
            console.log('windowResize  '+this.itemHeigth);
          }, !1);
        },
        set(name, index) {
          if (name === 'firstList') {
            this.pIndex = index;
          } else if (name === 'secondList') {
            this.cIndex = index;
          } else {
            this.tIndex = index;
          }
        },
        // 有默认的选择信息
        getAddreessIndex() {
          const firstList = this.pickerNames.split(this.dot)[0];
          const secondList = this.pickerNames.split(this.dot)[1];
          const thirdList = this.pickerNames.split(this.dot)[2];
          for (let i = 0; i < this.pickList.length; i += 1) {
            if ((typeof (this.pickList[i][this.label]) === 'object' && this.pickList[i][this.label].name == firstList) || (this.pickList[i][this.label] == firstList)) {
              this.pIndex = i;
              this.$refs.firstList.style.transform = `translateY(${-this.itemHeigth * this.pIndex}px)`;
              const secondLists = this.pickList[this.pIndex][this.listLabel];
              if (secondLists && secondLists.length && this.level == 2 && this.level == 3) {
                for (let j = 0; j < secondLists.length; j += 1) {
                  if ((typeof (secondLists[j][this.label]) === 'object' && secondLists[j][this.label].name == secondList) || (secondLists[j][this.label] == secondList)) {
                    this.cIndex = j;
                    this.$refs.secondList.style.transform = `translateY(${-this.itemHeigth * j}px)`;
                    const thirdLists = secondLists[j][this.listLabel];
                    if (thirdLists && thirdLists.length && this.level == 3) {
                      for (let k = 0; k < thirdLists.length; k += 1) {
                        if ((typeof (thirdLists[k][this.label]) === 'object' && thirdLists[k][this.label].name == thirdList) || (thirdLists[k][this.label] == thirdList)) {
                          this.tIndex = k;
                          this.$refs.thirdList.style.transform = `translateY(${-this.itemHeigth * k}px)`;
                          setTimeout(() => { this.firstIn = false; }, 500);
                          break;
                        } else if (k == thirdLists.length - 1) {
                          setTimeout(() => { this.firstIn = false; }, 500);
                        }
                      }
                    } else {
                      setTimeout(() => { this.firstIn = false; }, 500);
                    }
                    break;
                  }
                }
              } else {
                setTimeout(() => { this.firstIn = false; }, 500);
              }
              break;
            }
          }
        },
      },
      computed: {
        secondList() {
          if (this.level === 2 || this.level === 3) {
            return this.pickList[this.pIndex][this.listLabel];
          }
          return [];
        },
        thirdList() {
          if (this.level === 3) {
            return this.pickList[this.pIndex][this.listLabel][this.cIndex][this.listLabel];
          }
          return [];
        },
      },
      watch: {
        pIndex() {
          if (this.firstIn) { return; }
          this.cIndex = 0;
          this.tIndex = 0;
          if (this.level == 2 || this.level == 3) {
            this.$refs.secondList.style.transform = 'translateY(0)';
          }
          if (this.level == 3) {
            this.$refs.thirdList.style.transform = 'translateY(0)';
          }
        },
        cIndex() {
          if (this.firstIn) { return; }
          if (this.level == 3) {
            this.tIndex = 0;
            this.$refs.thirdList.style.transform = 'translateY(0)';
          }
        },
        pickerShow(val) {
          if (val) {
            const dom = this.$refs.firstList;
            this.itemHeigth = dom.firstChild.clientHeight;
          } else if (this.reset) {
            this.firstIn = true;
            this.pIndex = 0;
            this.cIndex = 0;
            this.tIndex = 0;
            this.$refs.firstList.style.transform = 'translateY(0)';
            if (this.level == 2 || this.level == 3) {
              this.$refs.secondList.style.transform = 'translateY(0)';
            } if (this.level == 3) {
              this.$refs.thirdList.style.transform = 'translateY(0)';
            }
          }
        },
      },
      directives: {
        picker: {
          inserted(el, binding) {
            let startY = '';
            let differY = '';
            let currentY = 0;
            const dom = el;
            const len = dom.children.length;
            let index = 0;
            let maxY = -(len - 1);
            let r = 0;
            el.addEventListener('touchstart', (e) => {
              r = Number.parseFloat(dom.firstChild.clientHeight);
              e.preventDefault();
              maxY = -(el.children.length - 1);
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
              if (binding.modifiers.firstList) {
                name = 'firstList';
              } else if (binding.modifiers.secondList) {
                name = 'secondList';
              } else if (binding.modifiers.thirdList) {
                name = 'thirdList';
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
                        padding: 0;
                        margin: 0;
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