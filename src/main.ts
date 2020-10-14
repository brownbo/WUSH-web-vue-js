import Vue from 'vue';
import 'amfe-flexible';
import router from './router';
import App from './App.vue';
import store from './store';
import './plugins/element.js';
import './element-variables.scss'

Vue.config.productionTip = false;

// router.beforeEach((to, from, next) => {
//   window.document.title = '吃吃吃';
//   next();
// });
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
