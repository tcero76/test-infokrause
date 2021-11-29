import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path:'/user',
    name: 'user',
    component: ()=>import(/* webpackChunkName: "User" */ "../views/User.vue"),    
    meta: { requiresAuth: true }
  },{
    path:'/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    if(!store.user) {
      next({
        name: 'login'
      });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
