<template>
  <!-- <dir id="user-form"> -->
    <form action="" class="col-md-8" id="formulario" @submit="checkForm">
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
        <input type="password" class="form-control" v-model="usuario.senha" required>
      </div>
      <label for="exampleInputEmail1" class="form-label">Confirmar senha</label>
      <div class="mb-3">
        <input type="password" class="form-control" v-model="usuario.confirmarSenha" required>
      </div>
      <div class="col-md-12">
        <button type="submit" class="btn btn-success" :disabled="desabilitar()" @click="cadastrar">Cadastrar</button>
      </div>
    </form>
  <!-- </dir> -->
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
        senha: '',
        confirmarSenha: '',
        dataHoraCadastro: Date.now(),
        status: 1,
        perfilPermissao: 1
      }
    }
  },
  methods: {
    cadastrar(){
      if (this.usuario.senha != this.usuario.confirmarSenha){
        alert('A senha não confere com a confirmaçao');
      } else {
        api.post("/usuario/criar-usuario", this.usuario)
        .then((r) => {
            alert('Usuário criado com sucesso');
            this.$router.push('/usuario-login');
        }).catch(error => {
            alert('Erro ao criar usuário ' + error.response.data.message);
        })
      }
    },
    desabilitar(){
      return (!this.usuario.nome || this.usuario.nome.length > 100) ||
             (!this.usuario.email || this.usuario.email.length > 150) ||
             (!this.usuario.senha || this.usuario.senha.length > 100) ||
             (!this.usuario.confirmarSenha || this.usuario.confirmarSenha.length > 100);
    }
  },
}
</script>

<style scoped>
  #formulario{
    margin: 0 auto;
  }
</style>