import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/todo',
      component: () => import('@/pages/todo/TodoIndex.vue'),
    },
    {
      path: '/',
      redirect: '/todo',
    },
  ],
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
});
