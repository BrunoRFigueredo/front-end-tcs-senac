<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <div class="login-icon">
          <i class="fas fa-hands-helping"></i>
        </div>
        <h2>Bem-vindo de volta</h2>
        <p class="login-subtitle">Entre na sua conta para continuar</p>
      </div>
      <div class="alert alert-danger" role="alert" v-if="this.erro">
        {{this.erro}}
      </div>
      <form class="login-form" @keyup="this.limpaErro()">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input id="email" type="email" class="form-control" placeholder="exemplo@exemplo.com" v-model="usuario.email" required>
        </div>
        <div class="form-group">
          <label for="senha" class="form-label">Senha</label>
          <input id="senha" type="password" class="form-control" placeholder="********" v-model="usuario.senha" required>
        </div>
        <button @click="logar()" type="submit" class="btn-submit">Entrar</button>
        <router-link to="/usuario-register">
          <p class="message">Ainda não está registrado? <span class="link-accent">Criar conta</span></p>
        </router-link>
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
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  margin: -24px;
}

.login-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  padding: 40px;
  width: 100%;
  max-width: 420px;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 24px;
  color: var(--white);
}

.login-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0 0 8px;
}

.login-subtitle {
  color: var(--gray-500);
  font-size: 14px;
  margin: 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group .form-label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  font-size: 13px;
  color: var(--gray-700);
}

.login-form .form-control {
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid var(--gray-200);
  border-radius: var(--radius);
  font-size: 14px;
  transition: var(--transition);
  background: var(--gray-50);
}

.login-form .form-control:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  background: var(--white);
}

.btn-submit {
  width: 100%;
  padding: 12px;
  background: var(--primary);
  color: var(--white);
  border: none;
  border-radius: var(--radius);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  margin-top: 8px;
}

.btn-submit:hover {
  background: var(--primary-dark);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.message {
  text-align: center;
  margin-top: 20px;
  color: var(--gray-500);
  font-size: 13px;
}

.link-accent {
  color: var(--primary);
  font-weight: 600;
}

.link-accent:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

.alert-danger {
  margin-bottom: 20px;
}
</style>
