<template>
<div class="pagina">
  <div class="listagem">
    <div class="lista">
      <div id="index-service" class="container" >
        <h5 class="text-center">Lista de Categorias</h5>
      <div class="row">
                  <div class="col-md-12 div-btn-cadastrar">
        <router-link to="/cadastrar-categoria">
        <BotaoCadastrar />
      </router-link>
     </div>
    </div>
    <table class="table text-center">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nome</th>
          <th scope="col">Descrição</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="categoria in categorias" :key="categoria.id">
          <th scope="row">{{ categoria.id }}</th>
          <td>{{ categoria.nome }}</td>
          <td>{{ categoria.descricao }}</td>
          <td>
            <router-link :to="{ name: 'form-categoria', params: { id: categoria.id }}" class="text-dark p-0 mx-1">
              <i class="bi bi-pencil-square"></i>
            </router-link>
            <button @click="deletarCategoria(categoria.id)" class="btn">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="h5 col-md">
        Página {{paginaDesejada}} de {{totalPagina}}
      </div>
      <div class="col-md">
        <v-pagination
            v-model="paginaDesejada"
            :pages="totalPagina"
            :range-size="tamanhoPagina"
            :hideFirstButton="true"
            :hideLastButton="true"
            active-color="#DCEDFF"
            @update:modelValue="carregarCategoria"
        />
      </div>
     </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import CrudService from '@/services/crud'
import VPagination from "@hennge/vue3-pagination";
import {getLogado, isLogged} from "@/services/auth";
import BotaoCadastrar from '../../../components/BotaoCadastrar.vue';
import { buscarInstituicao } from '@/util/buscaInstituicao';

export default {
  components: {
    VPagination,
    BotaoCadastrar
},
  name: "index-service",
  data() {
    return {
      categorias: [],
      tamanhoPagina: 10,
      paginaDesejada: 1,
      total: 0,
      totalPagina: 0
    }
  },
  async mounted() {
    if (this.estaLogado()){
      let idUsuarioLogado = getLogado()
      this.$crudCategoria = new CrudService('/categoria/')
      let dados = await buscarInstituicao(idUsuarioLogado);
      this.$crudCategoriaServico = new CrudService('/categoria/instituicao/' + dados.instituicao.id)
      this.carregarCategoria();
      this.$emit('logado');
    } else {
      this.$router.push('/');
    }
  },
  methods: {
    async carregarCategoria() {
      const {data} = await this.$crudCategoriaServico.findAll({
        paginaDesejada: this.paginaDesejada - 1,
        tamanhoPagina: this.tamanhoPagina
      })
      this.categorias = data.conteudo;
      this.total = data.totalRegistros;
      const calculoPaginacao = data.totalRegistros / this.tamanhoPagina;
      this.totalPagina = calculoPaginacao === Math.floor(calculoPaginacao) ? calculoPaginacao : Math.floor(calculoPaginacao) + 1;
    },
    async deletarCategoria(idCategoria) {
      await this.$crudCategoria.remove(idCategoria);
      this.carregarCategoria();
    },
    estaLogado(){
      return isLogged();
    }
  }
}
</script>

<style scoped>
.pagina {
      margin: 10px;
  }
  .lista {
    position: relative;
    z-index: 1;
    background: #FFFFFF;
    max-width: 1200px;
    margin: 0 auto 100px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    margin: auto;
    border-radius: 10px;
  }

  .div-btn-cadastrar{
  text-align: left;  
  width: 50%;
  } 
</style>