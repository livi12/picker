<template>
    <div class="address-box">
        <transition name="fade">
            <div class="mask" :class="[addressShow?'show':'']" @click="cancel"></div>
        </transition>
        <transition name="animate">
            <div class="picker"  :class="[addressShow?'show':'']">
                <div class="picker-head">
                    <div class="btn" @click="cancel">取消</div>
                    <div class="btn" @click="confirm">确定</div>
                </div>
                <div class="pick-box">
                    <div class="content" >
                        <div class="content-item" v-picker.province="{set:set}" ref="province" :data-index="pIndex" >
                            <div class="picker-item" >
                                <div class="item" :class="{on :index==pIndex}" v-for="(val,index) of address" :data-code="val.area.code" :key="val.code">{{val.area.name}}</div>
                            </div>
                        </div>
                        <div class="content-item"  v-picker.city="{set:set}" ref="city" :data-index="cIndex">
                            <div class="picker-item">
                                <div class="item" :class="{on :index==cIndex}" v-for="(val,index) of city" :data-code="val.area.code"  :key="val.code">{{val.area.name}}</div>
                            </div>
                        </div>
                        <div class="content-item" v-picker.town="{set:set}" ref="town" :data-index="tIndex">
                            <div class="picker-item">
                                <div class="item" :class="{on :index==tIndex}" v-for="(val,index) of town" :data-code="val.area.code"  :key="val.code">{{val.area.name}}</div>
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
    import address from '@/util/addressData';

    export default {
      name: 'addressPicker',
      props: {
        addressNames: {
          type: String,
          default: '浙江省,杭州市,余杭区',
        },
        addressShow: {
          type: Boolean,
        },
        reset: {
          type: Boolean,
          default: false,
        },
      },
      data() {
        return {
          pIndex: 0,
          cIndex: 0,
          tIndex: 0,
          address,
          itemHeigth: 0,
        };
      },
      mounted() {
        const dom = this.$refs.province.firstChild;
        this.itemHeigth = Number.parseFloat(dom.firstChild.clientHeight);
        // 不重置，将数据回填
        if (!this.reset) {
          this.getAddreessIndex();
        }
      },
      methods: {
        // 确定按钮
        confirm() {
          const pramas = {};
          pramas.province = this.address[this.pIndex].area;
          pramas.city = this.city[this.cIndex].area;
          if (this.town.length) {
            pramas.town = this.town[this.tIndex].area;
          }
          this.addressBoxShow = false;
          this.$emit('confirmFn', pramas);
        },
        // 取消按钮
        cancel() {
          this.$emit('cancelFn');
        },
        set(name, index) {
          if (name === 'province') {
            this.pIndex = index;
          } else if (name === 'city') {
            this.cIndex = index;
          } else {
            this.tIndex = index;
          }
        },
        // 有默认的地区信息
        getAddreessIndex() {
          const province = this.addressNames.split(',')[0];
          const city = this.addressNames.split(',')[1];
          const town = this.addressNames.split(',')[2];
          for (let i = 0; i < this.address.length; i += 1) {
            if (this.address[i].area.name === province) {
              this.pIndex = i;
              this.$refs.province.children[0].style.transform = `translateY(${-this.itemHeigth * this.pIndex}px)`;
              const citys = this.address[this.pIndex].children;
              for (let j = 0; j < citys.length; j += 1) {
                if (citys[j].area.name === city) {
                  this.cIndex = j;
                  this.$refs.city.children[0].style.transform = `translateY(${-this.itemHeigth * j}px)`;
                  const towns = citys[j].children;
                  for (let k = 0; k < towns.length; k += 1) {
                    if (towns[k].area.name === town) {
                      this.tIndex = k;
                      this.$refs.town.children[0].style.transform = `translateY(${-this.itemHeigth * k}px)`;
                      // 一秒后将值设为true，可以监听变化
                      break;
                    }
                  }
                  break;
                }
              }
              break;
            }
          }
        },
      },
      computed: {
        city() {
          return this.address[this.pIndex].children;
        },
        town() {
          return this.address[this.pIndex].children[this.cIndex].children;
        },
        firstIn() {
          return !this.addressShow;
        },
      },
      watch: {
        pIndex() {
          if (!this.addressShow) { return; }
          this.cIndex = 0;
          this.tIndex = 0;
          this.$refs.city.children[0].style.transform = 'translateY(0)';
          this.$refs.town.children[0].style.transform = 'translateY(0)';
        },
        cIndex() {
          if (!this.addressShow) { return; }
          this.tIndex = 0;
          this.$refs.town.children[0].style.transform = 'translateY(0)';
        },
        addressShow(val) {
          if (val) {
            const dom = this.$refs.province.firstChild;
            this.itemHeigth = Number.parseFloat(dom.firstChild.clientHeight);
          } else {
            if (this.reset) {
              this.pIndex = 0;
              this.cIndex = 0;
              this.tIndex = 0;
              this.$refs.province.children[0].style.transform = 'translateY(0)';
              this.$refs.city.children[0].style.transform = 'translateY(0)';
              this.$refs.town.children[0].style.transform = 'translateY(0)';
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
              if (binding.modifiers.province) {
                name = 'province';
              } else if (binding.modifiers.city) {
                name = 'city';
              } else if (binding.modifiers.town) {
                name = 'town';
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