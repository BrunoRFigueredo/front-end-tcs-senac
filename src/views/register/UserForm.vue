<template>
  <dir id="user-form">
    <form action="" class="w-50" id="formulario" @submit="checkForm">
      <h3 class="text-center pb-4"><strong>Cadastrar usuário</strong></h3>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Seu nome</label>
        <input type="text" class="form-control" v-model="user.name">
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email</label>
        <input type="email" class="form-control" v-model="user.email">
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Senha</label>
        <input type="password" class="form-control" v-model="user.password">
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Confirmar senha</label>
        <input type="password" class="form-control" v-model="user.confirmPassword">
      </div>
      <button type="submit" class="btn btn-success" @click="created">Cadastrar</button>
      <p v-if="errors.length">
        <b>Campos obrigatórios</b>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </p>
    </form>
  </dir>
</template>


<script>
import api from "../../services/api";
export default {
  name: "user-form",
  data(){
    return{
      errors: [],
      user: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        dh_cadastro: Date.now(),
        status: true,
        id_perfil_permissao: 1
      }
    }
  },
  methods: {
    checkForm: function (e){
      this.errors = [];

      if(!this.name || !this.email || !this.password || !this.confirmPassword){
        this.errors.push("Todos os campos são obrigatório");
        return
      }
    },
    created(){
      api.post("/users", this.user).then((r) => {
        console.log(this.user, r)
      })
    }
  },
  
  
}
</script>

<style scoped>
  #formulario{
    margin: 0 auto;
  }
</style>