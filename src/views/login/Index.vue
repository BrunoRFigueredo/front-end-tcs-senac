<template>
  <div class="login-page">
    <div class="form">
      <div class="alert alert-danger" role="alert" v-if="this.erro">
        {{this.erro}}
      </div>
      <form class="login" @keyup="this.limpaErro()">
        <div class="form-group">
          <div class="label">
            <label for="email">Email</label>
          </div>
          <input id="email" type="email" class="form-control" placeholder="exemplo@exemplo.com" v-model="usuario.email" required>
        </div>
        <div class="form-group">
          <div class="label">
            <label for="senha">Senha</label>  
          </div>
          <input id="senha" type="password" class="form-control" placeholder="********" v-model="usuario.senha" required>
        </div>
        <button @click="logar()" type="submit" class="btn btn-primary">Login</button>
        <router-link to="/usuario-register"><p class="message">Ainda não está registrado? <a>Criar conta</a></p></router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from '@/services/auth'

export default {
  name: 'user-login',
  data(){
    return{
      usuario:{
        email: '',
        senha: ''
      },
      erro: ''
    }
  },
  methods:{
    async logar(){
      this.error = '';
      if (!this.usuario.email){
        this.erro = 'Informe o seu email!';
        return;
      }
      if (!this.usuario.senha){
        this.erro = 'Informe a sua senha!';
        return;
      }
      if (this.usuario.senha.length < 6){
        this.erro = 'A senha deve conter 6 caracteres!';
        return;
      }
      try{
        await login(this.usuario.email, this.usuario.senha);
        this.$emit('logado');
        this.$router.push('/instituicao');
      }catch(error){
        this.erro = error.response.data.message;
      }
    },
    limpaErro(){
      this.erro = '';
    }
  }
}
</script>

<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Roboto:300);

.login-page {
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 460px;
  margin: 0 auto 100px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  margin: auto;
}
.label {
  text-align: left;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  color: black;
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form .message {
  margin: 15px 0 0;
  color: black;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}
body {
  background: #76b852; /* fallback for old browsers */
  background: rgb(141,194,111);
  background: linear-gradient(90deg, rgba(141,194,111,1) 0%, rgba(118,184,82,1) 50%);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;      
}
</style>