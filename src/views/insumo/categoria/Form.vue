<template>
  <div id="form-service" class="container" v-if="estaLogado()">
    <form action="" class="w-50">
      <h3 class="text-center pb-4"><strong>Cadastrar Categoria</strong></h3>
      <div class="mb-3">
        <label for="nomeCategoria" class="form-label">Nome da categoria</label>
        <input type="text" class="form-control" v-model="categoria.nome" required>
      </div>
      <div class="mb-3">
        <label for="descricaoCategoria" class="form-label">Descrição</label>
        <input type="text" class="form-control" v-model="categoria.descricao" required>
      </div>
      <!--      <span v-if="error" class="alert alert-warning" for="">{{error}}</span>-->
      <button class="btn btn-success" @click="cadastrar(categoria)">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import {isLogged} from '@/services/auth';
import CrudService from "@/services/crud";

export default {
  name: "form-service",
  data() {
    return {
      categoria: {
        nome: '',
        descricao: '',
        status: 1
      },
      erro: ''
    }
  },
  computed: {
    title() {
      return this.$route.params.id
          ? 'Editar categoria'
          : 'Nova categoria'
    }
  },
  mounted() {
    if (this.estaLogado()) {
      this.$crudCategoria = new CrudService('/categoria/');
      if (this.$route.params.id) {
        this.carregaCategoria(this.$route.params.id)
      }
    } else {
      this.$router.push('/');
    }
  },
  methods: {
    async cadastrar(categoria) {
      try {
        await this.$crudCategoria.save(categoria);
        this.$router.push('/categoria');
      } catch (erro) {
        this.erro = erro.response.data.message;
      }
    },
    async carregaCategoria(idCategoria) {
      const {data} = await this.$crudCategoria.findById(idCategoria);
      this.categoria = data;
    },
    desabilitar() {
      return ((!this.categoria.nome || this.categoria.nome.length > 45) ||
          (!this.categoria.descricao || this.categoria.descricao.length > 200))
    },
    estaLogado() {
      return isLogged();
    }
  }
}
</script>

<style scoped>
form {
  margin: 0 auto;
}
</style>