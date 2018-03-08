import Vue from 'vue';
import Vuex from 'vuex';

import App from './index.vue';

Vue.use(Vuex);

const app = document.getElementById('app');
if (app) {
  app.innerHTML = '';
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});
