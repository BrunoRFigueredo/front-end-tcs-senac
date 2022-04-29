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
    <h4 class="text-center mt-4 fw-bold">Lista das categorias</h4>
    <div class="row mt-4" style="margin: 0 auto;">
      <div class="card m-2 w-25" style="width: 18rem;" v-for="cate in categorias" :key="cate.id">
        <div class="card-body">
          <p class="text-center fw-bold">{{cate.nome}}</p>
        </div>
      </div>
    </div>
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