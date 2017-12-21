<template>
    <div class="m-form-box">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
    export default {
      name: 'm-form',
      props: ['label'],
      data() {
        return {};
      },
    };
</script>