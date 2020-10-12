import Vue from 'vue';
import 'amfe-flexible';
import router from './router';
import App from './App.vue';

import store from './store';
import './plugins/element.js';

Vue.config.productionTip = false;

console.log(router, 'router');
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
