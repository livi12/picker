<template>
    <div class="order-confirm">
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
            <m-form-item label="性别" v-on:click.native="showGender">
                <p class="">{{gender}}</p>
            </m-form-item>
            <m-form-item label="选择地区" v-on:click.native="getAddressInfo">
                <p class="arrow">{{ addressNameShow}}</p>
            </m-form-item>
            <m-form-item label="级联时间" v-on:click.native="getDateInfo">
                <p class="arrow">{{ dateNameShow}}</p>
            </m-form-item>
             <m-form-item label="优美时间" v-on:click.native="getDate1Info">
                <p class="arrow">{{ dateName1Show}}</p>
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
        <picker :pickList="address" :pickerShow="addressShow" :reset="false" :pickerNames="addressNames" v-on:cancelFn="cancelFn" v-on:confirmFn="confirmFn" label="area" listLabel="children" :level="3"></picker>
        <picker :pickList="dateList" :pickerShow="dateShow" :pickerNames="dateNames" dot="-" v-on:cancelFn="cancelDateFn" v-on:confirmFn="confirmDateFn" v-if="dateShow"></picker>
        <timerPicker :pickerShow="date1Show" :showTime="showTime" startTime="2017-5-2" endTime="2028-1-2" dot="-" v-on:cancelFn="cancelDate1Fn" v-on:confirmFn="confirmDate1Fn" :level="1"></timerPicker>
         <picker :pickList="genderList" :pickerShow="genderShow" :pickerNames="gender" v-on:cancelFn="cancelGenderFn" v-on:confirmFn="confirmGenderFn" :level="2"></picker>
    </div>
</template>
<script type="text/javascript">
    import Form from '@/components/form.vue';
    import FormItem from '@/components/formItem.vue';
    import picker from '@/components/picker.vue';
    // import picker from '@/components/picker.vue';
    import timerPicker from '@/components/timerPicker.vue';
    // import addressData from 'http://cdn.elephtribe.com/lib/addressData/current/build/addressData.js';
    import addressData from '@/util/addressData';

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
          address:addressData,
          addressNames: '浙江省,温州市,洞头区',
          addressShow: false,
          dateNames: '2018-6-12',
          date1Names: '2019-7-3',
          dateShow: false,
          date1Show: false,
          dateList: [],
          showTime: '2018-2-3',
          gender: '女',
          genderList: [
            { name: '女' }, { name: '男' },
          ],
          genderShow: false,
        };
      },
      components: {
        'm-form': Form,
        'm-form-item': FormItem,
        picker,
        timerPicker,
      },
      methods: {
        // 地址确认
        confirmFn(data) {
          let addressNames = '';
          addressNames = data.thirdList ? `${data.firstList.name},${data.secondList.name},${data.thirdList.name}` : `${data.firstList.name},${data.secondList.name}`;
          this.addressNames = addressNames;
          this.addressShow = false;
        },
        // 地址取消
        cancelFn() {
          this.addressShow = false;
        },
        // 确认日期
        confirmDateFn(data) {
          let dateNames = '';
          dateNames = `${data.firstList},${data.secondList},${data.thirdList}`;
          this.dateNames = dateNames;
          this.dateShow = false;
        },
        confirmDate1Fn(data) {
          this.date1Names = data;
          this.showTime = data;
          this.date1Show = false;
        },
        confirmGenderFn(data){
          this.gender = data.firstList;
          this.genderShow = false;
        },
        cancelDateFn() {
          this.dateShow = false;
        },
        cancelDate1Fn() {
          this.date1Show = false;
        },
        cancelGenderFn(){
          this.genderShow = false;
        },
        getDate1Info() {
          this.date1Show = true;
        },
        // 获取 地址信息
        getDateInfo() {
          this.dateShow = true;
        },
        getDateList() {
          const data = [];
          for (let i = 2017; i <= 2028; i += 1) {
            const year = {};
            year.name = i;
            year.children = [];
            for (let j = 1; j <= 12; j += 1) {
              const month = {};
              month.name = j;
              month.children = [];
              // j-1 为当前月，j-2,0 为上个月的总天数
              const days = new Date(i, j, 0).getDate();
              for (let k = 1; k <= days; k += 1) {
                const date = {};
                date.name = k;
                month.children.push(date);
              }
              year.children.push(month);
            }
            data.push(year);
          }
          this.dateList = data;
        },
        getAddressInfo() {
          this.addressShow = true;
        },
        showGender() {
          this.genderShow = true;
        }
      },
      // beforeCreate(){
      //   this.getDateList();
      // },
      created() {
        this.getDateList();
      },
      computed: {
        addressNameShow() {
          return this.addressNames.replace(/\,/g, ' ');
        },
        dateNameShow() {
          return this.dateNames.replace(/\,/g, '-');
        },
        dateName1Show() {
          return this.date1Names.replace(/\,/g, '-');
        },
      },
    };
</script>
<style lang="scss">
    @import '../assets/common.scss';
    @import '../assets/confirmDetail.scss';
</style>