import Vue from 'vue';
import Router from 'vue-router';
const index = () => import(/* webpackChunkName: "components" */ '@/components/index');
const dataList = () => import(/* webpackChunkName: "components" */ '@/components/dataList');
const other = () => import(/* webpackChunkName: "components" */ '@/components/other');

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
      component: dataList,
      children: [
        {
          path: '/dataList/:classify/:game',
          name: 'game',
          component: dataList
        }
      ]
    },
    {
      path: '/other',
      name: 'other',
      component: other
    }
  ]
});
