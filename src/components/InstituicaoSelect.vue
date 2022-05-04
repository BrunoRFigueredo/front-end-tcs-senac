<template>
  <div id="index-instituition">
    <div class="container">
      <h3 class="text-center fw-bold">Instituições</h3>
    <div class="row">
      <div class="card m-2" style="width: 18rem;" v-for="instituicao in instituicoes" :key="instituicao.id">
        <div class="card-body">
          
          <h5 class="text-center fw-bold">{{instituicao.nome}}</h5>
          <span>{{instituicao.status}}</span>
          <div class="row mt-4">
            <p class="col">Cidade: {{instituicao.cidade}}</p>
            <p class="col">Estado: {{instituicao.uf}}</p>
          </div>
          <p class="col">CNPJ: {{instituicao.cnpj}}</p>
          <p class="col">CEP: {{instituicao.cep}}</p>
          <router-link class="botao" :to="`/instituicao/${instituicao.id}`">Visualizar</router-link>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data(){
    return{
      instituicao:
      {
          id:1,
          nome: "teste",
          cidade: "Içara",
          uf: "SC",
          cnpj: 232312100,
          cep: 832818312,
          status: true
        }
    }
  },
  mounted(){
    
  },
  methods: {
    

  }
}
</script>

<style scoped>
p{
  font-size: 12px;
}
</style>