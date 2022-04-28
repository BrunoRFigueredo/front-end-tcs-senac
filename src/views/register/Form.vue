<template>
  <dir id="user-form">
    <form action="" class="w-50" id="formulario" @submit="checkForm">
      <h3 class="text-center pb-4"><strong>Cadastrar usuário</strong></h3>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Seu nome</label>
        <input type="text" class="form-control" v-model="usuario.nome" required>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email</label>
        <input type="email" class="form-control" v-model="usuario.email" required>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Senha</label>
        <input type="password" class="form-control" v-model="usuario.password" required>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Confirmar senha</label>
        <input type="password" class="form-control" v-model="usuario.confirmPassword" required>
      </div>
      <button type="submit" class="btn btn-success" @click="cadastrar">Cadastrar</button>
      <p v-if="errors.length" class="mt-2">
      <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
      <ul>
        <li v-for="error in errors" :key="error" class="text-danger" style="list-style: none;">{{ error }}</li>
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
      usuario: {
        nome: '',
        email: '',
        password: '',
        confirmPassword: '',
        dataHoraCadastro: Date.now(),
        status: 'a',
        perfilPermissao: 1
      }
    }
  },
  methods: {
    checkForm: function (e) {
      if (this.usuario.nome) {
        return true;
      }

      this.errors = [];

      if (!this.usuario.nome) {
        this.errors.push('O nome é obrigatório.');
      }

      if (!this.usuario.email) {
        this.errors.push('O email é obrigatório.');
      }
      
      if (!this.usuario.password) {
        this.errors.push('A senha é obrigatório.');
      }

      if(!this.usuario.confirmPassword){
        this.errors.push('A confirmação da senha é obrigatória');
      }

      if(this.usuario.password != this.usuario.confirmPassword){
        this.errors.push(e.error.message);
      }

      e.preventDefault();
    },
    cadastrar(){
      if(this.password === this.confirmPassword){
        api.post("/usuario", this.usuario).then((r) => {
        console.log(this.usuario, r)
      })
      }
    }
  },
  
  
}
</script>

<style scoped>
  #formulario{
    margin: 0 auto;
  }
</style>