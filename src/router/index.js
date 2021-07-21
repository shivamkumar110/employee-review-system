import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
const Home = () => import(/* webpackChunkName: "about" */ '../views/Home.vue')

const ProvideReview = () => import(/* webpackChunkName: "about" */ '../components/ProvideReview.vue')
const EmployeeInfo = () => import(/* webpackChunkName: "about" */ '../components/EmployeeInfo.vue')
const AssignReviewers = () => import(/* webpackChunkName: "about" */ '../components/AssignReviewers.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/employee-info/:id/:action',
    name: 'employeeInfo',
    component: EmployeeInfo
  },
  {
    path: '/employee/create',
    name: 'createEmployee',
    component: EmployeeInfo
  },
  {
    path: '/assign-reviewers/:id',
    name: 'assignReviewers',
    component: AssignReviewers
  },
  {
    path: '/provide-review/:id',
    name: 'provideReview',
    component: ProvideReview
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
