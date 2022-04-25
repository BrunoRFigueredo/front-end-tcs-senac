<template>
  <div id="users" class="container">
    <div class="row">
      <div class="card" style="width: 18rem;" v-for="user in users" :key="user.id">
        <div class="card-body">
          <h5 class="card-title">{{user.name}}</h5>
          <p class="card-text">{{user.email}}</p>
          <p class="card-text">{{user.status}}</p>
          <button @click="editar(user)"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
export default {
  name: 'indexUsers',
  data(){
    return{
      users: [],
      
    }
  },
  mounted(){
    api.get("/usuario").then((r) => {
      this.users = r.data;
      console.log(this.users);
    })
  },
  methods: {
    /*deleted(id){
      api.delete(`/usuario/${id}`).then(r => {
        api.get("/usuario").then((r) => {
      this.users = r.data;
      console.log(this.users);
    })
      }).catch(err => {
        console.log(err)
      })
    }*/
    edit(user){
      this.users = user;
      api.post("/usuario", user).then(r => {
        console.log(user);
      })
    }
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

  .card{
    margin: 10px auto;
  }
</style>