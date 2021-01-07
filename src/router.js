import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import TL from '@/views/TL.vue'
import Dashboard from '@/views/Dashboard.vue'
import Post from '@/views/Post.vue'
import PostDemo from '@/views/PostDemo.vue'
import User from '@/views/User.vue'
import NotFound from '@/views/NotFound.vue'
import Upload from '@/views/Upload.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ResetRequest from '@/views/ResetRequest.vue'
import ResetForm from '@/views/ResetForm.vue'
import Liked from '@/views/Liked.vue'
//import store from '@/store.js'

Vue.use(Router)

//Choisi quelle vue sera affiché par <router-view />
export default new Router({
  //Enlève le # de l'URL
  //décommenter avant npm run build
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/TL',
      name: 'tl',
      component: TL
    },
    {
      path: '/Dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/art/:id([a-z0-9]+)',
      name: 'post',
      component: Post
    },
    {
      path: '/demo/art/:id([a-z0-9]+)',
      name: 'postDemo',
      component: PostDemo
    },
    {
      path: '/user/:username',
      name: 'user',
      component: User
    },
    {
      path: '/ul',
      name: 'upload',
      component: Upload
    },
    {
      path: '/liked',
      name: 'liked',
      component: Liked
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/reset',
      name: 'ResetRequest',
      component: ResetRequest
    },
    {
      path: '/reset/:jwt',
      name: 'ResetForm',
      component: ResetForm
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
    /*,
    {
      path: '/help',
      name: 'help',
      // route level code-splitting
      // this generates a separate chunk (help.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Help.vue')
    },
    {
      path: '/forbidden',
      name: '403',
      component: Forbidden
    }*/
  ]
})
