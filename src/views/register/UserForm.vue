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
    </form>
  </dir>
</template>


<script>
import api from "../../services/api";
export default {
  name: "user-form",
  data(){
    return{
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
    cadastrar(){
      if(this.password === this.confirmPassword){
        api.post("/usuario", this.usuario).then((r) => {
        console.log(this.usuario, r)
      }).catch(err => {
        console.log(err);
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