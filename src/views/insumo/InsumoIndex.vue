<template>
  <div id="index-insumo" class="container">
    <form action="" class="w-50">
      <h3 class="text-center pb-4"><strong>Cadastrar Insumo</strong></h3>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Nome da insumo</label>
        <input type="text" class="form-control" v-model="insumo.nome" required>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Descrição</label>
        <input type="text" class="form-control" v-model="insumo.descricao" required>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Und medida</label>
        <input type="text" class="form-control" v-model="insumo.unidadeMedida" required>
      </div>
      <div class="mb-3">
        <select v-model="insumo.id_categoria" class="w-25" required>
          <option v-for="cat in categorias.conteudo" :key="cat.id" v-bind:value="cat.id">{{cat.nome}}</option>
        </select>
        
      </div>
      <span>{{insumo.id}}</span>
      <button class="btn btn-success" @click="cadastro">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import api from "../../services/api";
export default {
  name: "index-insumo",
  data(){
    return{
      insumos: [],
      categorias: [],
      insumo: {
        nome: "",
        descricao: "",
        unidadeMedida: "KG",
        id_categoria: 1
      }
    }
  },
  mounted(){
    api.get("/insumos/").then(r => {
      this.insumos = r.data;
    });
    api.get("/categoria/").then(r => {
      this.categorias = r.data;
    })
  },
  methods: {
    cadastro(){
      //api.post("/insumos/", this.insumo);
      this.insumos.push(this.insumo);
      console.log(this.insumos);
      this.insumo.nome = "",
      this.insumo.descricao = "";
      this.insumo.id_categoria = "";
    }
  }
}
</script>

<style scoped>
  form{
    margin: 0 auto;
  }
</style>