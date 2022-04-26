<template>
  <div id="index-service" class="container">
    <div>
      <router-link to="/services-register">Cadastrar um serviço</router-link>
    </div>
    <div>
      <ul class="list-group w-50">
        <li class="list-group-item" v-for="servico in servicos.conteudo" :key="servico.id">{{servico}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
export default {
  name: "index-service",
  data(){
    return{
      servicos: []
    }
  },
  mounted(){
    api.get("/servico/").then(r => {
      this.servicos = r.data;
      console.log(this.servicos)
    });
  }
}
</script>

<style scoped>
  form{
    margin: 0 auto;
  }
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
</style>