<template>
    <div class="toast" v-if="toastShow">
        <div class="toast-box">
            <img class="toast-logo" src="../../static/add.png" />
            <div class="toast-txt">
                <slot>
                </slot>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
      props: {
        time: {
          type: Number,
          default: 1500,
        },
        show: {
          type: Boolean,
        },
      },
      data() {
        return {
            toastShow: this.show,
        };
      },
      methods: {
      },
      mounted() {
        setTimeout(() => {
            this.toastShow = false;
        }, this.time);
      },
    };
</script>