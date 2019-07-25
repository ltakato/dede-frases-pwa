import Vue from 'vue';
import Router from 'vue-router';

import Quotes from '@/components/Quotes';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Quotes 
    }
  ]
})