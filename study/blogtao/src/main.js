import Vue from 'vue';
import Vuex from 'vuex';

import App from './App';
import router from './router';

import './assets/less/common.less';

Vue.use(Vuex);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
