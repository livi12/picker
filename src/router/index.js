import Vue from 'vue';
import Router from 'vue-router';
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
    path: '/test',
    name: 'test',
    component: ()=> import('@/pages/test.vue'),
  },
  ],
});
