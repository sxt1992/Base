import Vue from 'vue';
import Router from 'vue-router';
import DateCom from '@/components/DateCom';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DateCom',
      component: DateCom
    }
  ]
});
