import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { 
    path: '/',
    redirect: '/rumen' // 根路径默认重定向到 /rumen
  },
  {
    path: '/rumen',
    component: () => import('@/views/rumen/rumen-01.vue'), // 创建3D场景页面
  },
  {
    path: '/rumen1',
    component: () => import('@/views/rumen/rumen-02.vue'), // 其他内容页面
  }
  // 你可以继续添加更多的路由
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
