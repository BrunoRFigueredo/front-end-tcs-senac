<template>
  <div id="index-voluntary" class="container">
    <h2 class="text-center pb-2 fw-bold">Lista de voluntários</h2>
    <div class="text-center pb-5">
      <router-link to="voluntary-register" style="text-decoration:none; color: #77AD78">Deseja ser um voluntário ?</router-link>
    </div>
    <div class="row">
      <div class="card" style="width: 18rem;" v-for="volunter in volunteers" :key="volunter.id">
        <div class="card-body">
          <h4 class="text-center fw-bold">{{volunter.nome}}</h4>
          <div class="row">
            <p class="col">Cidade: {{volunter.cidade}}</p>
            <p class="col">Estado: {{volunter.uf}}</p>
          </div>
          <p class="col">CEP: {{volunter.cep}}</p>
          <p class="col">Contato: {{volunter.telefone}}</p>
          <button class="botao">Visualizar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
export default {
  name: "index-voluntary",
  data(){
    return{
      volunteers: [
        {
          id: 1,
          nome: "Felipe",
          telefone: "998132453",
          email: "felipe-daros@hotmail.com",
          celular: "48 998132453",
          cpf: "107.045.872-07",
          pais: "Brasil",
          uf: "SC",
          cidade: "Içara",
          bairro: "Jardim",
          logradouro: "teste",
          numero: "506",
          cep: 88820000,
          status: 1,
          id_usuario: 1
        }
      ]
    }
  },
  methods: {
    cadastrar(){
      api.post("/voluntarios/", this.voluntary);
    }
  },
  mounted(){
    this.$emit('logado');
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
</style>