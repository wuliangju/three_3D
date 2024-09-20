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
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
