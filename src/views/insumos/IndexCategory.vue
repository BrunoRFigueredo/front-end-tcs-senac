<template>
  <div id="index-category" class="container">
    <form action="" class="w-50">
      <h3 class="text-center pb-4"><strong>Cadastrar Categoria</strong></h3>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Nome da categoria</label>
        <input type="text" class="form-control" v-model="categoria.nome" required>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Descrição</label>
        <input type="text" class="form-control" v-model="categoria.descricao" required>
      </div>
      <button class="btn btn-success" @click="cadastro">Cadastrar</button>
    </form>
    <ul class="list-group w-25 mt-4">
      <li v-for="cate in categorias.conteudo" :key="cate.id" class="list-group-item">
        <input type="text" v-model="cate.nome">
        <input type="text" v-model="cate.descricao">
        <button class="btn btn-danger m-1" @click="deletar(cate.id)">X</button>
        <button class="btn btn-danger m-1" @click="atualizar(cate.id, cate)">✔</button>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../../services/api";
export default {
  name: "index-category",
  data(){
    return{
      categorias: [],
      categoria: {
        nome: '',
        descricao: ''
      }
    }
    
  },
  mounted(){
    api.get("/categoria/").then(r => {
      this.categorias = r.data;
      console.log(this.categorias.conteudo)
    })
  },
  methods:{
    cadastro(){
      api.post("/categoria/", this.categoria).then(r => {
        api.get("/categoria/").then(r => {
          this.categorias = r.data;
        });
      })
    },
    deletar(id){
      api.delete(`/categoria/${id}`).then(
        api.get("/categoria/").then(r => {
        this.categorias = r.data;
    }),
      );
    },
    atualizar(id, cate){
      api.put(`/categoria/${id}`, cate).then(r => {
        api.get("/categoria/").then(r => {
          this.categorias = r.data;
        })
      }).catch(err => {
        console.log(err)
      });
    }
  }
}
</script>

<style scoped>
  form{
    margin: 0 auto;
    align-items: center;
    justify-items: center;
  }

  ul{
    margin: 0 auto;
  }

  ul button{
    float: right;
  }
  
</style>