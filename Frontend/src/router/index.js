import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',

    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',

    component: () => import('../views/Register.vue'),
  },
  {
    path: '/profile',
    name: 'profile',

    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/sensors',
    name: 'sensors',

    component: () => import('../views/Sensors.vue'),
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
