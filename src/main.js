// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import axios from 'axios';
import ElementUI from 'element-ui'; //之后将element-ui改为外部引入
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';

Vue.use(ElementUI);
Vue.prototype.$ajax = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
