import Vue from 'vue';
import Router from 'vue-router';
import confirmOrder from '@/pages/confirmOrder.vue';
import picker from '@/pages/picker.vue';
import test from '@/pages/test.vue';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'picker',
    component: ()=> import('@/pages/picker.vue'),
  },
  {
    path: '/confirmOrder',
    name: 'confirmOrder',
    component: ()=> import('@/pages/confirmOrder.vue'),
  },
  {
    path: '/test',
    name: 'test',
    component: ()=> import('@/pages/test.vue'),
  },
  ],
});
