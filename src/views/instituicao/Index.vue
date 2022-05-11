<template>
  <div id="index-instituition">
    <div class="container">
      <h3 class="text-center fw-bold">Instituições</h3>
    <div class="row" style="max-width: 1050px;max-height: 500px; overflow-y: scroll;">
      <div class="card m-2" style="width: 20rem;" v-for="instituicao in instituicoes.conteudo" :key="instituicao.id">
        <div class="card-body">
          <h5 class="fw-bold">{{instituicao.nome}}</h5>
          <span>{{instituicao.status}}</span>
          <div class="row mt-4">
            <p class="col">CNPJ: {{instituicao.cnpj}}</p>
            <p class="col">PIX: {{instituicao.pix}}</p>
          </div>
          <div class="row mt-2">
            <p class="col">Telofone: {{instituicao.telefone}}</p>
            <p class="col">Whatsapp: {{instituicao.whatsapp}}</p>
          </div>
          <p class="col">Estado: {{instituicao.email}}</p>
          <button class="btn btn-success" :to="`/instituicao/${instituicao.id}`">Visualizar</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import CrudService from "@/services/crud"
export default {
  data(){
    return{
      instituicoes: []
    }
  },
  async mounted(){
    this.$crudInstituicao = new CrudService('/instituicao/');
    this.carregarInstituicoes();
  },
  methods: {
    async carregarInstituicoes(){
      const {data} = await this.$crudInstituicao.findAll({
        tamanhoPagina: this.tamanhoPagina,
        paginaDesejada: this.paginaDesejada
      })
      this.instituicoes = data;
      console.log(data);
    }

  }
}
</script>

<style scoped>
p{
  font-size: 12px;
  color: #8391a2
}

h3, h4, h5{
  color: #535961
}

::-webkit-scrollbar-track {
    background-color: #F4F4F4;
}
::-webkit-scrollbar {
    width: 2px;
    background: #F4F4F4;
}
::-webkit-scrollbar-thumb {
    background: #dad7d7;
}
</style>
