import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsuarioForm from "../views/register/Form.vue";
import UsuarioDetail from "../views/usuario/Detail.vue"
import LoginIndex from "../views/login/Index.vue";
import IndexLogado from "../views/IndexLogado.vue";
import IndexInstituicao from "../views/instituicao/Index.vue";
import SelectInstituicao from "../components/InstituicaoSelect.vue";
import IndexProjeto from "../views/projeto/Index.vue";
import indexInsumo from "../views/insumo/Index.vue";
import IndexCategoria from "../views/insumo/categoria/Index.vue";
import IndexVoluntario from "../views/voluntario/Index.vue";
import VoluntarioForm from "../views/voluntario/Form.vue";
import IndexServico from "../views/servico/Index.vue";
import ServicoForm from "../views/servico/Form.vue";
import ServicoSelect from "../components/ServicoSelect.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/index',
    name: 'index-logado',
    component: IndexLogado
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
