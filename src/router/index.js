import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IndexUsers from "../views/users/IndexUsers.vue";
import UserForm from "../views/register/UserForm.vue";
import LoginIndex from "../views/login/LoginIndex.vue";
import IndexInstituition from "../views/institution/InstitutionIndex.vue";
import SelectInstituition from "../views/institution/InstitutionSelect.vue";
import IndexProject from "../views/project/ProjectIndex.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/users',
    name: 'indexUsers',
    component: IndexUsers
  },
  {
    path: "/user-register",
    name: "user-form",
    component: UserForm
  },
  {
    path: "/user-login",
    name: "user-login",
    component: LoginIndex 
  },
  {
    path: "/instituition",
    name: "index-instituition",
    component: IndexInstituition
  },
  {
    path: "/instituition/:id",
    name: "select-instituition",
    component: SelectInstituition
  },
  {
    path: "/project",
    name: "index-project",
    component: IndexProject
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
