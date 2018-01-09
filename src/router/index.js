import Vue from 'vue'
import Router from 'vue-router'
import dataList from '@/components/dataList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dataList',
      component: dataList
    }
  ]
})
