import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import UserList from '../views/UserList.vue'
import ChatBoard from '../views/ChatBoard.vue'
import AboutView from '../views/AboutView.vue'
import EditView from '../views/EditView.vue'
// import HelloWorld from './views/HelloWorld.vue'
import NotFoundComponent from '../components/layouts/NotFoundComponent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'UserList',
    component: UserList
  },
  // {
  //   path: '/userlist',
  //   name: 'UserList',
  //   component: UserList
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  {
    path: '/about',
    name: 'AboutView',
    component: AboutView
  },
  {
    path: '/chat',
    name: 'ChatBoard',
    component: ChatBoard
  },
  {
    //path: '/edit/?employee_No=:employee_No/&mode=:mode',
    path: '/edit/',
    name: 'EditView',
    component: EditView
  },
  {
    name: 'notFound',
    path: '*', 
    component: NotFoundComponent 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
