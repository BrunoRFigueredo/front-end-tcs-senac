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
      <button class="btn btn-success" @click="cadastro(insumo)">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import CrudService from '../../services/crud';
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
  async mounted(){

    /*this.$crudInsumo = new CrudService('/insumo/')
    this.carregarInsumo();*/

    this.$crudCategoria = new CrudService('/categoria/')
    this.carregarCategoria();
  },
  methods: {

    /*async cadastro(insumo){
       const crudInsumo = new CrudService("/insumos/");
       await crudInsumo.save(insumo);
    },*/

    /*async carregarInsumo(){
      const {data} = this.$crudInsumo.findAll({
        tamanhoPagina: this.tamanhoPagina,
        paginaDesejada: this.paginaDesejada
      })
      console.log(data);
    },*/

    async carregarCategoria(){
      const {data} = await this.$crudCategoria.findAll({
        tamanhoPagina: this.tamanhoPagina,
        paginaDesejada: this.paginaDesejada
      })
      console.log(data);
      this.categorias = data;
    }
  }
}
</script>

<style scoped>
  form{
    margin: 0 auto;
  }
</style>