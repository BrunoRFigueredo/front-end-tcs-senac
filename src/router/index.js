import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserForm from "../views/register/UserForm.vue";
import UserDetail from "../views/user/UserDetail.vue"
import LoginIndex from "../views/login/LoginIndex.vue";
import IndexInstituition from "../views/institution/InstitutionIndex.vue";
import SelectInstituition from "../views/institution/InstitutionSelect.vue";
import IndexProject from "../views/project/ProjectIndex.vue";
import indexInsumo from "../views/insumos/indexInsumo.vue";
import IndexCategory from "../views/insumos/IndexCategory.vue";
import IndexVoluntary from "../views/voluntary/IndexVoluntary.vue";
import VoluntaryForm from "../views/voluntary/VoluntaryForm.vue";
import IndexService from "../views/service/IndexService.vue";
import ServiceForm from "../views/service/ServiceForm.vue";
import ServiceSelect from "../views/service/ServiceSelect.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
    path: "/user-detail/:id",
    props: true,
    name: "user-detail",
    component: UserDetail 
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
  {
    path: "/insumo",
    name: 'index-insumo',
    component: indexInsumo
  },
  {
    path: "/category",
    name: "index-category",
    component: IndexCategory
  },
  {
    path: "/voluntary",
    name: "index-voluntary",
    component: IndexVoluntary
  },
  {
    path: "/voluntary-register",
    name: "form-voluntary",
    component: VoluntaryForm
  },
  {
    path: "/services",
    name: "index-service",
    component: IndexService
  },
  {
    path: "/services-register",
    name: "form-service",
    component: ServiceForm
  },
  {
    path: "/services/:id",
    props: true,
    name: "service-select",
    component: ServiceSelect
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
