import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsuarioForm from "../views/register/UsuarioForm.vue";
import UsuarioDetail from "../views/usuario/UsuarioDetail.vue"
import LoginIndex from "../views/login/LoginIndex.vue";
import IndexInstituicao from "../views/instituicao/InstituicaoIndex.vue";
import SelectInstituicao from "../views/instituicao/InstituicaoIndex.vue";
import IndexProjeto from "../views/projeto/ProjetoIndex.vue";
import indexInsumo from "../views/insumo/InsumoIndex.vue";
import IndexCategoria from "../views/insumo/CategoriaIndex.vue";
import IndexVoluntario from "../views/voluntario/IndexVoluntario.vue";
import VoluntarioForm from "../views/voluntario/VoluntarioForm.vue";
import IndexServico from "../views/servico/IndexServico.vue";
import ServicoForm from "../views/servico/ServicoForm.vue";
import ServicoSelect from "../views/servico/ServicoForm.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/usuario-register",
    name: "usuario-form",
    component: UsuarioForm
  },
  {
    path: "/usuario-login",
    name: "usuario-login",
    component: LoginIndex 
  },
  {
    path: "/usuario-detail/:id",
    props: true,
    name: "usuario-detail",
    component: UsuarioDetail 
  },
  {
    path: "/Instituicao",
    name: "index-Instituicao",
    component: IndexInstituicao
  },
  {
    path: "/Instituicao/:id",
    name: "select-Instituicao",
    component: SelectInstituicao
  },
  {
    path: "/projeto",
    name: "index-projeto",
    component: IndexProjeto
  },
  {
    path: "/insumo",
    name: 'index-insumo',
    component: indexInsumo
  },
  {
    path: "/categoria",
    name: "index-categoria",
    component: IndexCategoria
  },
  {
    path: "/voluntario",
    name: "index-voluntario",
    component: IndexVoluntario
  },
  {
    path: "/voluntario-register",
    name: "form-voluntario",
    component: VoluntarioForm
  },
  {
    path: "/servicos",
    name: "index-servico",
    component: IndexServico
  },
  {
    path: "/servicos-register",
    name: "form-servico",
    component: ServicoForm
  },
  {
    path: "/servicos/:id",
    props: true,
    name: "servico-select",
    component: ServicoSelect
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
