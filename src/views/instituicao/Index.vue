<template>
  <div id="index-instituition">
    <div class="container">
      <div class="row">
        <div class="card" style="width: 18rem;" v-for="inst in institutions" :key="inst.id">
          <img src="#" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{inst.name}}</h5>
            <p class="card-text">{{inst.cnpj}}</p>
            <p class="card-text">{{inst.pix}}</p>
            <router-link to="" class="botao">Visualizar</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
export default {
  data(){
    return{
      institutions: [],
    }
  },
  mounted(){
    this.$service = new CrudService('/instituicao');
    this.load();
  },
  methods: {
    async remove ({ id }) {
      // const value = await this.$confirm('Tem certeza que deseja excluir?', 'Esta ação não poderá ser desfeita!')
      // if (value) {
      //   try {
      //     await this.$service.remove(id)
      //     this.load()
      //     this.$noty.success('Cliente excluído com sucesso!')
      //   } catch (err) {
      //     console.error(err)
      //     this.$noty.error('Erro ao excluir o cliente!')
      //   }
      // }
    },
    async load() {
      // const { data } = await this.$service.findAll({ limit: this.perPage, page: this.page, filter: this.filter })
      // this.records = data.content.clientes;
      // this.total = data.content.total;
      // const calculoPaginacao = data.content.total / this.perPage;
      // this.totalPage = calculoPaginacao === Math.floor(calculoPaginacao) ? calculoPaginacao : Math.floor(calculoPaginacao) + 1;
    }
  }
}
</script>

<style scoped>
  .botao{
    width: 150px;
    border-radius: 10px;
    color: #fff;
    font-weight: bold;
    background-color: #504B43;
    text-decoration: none;
    font-weight: bold;
    padding: 5px;
  }

  .card{
    margin: 10px auto;
  }
</style>