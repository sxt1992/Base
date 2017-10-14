import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/pages/index/index';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
  ],
});
