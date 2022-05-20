<template>
  <div id="index-instituition">
    <div class="container">
      <div class="row">
        <div class="card" style="width: 18rem;" v-for="inst in projects" :key="inst.id">
          <img src="https://pokeapi.co/api/v2/ability/7/" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{inst.name}}</h5>
            <p class="card-text">{{inst.cnpj}}</p>
            <p class="card-text">{{inst.pix}}</p>
            <router-link to="/home"><a href="#" class="btn btn-primary">Visualizar</a></router-link>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
export default {
  data(){
    return{
      projects: [],
    }
  },
  mounted(){
    api.get("/projects").then(r => {
      this.projects = r.data;
      console.log(this.projects);
    })
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
  }

  .card{
    margin: 10px auto;
  }
</style>