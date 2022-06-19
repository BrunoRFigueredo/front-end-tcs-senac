<template>
<div class="pagina">
  <div class="listagem">
    <div class="lista">
      <div id="index-service" class="container"  v-if="estaLogado()">
        <h5 class="text-center">Serviços</h5>
        <div class="row">
        </div>
        <div class="col-md-12 btn-cadastrar">
          <router-link to="/cadastrar-servico">
            <BotaoCadastrar />
          </router-link>
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
          <tr v-for="servico in servicos" :key="servico.id">
            <th scope="row">{{ servico.id }}</th>
            <td>{{ servico.nome }}</td>
            <td>{{ servico.descricao }}</td>
            <td>
                <router-link :to="{ name: 'form-servico', params: { id: servico.id }}" class="text-dark p-0 mx-1">
                  <i class="bi bi-pencil-square"></i>
                </router-link>
                <button @click="deletarServico(servico.id)" class="btn">
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
                @update:modelValue="carregarServico"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import CrudService from '@/services/crud';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import {getLogado, isLogged} from '@/services/auth';
import { buscarInstituicao } from '@/util/buscaInstituicao';
import BotaoCadastrar from '@/components/BotaoCadastrar.vue';

export default {
  components: {
    VPagination,
    BotaoCadastrar
},
  name: "index-service",
  data() {
    return {
      servicos: [],
      tamanhoPagina: 10,
      paginaDesejada: 1,
      idInstituicao: '',
      total: 0,
      totalPagina: 0
    }
  },
  async mounted() {
    if (this.estaLogado()) {
      let idUsuarioLogado = getLogado();
      let dados = await buscarInstituicao(idUsuarioLogado);
      this.$crudServico = new CrudService('/servico/');
      this.$crudServicoInstituicao = new CrudService('/servico/instituicao/' + dados.instituicao.id)
      this.carregarServico();
      this.$emit('logado');
    } else {
      this.$router.push('/');
    }

  },
  methods: {
    async carregarServico() {
      const {data} = await this.$crudServicoInstituicao.findAll({
        paginaDesejada: this.paginaDesejada - 1,
        tamanhoPagina: this.tamanhoPagina
      })
      this.servicos = data.conteudo;
      this.total = data.totalRegistros;
      const calculoPaginacao = data.totalRegistros / this.tamanhoPagina;
      this.totalPagina = calculoPaginacao === Math.floor(calculoPaginacao) ? calculoPaginacao : Math.floor(calculoPaginacao) + 1;
    },
    async deletarServico(idServico) {
      await this.$crudServico.remove(idServico);
      this.carregarServico();
    },
    estaLogado() {
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
  .btn-cadastrar{
    text-align: left;
    margin-left: 40px;
    width: 50%;
  }
</style>