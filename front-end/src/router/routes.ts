import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/calendar', component: () => import('pages/Calendar.vue') },
    ],
  },

  {
    path: '/account',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/account.vue') }],
  },

  {
    path: '/calendar',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/Calendar.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
  {
    path: '/roomList',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/roomList.vue') }],
  },
];

export default routes;
