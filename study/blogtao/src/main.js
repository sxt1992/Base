import Vue from 'vue';
import Vuex from 'vuex';
import iView from 'iview';

import App from './App';
import router from './router';

// eslint-disable-next-line
require('./assets/less/iview-theme.less');

Vue.use(Vuex);
Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
