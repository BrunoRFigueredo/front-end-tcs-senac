import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsuarioForm from "../views/register/Form.vue";
import UsuarioDetail from "../views/usuario/Detail.vue"
import LoginIndex from "../views/login/Index.vue";
import IndexLogado from "../views/IndexLogado.vue";
import IndexInstituicao from "../views/instituicao/Index.vue";
import DetalheInstituicao from "../views/instituicao/DetalheInstituicao.vue";
import InstituicaoForm from "../views/instituicao/Form.vue";
import IndexProjeto from "../views/projeto/Index.vue";
import DetalheProjeto from "../views/projeto/DetalheProjeto.vue";
import indexInsumo from "../views/insumo/Index.vue";
import formInsumo from "../views/insumo/Form.vue";
import IndexCategoria from "../views/insumo/categoria/Index.vue";
import IndexVoluntario from "../views/voluntario/Index.vue";
import VoluntarioForm from "../views/voluntario/Form.vue";
import VoluntarioSelect from "../components/VoluntarioSelect.vue";
import IndexServico from "../views/servico/Index.vue";
import ServicoForm from "../views/servico/Form.vue";
import ServicoSelect from "../views/servico/ServicoSelect.vue";
import FormCategoria from "../views/insumo/categoria/Form.vue";
import ProjetoForm from "../views/projeto/Form.vue";

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexInstituicao
  },
  {
    path: '/sobre',
    name: 'index-sobre',
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
    path: "/instituicao",
    name: "index-instituicao",
    component: IndexInstituicao
  },
  {
    path: "/cadastro-instituicao",
    nome: 'instituicao-form',
    component: InstituicaoForm
  },
  {
    path: "/instituicao/:id",
    props: true,
    name: "detalhe-instituicao",
    component: DetalheInstituicao
  },
  {
    path: "/projeto",
    name: "index-projeto",
    component: IndexProjeto
  },
  {
    path: "/cadastrar-projeto",
    name: "cadastrar-projeto",
    component: ProjetoForm
  },
  {
    path: "/projeto/:id",
    props: true,
    name: "projeto-select",
    component: DetalheProjeto
  },
  {
    path: "/insumo",
    name: 'index-insumo',
    component: indexInsumo
  },
  {
    path: "/cadastrar-insumo",
    name: 'form-insumo',
    component: formInsumo
  },
  {
    path: "/categoria",
    name: "index-categoria",
    component: IndexCategoria
  },
  {
    path: "/cadastrar-categoria",
    name: "form-categoria",
    component: FormCategoria
  },
  {
    path: "/voluntario",
    name: "index-voluntario",
    component: IndexVoluntario
  },
  {
    path: "/cadastrar-voluntario",
    name: "form-voluntario",
    component: VoluntarioForm
  },
  {
    path: "/voluntario/:id",
    props: true,
    name: "voluntario-select",
    component: VoluntarioSelect
  },
  {
    path: "/servicos",
    name: "index-servico",
    component: IndexServico
  },
  {
    path: "/cadastrar-servico",
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
