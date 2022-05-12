<template>
  <div id="index-service" class="container" >
    <h5 class="text-center">Serviços</h5>
    <div class="row">
      <div class="md-3">
        <router-link type="button" to="/cadastrar-categoria" class="btn btn-success">Cadastrar</router-link>
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
            @update:modelValue="carregarcategoria"
        />
      </div>
    </div>
    <!--<router-link tag="button" class="botao" :to="`/categoria/${categoria.id}`">Visualizar</router-link>-->
  </div>
</template>
<script>
import CrudService from '@/services/crud'
import VPagination from "@hennge/vue3-pagination";
import {isLogged} from "@/services/auth";

export default {
  components: {
    VPagination
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
  mounted() {
    if (this.estaLogado()){
      this.$crudCategoria = new CrudService('/categoria/')
      this.carregarCategoria();
    } else {
      this.$router.push('/');
    }
  },
  methods: {
    async carregarCategoria() {
      const {data} = await this.$crudCategoria.findAll({
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
form {
  margin: 0 auto;
  align-items: center;
  justify-items: center;
}

ul {
  margin: 0 auto;
}

ul button {
  float: right;
}

</style>