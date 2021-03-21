import Vue from 'vue'

import VueRouter from 'vue-router'

import Home from './components/HomePage.vue'
import LinkPage from './components/LinkPage.vue'
import Auth from './components/Auth.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: {
      template: "<router-view></router-view>"
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'link/:id',
        name: 'LinkPage',
        component: LinkPage
      },
      {
        path: 'auth',
        name: 'Auth',
        component: Auth
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
