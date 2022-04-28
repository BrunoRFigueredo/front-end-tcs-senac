<template>
  <div id="form-service" class="container">
    <form action="" class="w-50">
      <div class="row mb-4">
        <div class="col">
          <label class="form-label">Nome do serviço</label>
          <input type="text" class="form-control" v-model="servico.nome" required>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col">
          <label class="form-label">Descrição do serviço</label>
          <input type="text" class="form-control" v-model="servico.descricao" required>
        </div>
      </div>
      <button class="botao mt-2" @click="cadastrar">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import api from "../../services/api";
export default {
  name: "form-service",
  data(){
    return{
      servico:{
        nome: '',
        descricao: '',
        status: 's'
      }
    }
  },
  methods: {
    cadastrar(){
      api.post("/servico/", this.servico);
    }
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