import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueSession from 'vue-session'
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'

//components
import App from './App.vue'
import Main from './components/dinamics/Main.vue'
import Page404 from './components/dinamics/Page404.vue'
import Register from './components/dinamics/Register.vue'
import Profile from './components/dinamics/Profile.vue'
import Index from './components/dinamics/funcionality/Index.vue'
import ManageEmployee from './components/dinamics/funcionality/ManageEmployee.vue'
import ManageArticle from './components/dinamics/funcionality/ManageArticle.vue'
import ModifyData from './components/dinamics/funcionality/ModifyData.vue'
import ListClient from './components/dinamics/funcionality/ListClient.vue'
import ManageProvider from './components/dinamics/funcionality/ManageProvider.vue'
import ManageStock from './components/dinamics/funcionality/ManageStock.vue'
import ListInvoice from './components/dinamics/funcionality/ListInvoice.vue'

Vue.use(BootstrapVue)
Vue.use(Router)
Vue.use(VueSession, {persist:true})
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
      redirect: '/pages/register'
    },
    {
      path: '/pages/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/profile',
      redirect: '/profile/index'
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      children: [
        {
          path: '/profile/index',
          name: 'Index',
          component: Index
        },
        {
          path: '/profile/manageemployees',
          name: 'ManageEmployee',
          component: ManageEmployee
        },
        {
          path: '/profile/managearticles',
          name: 'Manage Articles',
          component: ManageArticle
        },
        {
          path: '/profile/modifydata',
          name: 'Modify Data',
          component: ModifyData
        },
        {
          path: '/profile/listclient',
          name: 'List Client',
          component: ListClient
        },
        {
          path: '/profile/manageprovider',
          name: 'Manage Provider',
          component: ManageProvider
        },
        {
          path: '/profile/managestock',
          name: 'Manage Stock',
          component: ManageStock
        },
        {
          path: '/profile/listinvoice',
          name: 'List Invoice',
          component: ListInvoice
        }
      ]
    }
  ]
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  data: function () {
    return {
      //Podemos acceder a los siguientes atributos desde otro componente vue utilizando el this.$root
      credentials: [
        'User',
        'imgs/nav/user.png'
      ],
      shoppingcart: [],
      wishes: [],
      articles: []
    }
  }
})