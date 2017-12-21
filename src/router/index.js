import Vue from 'vue';
import Router from 'vue-router';
import confirmOrder from '@/pages/confirmOrder.vue';
import picker from '@/pages/picker.vue';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'picker',
    component: picker,
  },
  {
    path: '/confirmOrder',
    name: 'confirmOrder',
    component: confirmOrder,
  }],
});
