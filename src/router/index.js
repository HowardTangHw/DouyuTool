import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/index';
import dataList from '@/components/dataList';
import other from '@/components/other';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/dataList/:classify',
      name: 'dataList',
      component: dataList
    },
    {
      path: '/other',
      name: 'other',
      component: other
    }
  ]
});
