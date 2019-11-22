import Vue from 'vue';
import VModal from 'vue-js-modal';

import App from './App.vue';
import router from './router';

import './styles/style.css';

Vue.use(VModal);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
