<template>
  <div id="index-service" class="container"  v-if="estaLogado()">
        <h5 class="text-center">Serviços</h5>
        <div class="row">
          <div class="md-3">
            <router-link type="button" to="/cadastrar-servico" class="btn btn-success">Cadastrar</router-link>
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
        <!--<router-link tag="button" class="botao" :to="`/servico/${servico.id}`">Visualizar</router-link>-->
  </div>
</template>

<script>
import CrudService from '@/services/crud';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { isLogged } from '@/services/auth';

export default {
  components: {
    VPagination
  },
  name: "index-service",
  data() {
    return {
      servicos: [],
      tamanhoPagina: 10,
      paginaDesejada: 1,
      total: 0,
      totalPagina: 0
    }
  },
  mounted() {
    if (this.estaLogado()){
      this.$crudServico = new CrudService('/servico/')
      this.carregarServico();
    } else {
      this.$router.push('/');
    }
    
  },
  methods: {
    async carregarServico() {
      console.log(this.tamanhoPagina);
      console.log(this.paginaDesejada);
      const {data} = await this.$crudServico.findAll({
        paginaDesejada: this.paginaDesejada - 1,
        tamanhoPagina: this.tamanhoPagina
      })
      console.log(data)
      this.servicos = data.conteudo;
      this.total = data.totalRegistros;
      const calculoPaginacao = data.totalRegistros / this.tamanhoPagina;
      this.totalPagina = calculoPaginacao === Math.floor(calculoPaginacao) ? calculoPaginacao : Math.floor(calculoPaginacao) + 1;
    },
    async deletarServico(idServico) {
      await this.$crudServico.remove(idServico);
      this.carregarServico();
    },
    estaLogado(){
      return isLogged();
    }
  }
}
</script>


<style scoped>
i {
  margin: 5px;
}
</style>