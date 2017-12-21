<template>
    <div class="order-confirm">
        <div class="goods-info-box">
            <div class="goods-info">
                <img src="" alt="商品小图" class="pic">
                <p class="title"></p>
                <operate-num :minNum="goodsOperateNum.minNum" :maxNum="goodsOperateNum.maxNum" v-on:subNumFn="reduceItemNum" v-on:addNumFn="increaseItemNum" :inputVal="goodsOperateNum.inputVal" v-on:updateFn="updateItemNum"></operate-num>
            </div>
            <p class="goods-price">¥<span class="num">{{price}}</span></p>
        </div>
        <m-form>
            <m-form-item label="配送方式">
                <p class="" v-if="false">全国包邮</p>
                <p class="tips" v-else>包邮（部分地区不配送）</p>
            </m-form-item>
        </m-form>
        <m-form>
            <m-form-item label="收货人">
                <input class="ipt" v-model="userInfo.name" />
            </m-form-item>
            <m-form-item label="联系电话">
                <input class="ipt" v-model="userInfo.phone" />
            </m-form-item>
            <m-form-item label="所在地区" v-on:click.native="getAddressInfo">
                <p class="arrow">{{ addressNameShow}}</p>
            </m-form-item>
            <m-form-item label="收货地址">
                <textarea name="" class="textarea">梦想小镇E商村5号楼3楼301室（文字宽度490px，超过换行）</textarea>
            </m-form-item>
        </m-form>
        <m-form>
            <m-form-item label="备注">
                <textarea name="" class="textarea">麻烦帮忙送到家门口放在门口的柜子里上锁谢谢</textarea>
            </m-form-item>
        </m-form>
        <div class="footer">
            <a href="javascript:;" class="btn">去支付</a>
        </div>
        <toast :show="toast.show">{{toast.txt}}</toast>
        <addressPicker :addressShow="addressShow" :reset="false" :addressNames="addressNames" v-on:cancelFn="cancelFn" v-on:confirmFn="confirmFn" ></addressPicker>
    </div>
</template>
<script type="text/javascript">
    import operateNum from '@/components/operateNum.vue';
    import toast from '@/components/toast.vue';
    import Form from '@/components/form.vue';
    import FormItem from '@/components/formItem.vue';
    import addressPicker from '@/components/addressPicker.vue';
    // import Api from '@/api/api';

    export default {
      name: 'confirmOrder',
      data() {
        return {
          openId: 'oQgby0EpLBmS8z7hTKnFepG9_Llc',
          toast: {
            show: false,
            txt: '',
          },
          itemId: 78,
          price: 123,
          userInfo: {
            name: '李艳方',
            phone: '15057182736',
          },
          goodsOperateNum: {
            minNum: 1,
            maxNum: 10,
            inputVal: 3,
          },
          addressNames: '浙江省,温州市,洞头区',
          addressShow: false,
        };
      },
      components: {
        'operate-num': operateNum,
        'm-form': Form,
        'm-form-item': FormItem,
        addressPicker,
        toast,
      },
      methods: {
        // 商品数量减少
        reduceItemNum() {
          if (this.goodsOperateNum.inputVal <= this.goodsOperateNum.minNum) {
            this.goodsOperateNum.inputVal = this.goodsOperateNum.minNum;
          } else {
            this.goodsOperateNum.inputVal = this.goodsOperateNum.inputVal - 1;
          }
        },
        // 商品数量增加
        increaseItemNum() {
          if (this.goodsOperateNum.inputVal >= this.goodsOperateNum.maxNum) {
            this.goodsOperateNum.inputVal = this.goodsOperateNum.maxNum;
          } else {
            this.goodsOperateNum.inputVal = this.goodsOperateNum.inputVal + 1;
          }
        },
        // 更改商品的价格
        updateItemNum(num) {
          if (num <= this.goodsOperateNum.minNum) {
            this.goodsOperateNum.inputVal = this.goodsOperateNum.minNum;
          } else if (num >= this.goodsOperateNum.maxNum) {
            this.goodsOperateNum.inputVal = this.goodsOperateNum.maxNum;
          } else {
            this.goodsOperateNum.inputVal = num;
          }
        },
        // 地址确认
        confirmFn(data) {
          let addressNames = '';
          addressNames = data.town ? `${data.province.name},${data.city.name},${data.town.name}`:`${data.province.name},${data.city.name}`;
          this.addressNames = addressNames;
          this.addressShow = false;
        },
        cancelFn() {
          this.addressShow = false;
        },
        // 获取 地址信息
        getAddressInfo() {
          this.addressShow = true;
        },
      },
      computed: {
        addressNameShow() {
          return this.addressNames.replace(/\,/g, ' ');
        },
      },
    };
</script>
<style lang="scss">
    @import '../assets/common.scss';
    @import '../assets/confirmDetail.scss';
</style>