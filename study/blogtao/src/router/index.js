import Vue from 'vue';
import VueRouter from 'vue-router';
import Paper from '@/pages/paper/index';
import BlogCont from '@/pages/blogCont/index';
import Travel from '@/pages/travel/index';
import MessageBook from '@/pages/messageBook/index';
import AboutMe from '@/pages/aboutMe/index';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/Paper',
      name: 'Paper',
      component: Paper,
    }, {
      path: '/BlogCont',
      name: 'BlogCont',
      component: BlogCont,
    }, {
      path: '/Travel',
      name: 'Travel',
      component: Travel,
    }, {
      path: '/MessageBook',
      name: 'MessageBook',
      component: MessageBook,
    }, {
      path: '/',
      name: 'AboutMe',
      component: AboutMe,
    },
  ],
});
