import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/new_lobby',
      name: 'new_lobby',
      component: () => import('@/views/NewLobby.vue')
    },
    {
      path: '/lobbies',
      name: 'lobbies',
      component: () => import('@/views/Lobbies.vue')
    },
    {
      path: '*',
      name: '404',
      component: () => import('./views/PageNotFound.vue')
    }
  ]
});
