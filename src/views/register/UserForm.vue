<template>
  <dir id="user-form">
    <form action="" class="w-50" id="formulario">
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
      <button type="submit" class="btn btn-success"  :disabled="disabled()" @click="cadastrar">Cadastrar</button>
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
        nome: 'pedro lucas',
        email: 'pedro@hotmail.com',
        password: '12345',
        confirmPassword: '12345',
        dataHoraCadastro: Date.now(),
        status: 'a',
        perfilPermissao: 1
      }
    }
  },
  methods: {
    disabled(){
      return (!this.usuario.nome || this.usuario.nome.length > 100) || 
             (!this.usuario.email || this.usuario.email.length > 150 || !this.usuario.email.includes('@')) || 
             (!this.usuario.password || this.usuario.password.length > 100) || 
             (!this.usuario.confirmPassword || this.usuario.confirmPassword.length > 100);
    },
    cadastrar(){
      if(this.usuario.password != this.usuario.confirmPassword){
        alert('As senhas não conferem, verifique!');
      }else{
        api.post("/usuario/", this.usuario)
        .then(() => {
          alert('Usuário cadastrado com sucesso!');
          window.location.reload();
      })
      .catch(e => {
        alert('Erro ao gravar usuário: ' + e.response.data.message);
      });
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