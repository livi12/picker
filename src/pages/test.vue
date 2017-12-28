<template>
    <div>
        <p>动态组件</p>
        <keep-alive>
        <component v-bind:is="currentView"></component>
        </keep-alive>
        <p @click="changeComponent">改变</p>
    </div>
</template>
<script>
    const Home = {
      template: '<p>Welcome home!</p>',
    };
    const Office = {
      template: '<p>Welcome office!</p>',
    };
    export default {
      name: 'test',
      data() {
        return {
          currentView: Home,
        };
      },
      components: {
        Home,
        Office,
      },
      methods: {
        changeComponent() {
          if (this.currentView == Home) {
            this.currentView = Office;
          } else {
            this.currentView = Home;
          }
        },
      },
    };
</script>