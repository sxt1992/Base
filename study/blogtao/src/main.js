import Vue from 'vue';
import Vuex from 'vuex';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import App from './App';
import router from './router';

import './assets/less/common.less';

Vue.use(Vuex);
Vue.use(iView);

const app = document.getElementById('app');
if (app) {
  app.innerHTML = '';
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
