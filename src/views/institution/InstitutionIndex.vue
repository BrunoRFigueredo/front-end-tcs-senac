<template>
  <div id="index-instituition">
    <div class="container">
      <div class="row">
        <div class="card" style="width: 18rem;" v-for="inst in institutions" :key="inst.id">
          <img src="#" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{inst.name}}</h5>
            <p class="card-text">{{inst.cnpj}}</p>
            <p class="card-text">{{inst.pix}}</p>
            <button class="botao">Visualizar</button>
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
      institutions: [],
    }
  },
  mounted(){
    api.get("/institutions").then(r => {
      this.institutions = r.data;
      console.log(this.institutions);
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