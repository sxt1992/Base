import './styles.css';

import Vue from 'vue';
import store from './vuex/store';
import App from './Component/App.vue';
new Vue({
  store,
  el: 'body',
  components: { App }
});