import Vue from 'vue';
import Router from 'vue-router';
import Recommend from '@/components/recommend/recommend';
import Singer from '@/components/singer/singer';
import Ranks from '@/components/ranks/ranks';
import Search from '@/components/search/search';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
    },
    {
      path: '/singer',
      component: Singer,
    },
    {
      path: '/ranks',
      component: Ranks,
    },
    {
      path: '/search',
      component: Search,
    },
  ],
});
