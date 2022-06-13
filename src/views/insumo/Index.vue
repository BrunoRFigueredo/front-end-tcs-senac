<template>
<div class="pagina" v-if="this.estaLogado()">
  <div class="listagem">
    <div class="lista">
      <div id="index-service" class="container">
        <h5 class="text-center">Insumos</h5>
        <div class="row">
          <div class="col-md-12 div-btn-cadastrar">
        <router-link to="/cadastrar-insumo">
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
            <th scope="col">Unidade Medida</th>
            <th scope="col">Ações</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="insumo in insumos">
            <th scope="row">{{ insumo.id }}</th>
            <td>{{ insumo.nome }}</td>
            <td>{{ insumo.descricao }}</td>
            <td>{{ insumo.unidadeMedida }}</td>
            <td>
                <router-link :to="{ name: 'form-insumo', params: { id: insumo.id }}" class="text-dark p-0 mx-1">
                  <i class="bi bi-pencil-square"></i>
                </router-link>
                <button @click="deletarInsumo(insumo.id)" class="btn">
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
                @update:modelValue="carregarInsumo"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { getLogado, isLogged } from '@/services/auth';
import CrudService from '@/services/crud';
import { buscarInstituicao } from '@/util/buscaInstituicao';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import BotaoCadastrar from '@/components/BotaoCadastrar.vue';

export default {
  name: "index-insumo",
  components: {
    VPagination,
    BotaoCadastrar
  },
  data(){
    return{
      insumos: [],
      categorias: [],
      tamanhoPagina: 5,
      paginaDesejada: 1,
      total: 0,
      totalPagina: 0,
      idInstituicao: '',
    }
  },
  async mounted(){
    this.$emit('logado');
    if (this.estaLogado()){
      let idUsuarioLogado = getLogado();
      this.$crudInsumo = new CrudService('/insumo/');
      const dados = await buscarInstituicao(idUsuarioLogado);
      this.idInstituicao = dados.instituicao.id;
      this.$crudInsumoInstituicao = new CrudService('/insumo/instituicao/' + dados.instituicao.id);    
      this.carregarInsumo();
    } else {
      this.$router.push('/instituicao');
    }
  },
  methods: {
    estaLogado(){
      return isLogged();
    },
    async carregarInsumo(){
      const {data} = await this.$crudInsumoInstituicao.findAll({
        paginaDesejada: this.paginaDesejada -1,
        tamanhoPagina: this.tamanhoPagina,
        idInstituicao: this.idInstituicao
      });
      this.insumos = data.conteudo;
      this.total = data.totalRegistros;
      const calculoPaginacao = data.totalRegistros / this.tamanhoPagina;
      this.totalPagina = calculoPaginacao === Math.floor(calculoPaginacao) ? calculoPaginacao : Math.floor(calculoPaginacao) + 1;
    },
    async deletarInsumo(idInsumo){
      await this.$crudInsumo.remove(idInsumo);
      this.carregarInsumo();
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
    margin-left: 40px;
    width: 50%;
  }
  .btn-cadastrar {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 50%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  border-radius: 5px;
}
</style>