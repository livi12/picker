# maihuo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 脚手架 vue-cli
    sudo npm install vue-cli -g

    创建项目
    vue init webpack projectName

    安装 node-sass sass-loader

### 入口文件 index.html
    设置更节点的文字大小计算

### 地址选择器的说明
移动端地区选择器
    <addressPicker :addressShow="addressShow" :reset="false" :addressNames="addressNames" v-on:cancelFn="cancelFn" v-on:confirmFn="confirmFn" ></addressPicker>

访问地址 https://livi12.github.io/picker/dist/index.html#/

三个动态组件： 级联选择地区 ，级联选择时间 ， 不关联的选择时间

#### picker 组件参数

`addressShow` 地址选择器展示与隐藏        
`reset` true 每次进入的地址一样，不会取 addressNames 中的值     
`reset` false 每次进入地址为上addressNames 中的值      
`addressNames` 为地址的省市区信息，以,隔开       
`cancelFn` 点取消按钮的函数     
`confirmFn` 点确认之后回调的函数，data 为地址信息，地址也许只包含两级数据       
`label` 为节点的信息，默认为name ，传值后为变量名，可以为 String 或 Object         对象，当为Object 对象是，只能去Object 的name 值进行处理       
`listLabel` 为子节点的数据列表，默认是children 变量，可以更改为自己的数据节点变量
`dot` 分割标记
`reset` 不读取展示的时间，最顶端向下滑动
`level` 几层数据格式，默认三层

#### timerPicker 组件参数
`pickerShow` 必传，显示和隐藏
`showTime` 默认展示时间，必填
`startTime` 开始时间，必填
`endTime` 结束时间，必填
`dot` 分割标记
`reset` 不读取展示的时间，最顶端向下滑动
`level` 几层数据格式，默认三层

    选择年，月份不会跟着滚动，日期判断，当选择的日期不在操作区域内，不做操作

#### 开发过程中遇到的点：
    1、vue 中需要操作底层的dom ，用指令的方式，注册事件，指令中不能获取到vue this 对象
    2、要获取到dom 中元素的高度，需要将元素visiblity 属性，display 不能获取到元素的高度
    3、模仿滑动效果