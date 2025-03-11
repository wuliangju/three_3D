import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { 
    path: '/',
    redirect: '/rumen1' // 根路径默认重定向到 /rumen
  },
  {
    path: '/rumen1',
    component: () => import('@/views/rumen/rumen-01.vue'),
  },
  {
    path: '/rumen2',
    component: () => import('@/views/rumen/rumen-02.vue'),
  },
  {
    path: '/rumen3',
    component: () => import('@/views/rumen/rumen-03.vue'),
  },
  {
    path: '/rumen4',
    component: () => import('@/views/rumen/rumen-04.vue'),
  },
  {
    path: '/example1',
    component: () => import('@/views/demo/demo-01.vue'),
  },
  {
    path: '/example2',
    component: () => import('@/views/demo/demo-02.vue'),
  },
  {
    path: '/example3',
    component: () => import('@/views/demo/demo-03.vue'),
  },
  {
    path: '/example4',
    component: () => import('@/views/demo/demo-04.vue'),
  },
  {
    path: '/example5',
    component: () => import('@/views/demo/demo-05.vue'),
  },
  {
    path: '/example6',
    component: () => import('@/views/demo/demo-06.vue'),
  },
  {
    path: '/example7',
    component: () => import('@/views/demo/demo-07.vue'),
  },
  {
    path: '/example8',
    component: () => import('@/views/demo/demo-08.vue'),
  },
  {
    path: '/example9',
    component: () => import('@/views/demo/demo-09.vue'),
  },
  {
    path: '/example10',
    component: () => import('@/views/demo/demo-10.vue'),
  },
  {
    path: '/school-01',
    component: () => import('@/views/school/school-01.vue'),
  },
  {
    path: '/school-02',
    component: () => import('@/views/school/school-02.vue'),
  },
  {
    path: '/school-03',
    component: () => import('@/views/school/school-03.vue'),
  },
  {
    path: '/school-04',
    component: () => import('@/views/school/school-04.vue'),
  },
  {
    path: '/school-05',
    component: () => import('@/views/school/school-05.vue'),
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
