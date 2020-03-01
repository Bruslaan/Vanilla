import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Layout from '../layout/index'
import Login from '../views/LoginPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('../views/Home'),
      meta: { title: 'Dashboard', icon: 'mdi-home-city' }
    },
    ]
  },

  {
    path: '/calendar',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Calendar',
        component: () => import('../views/Calendar'),
        meta: { title: 'Calendar', icon: 'mdi-calendar-account' }
      }
    ]
  },
  {
    path: '/table',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Table',
        component: () => import('../views/DynamicTable'),
        meta: { title: 'CustomTable', icon: 'mdi-table' }
      }
    ]
  },
  {
    path: '/scheduler',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Scheduler',
        component: () => import('../views/Scheduler'),
        meta: { title: 'Scheduler', icon: 'mdi-calendar-text' }
      }
    ]
  },
  {
    path: '/franzitable',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'FranziTable',
        component: () => import('../views/FranziTable'),
        meta: { title: 'FranziTable', icon: 'mdi-calendar-text' }
      }
    ]
  },



  {
    path: '/profilePage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'ProfilePage',
        component: () => import('../views/ProfilePage'),
        meta: { title: 'ProfilePage', icon: 'mdi-calendar-text' }
      }
    ]ƒ
    },
  // {
  //   path: '/anwesenheit',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Anwesenheit',
  //       component: () => import('../views/Anwesenheit'),
  //       meta: { title: 'Anwesenheit', icon: 'mdi-calendar-text' }
  //     }
  //   ]
  // },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login
  },
  { path: '*', redirect: '/404', hidden: true },
  {
    path: '/404',
    component: () => import('../views/404'),
    hidden: true
  },

]


const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
