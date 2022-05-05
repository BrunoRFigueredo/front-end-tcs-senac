<template>
  <div class="col-md-12">
    <div class="container">
      <form class="form-group">
        <h2>Bem vindo!</h2>
          <label for="email" class="form-label">Email</label>
          <div class="col-md-6">
            <input type="email" name="email" class="form-control" v-model="usuario.email" required>
          </div>
          <br>
          <label for="senha" class="form-label">Senha</label>
          <div class="col-md-6">
            <input type="password" name="senha" class="form-control" v-model="usuario.senha" required>
          </div>
          <span v-if="error" class="alert alert-warning" for="">{{error}}</span>
          <div>
            <button @click="logar()" type="submit" class="btn btn-success">Entrar</button>
          </div>
          <div class="text-center mt-5">
          <router-link to="/usuario-register">Não possui um cadastro ? Clique aqui</router-link>
        </div>
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

  /*/input{
    margin-top: 10px;
    border-radius: 10px;
    background-color: #504B43;
    color: #fff;
    border: none;
    text-align: center;
    width: 25%;
  }*/

  p{
    font-weight: bold;
    margin-top: 20px;
    font-size: 20px;
  }

  /*.botao{
    width: 120px;
    border-radius: 10px;
    color: #fff;
    font-weight: bold;
    background-color: #504B43;
  }*/

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
  span{
    margin: 10px;
  }
  button{
    margin-top: 30px;
    /*justify-content: center;*/
  }
</style>