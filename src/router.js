import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',//使用Prerender-spa-plugin不能使用hash模式
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
      {
          path: '/login',
          name: 'login',
          component: Login
      },
    {
      path: '/article',
      name: 'article',
      component: () => import('./views/article/index.vue')
    },
      {
          path: '/addArticle',
          name: 'addArticle',
          component: () => import('./views/article/addArticle.vue')
      },
      {
          path: '/articleText',
          name: 'articleText',
          component: () => import('./views/article/articleText.vue')
      },
    {
          path: '/about',
          name: 'about',
          component: () => import('./views/about/index.vue')
      },
      {
          path: '/userInfo',
          name: 'userInfo',
          component: () => import('./views/userInfo/index.vue')
      },
    {
        path: '/mailbox',
        name: 'mailbox',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './views/mailbox/index.vue')
    },
    {
        path:"*",
        redirect:'/'
    }
  ]
})
