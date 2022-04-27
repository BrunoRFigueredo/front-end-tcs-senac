<template>
  <div id="index-service" class="container">
    <div>
      <router-link to="/services-register">Cadastrar um serviço</router-link>
    </div>
    <div>
      <div class="row" id="cardCenter">
        <div class="card m-3" style="width: 18rem;" v-for="servico in servicos.conteudo" :key="servico.id">
          <div class="card-body">
            <h4 class="text-center fw-bold">{{servico.nome}}</h4>
              <p>{{servico.id}}</p>
              <p>{{servico.nome}}</p>
              <router-link tag="button" class="botao" :to="`/services/${servico.id}`">Visualizar</router-link>
          </div>
        </div>
      </div>
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
  async created(){
    await api.get("/servico/").then(r => {
      this.servicos = r.data;
      console.log(this.servicos)
    });
  }
}
</script>