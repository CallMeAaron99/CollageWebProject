import Vue from 'vue'
import VueRouter from 'vue-router'
import EmployeeList from '../views/EmployeeList.vue'
import EmployeeEditing from '../views/EmployeeEditing.vue'
import DepartmentList from '../views/DepartmentList.vue'
import DepartmentEditing from '../views/DepartmentEditing.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'EmployeeList',
    component: EmployeeList,
  },
  {
    path: '/EmployeeEditing',
    name: 'EmployeeEditing',
    props: true,
    component: EmployeeEditing
  },
  {
    path: '/DepartmentList',
    name: 'DepartmentList',
    component: DepartmentList
  },
  {
    path: '/DepartmentEditing',
    name: 'DepartmentEditing',
    props: true,
    component: DepartmentEditing
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
