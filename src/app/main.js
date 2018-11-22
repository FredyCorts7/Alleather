import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
import VueSession from 'vue-session'

//components
import App from './App.vue'
import Main from './components/dinamics/Main.vue'
import Login from './components/dinamics/Login.vue'
import Page404 from './components/dinamics/Page404.vue'
import Register from './components/dinamics/Register.vue'
import Profile from './components/dinamics/Profile.vue'

Vue.use(BootstrapVue)
Vue.use(Router)
Vue.use(VueSession)
window.toastr = require('toastr')
Vue.use(VueToastr2)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '*',
      component: Page404
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Main
    },
    {
      path: '/pages',
      redirect: '/pages/login'
    },
    {
      path: '/pages/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/pages/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  data: function () {
    return {
      credentials: [
        'User',
        'imgs/nav/user.png'
      ],
      articles: []
    }
  }
})