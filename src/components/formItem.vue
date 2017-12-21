<template>
    <div class="form-item">
        <p class="label">{{label}}</p>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
      name: 'form-item',
      props: ['label'],
      data() {
        return {};
      },
    };
</script>
<style lang="scss">
    $font-base-size: 24;
    $font-size:  (30rem/$font-base-size);
    $labe-color: #000;
    $content-color: #666;
    .m-form-box{
        background: #fff;
        border-radius: (6rem/$font-base-size);
        margin-bottom: (30rem/$font-base-size);
    }
    .form-item{
        display: flex;
        font-size: $font-size;
        padding: (22rem/$font-base-size) (30rem/$font-base-size);
        border-bottom: 1px solid #e5e5e5;
        align-items: flex-top;
        .label{
            color: $labe-color;
            flex-shrink: 0;
            flex-basis: (120rem/$font-base-size);
            margin-right: (40rem/$font-base-size);
            line-height: 1.2;
            font-size: $font-size;
        }
        .content{
            display: block;
            flex-grow: 1;
            color:$content-color;
            line-height: 1.2;
            font-size: $font-size;
            & .ipt{
                display: block;
                width: 100%;
                height: 100%;
                border:0 none;
                color:$content-color;
                font-size: $font-size;
            }
            p{
                font-size: $font-size;
            }
            .arrow{
                background: url(../../static/arrow.png) no-repeat right center;
                background-size: (16rem/$font-base-size) (25rem/$font-base-size);
            }
            & .textarea{
                display: block;
                width: 100%;
                min-height: (100rem/$font-base-size);
                max-height: (150rem/$font-base-size);
                box-shadow: none;
                border:0 none;
                font-size: $font-size;
                resize: none;
                color: $content-color;
            }
            & .tips{
                background: url(../../static/tips.png) no-repeat right center;
                background-size:  (32rem/$font-base-size) (32rem/$font-base-size);
            }
        }
        &:last-child{
            border:0 none;
        }
    }
    
</style>