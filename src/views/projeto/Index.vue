<template>
  <div id="index-project" class="container">
    <div v-for="project in projects" :key="project.id">{{project}}</div>
  </div>

  <!-- botões apenas para testes, manter mas adequar conforme novo layout da pagina -->
  <button>Meus Projetos - Teste</button>

    <router-link to="/cadastrar-projeto">
      <button>
        Cadastrar Projeto - Teste
      </button>              
    </router-link>
    
</template>

<script>
import api from "../../services/api";
export default {
  name: "index-project",
  data(){
    return{
      projects: []
    }
  },
  mounted(){
    /*api.get("/projeto/").then(r => {
      this.projects = r.data;
    })*/
    this.$emit('logado');
  }
}
</script>