<template>
  <div id="user-login">
    <div class="container">
      <h2>NAP</h2>
        <p>Email</p>
        <input type="email" name="email" v-model="usuario.email" required>
        <p>Senha</p>
        <input type="password" name="senha" v-model="usuario.senha" required>
        <br>
        <label class="bootstrap-show-notification" for="">{{error}}</label>
        <button @click="logar()" type="submit" class="botao">Entrar</button>
      <div class="text-center mt-5">
        <router-link to="/usuario-register">Não possui um cadastro ? Clique aqui</router-link>
      </div>
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
      error: ''
    }
  },
  methods:{
    async logar(){
      this.error = '';
      try{
        await login(this.usuario.email, this.usuario.senha);
        this.$router.push('/index');
        window.location.reload();
      }catch(error){
        console.log(error);
        this.error = error.response.data.message;
      }
    }
  }
}
</script>

<style scoped>
  form{
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input{
    margin-top: 10px;
    border-radius: 10px;
    background-color: #504B43;
    color: #fff;
    border: none;
    text-align: center;
    width: 25%;
  }

  p{
    font-weight: bold;
    margin-top: 20px;
    font-size: 20px;
  }

  .botao{
    width: 120px;
    border-radius: 10px;
    color: #fff;
    font-weight: bold;
    background-color: #504B43;
  }

  a{
    text-align: center;
    text-decoration: none;
    color: #8FD694;
    font-size: 12px;
  }
  
  h2{
    color: #8FD694;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
    font-size: 45px;
  }
  
</style>