<template>
  <div id="users" class="container">
    <ul class="list-group w-50">
      <li class="list-group-item" v-for="user in users" :key="user.id">
        <h4><strong>{{user.name}}</strong></h4>
        <p>{{user.email}}</p>
        <p>{{user.status}}</p>
        <button class="btn btn-danger" @click="deleted(user.id)">Excluir</button>
      </li>
    </ul>
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
    api.get("/users").then((r) => {
      this.users = r.data;
      console.log(this.users);
    })
  },
  methods: {
    deleted(id){
      api.delete(`/users/${id}`).then(r => {
        api.get("/users").then((r) => {
      this.users = r.data;
      console.log(this.users);
    })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  ul{
    margin: 0 auto
  }

  li{
    margin-top: 2%;
  }
</style>