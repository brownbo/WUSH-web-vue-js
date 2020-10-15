import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/add',
    name: 'New',
    component: () => import('../views/New/New.vue'),
  },
  {
    path: '/members',
    name: 'Members',
    component: () => import('../views/Members/Members.vue'),
  },
  {
    path: '/static',
    name: 'Static',
    component: () =>
      import(/* webpackChunkName: "Static" */ '../views/Static/Static.vue'),
  },
  {
    path: '/memo',
    name: 'Memo',
    component: () =>
      // import('../views/Memo/index.vue'),
      import(/* webpackChunkName: "Memo" */ '../views/Memo/Memo.vue'),
  },
  {
    path: '/activitiesDetail',
    name: 'ActivitiesDetail',
    component: () => import('../views/ActivitiesDetail/ActivitiesDetail.vue'),
  },
  {
    path: '/memberInfo',
    name: 'memberInfo',
    component: () => import('../views/MemberInfo/MemberInfo.vue'),
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
