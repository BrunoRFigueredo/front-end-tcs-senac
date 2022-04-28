<template>
  <div id="index-category" class="container">
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
      <button class="btn btn-success" @click="cadastroCategoria(categoria)">Cadastrar</button>
    </form>
    <ul class="list-group w-25 mt-4">
      <li v-for="cate in categorias" :key="cate.id" class="list-group-item">
        <input type="text" v-model="cate.nome">
        <input type="text" v-model="cate.descricao">
        <button class="btn btn-danger m-1" @click="deletar(cate.id)">X</button>
        <button class="btn btn-danger m-1" @click="atualizar(cate.id, cate)">✔</button>
      </li>
    </ul>
  </div>
</template>

<script>
import CrudService from '@/services/crud'

export default {
  name: "index-category",
  data() {
    return {
      categorias: [],
      categoria: {
        nome: '',
        descricao: ''
      },
      // filter: '',
      paginaDesejada: 1,
      total: 0,
      totalPage: 0,
      tamanhoPagina: 10
    }

  },
  async mounted() {
    this.$service = new CrudService('/categoria/')
    await this.carregaCadastro();
  },
  watch: {
    page() {
      this.carregaCadastro()
    }
  },
  methods: {
    // cadastro(){
    //   api.post("/categoria/", this.categoria).then(r => {
    //     api.get("/categoria/").then(r => {
    //       this.categorias = r.data;
    //     });
    //   })
    // },
    // deletar(id){
    //   api.delete(`/categoria/${id}`).then(
    //     api.get("/categoria/").then(r => {
    //     this.categorias = r.data;
    // }),
    //   );
    // },
    async cadastroCategoria(categoria){
      const {data} = await this.$service.save(categoria);
      this.carregaCadastro();
    },
    async carregaCadastro() {
      const {data} = await this.$service.findAll({
        tamanhoPagina: this.tamanhoPagina,
        paginaDesejada: this.paginaDesejada
        // filter: this.filter
      });
      console.log(data);
      console.log(data.conteudo);
      this.categorias = data.conteudo;
      // this.categorias = data.content.clientes;
      // this.total = data.content.total;
      // const calculoPaginacao = data.content.total / this.tamanhoPagina;
      // this.totalPage = calculoPaginacao === Math.floor(calculoPaginacao) ? calculoPaginacao : Math.floor(calculoPaginacao) + 1;
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