<template>
  <div class="login-page">
    <div class="form">
      <div class="header">
          <p>Cadastro de Usuário</p>
      </div>
      <form class="login">
        <div class="mb-12" >
          <img id="blah" :src="url" alt="your image" width="200" height="200" style="align-content: center" />
        </div>
        <div class="mb-3">
          <input accept="image/*" type="file" class="form-control" @change="onFileChange" id="customFile"/>
        </div>
        <div class="label">
          <label for="nome" class="form-label">Nome</label>
        </div>
        <div class="form-group">
          <input id="nome" type="text" class="form-control" v-model="usuario.nome" required>
        </div>
        <div class="label">
          <label for="email" class="form-label">Email</label>
        </div>
        <div class="form-group">
          <input id="email" type="email" class="form-control" v-model="usuario.email" required>
        </div>
        <div class="label">
          <label for="senha" class="form-label">Senha</label>
        </div>
        <div class="form-group">
          <input id="senha" type="password" class="form-control" v-model="usuario.senha" required>
        </div>
        <div class="label">
          <label for="exampleInputEmail1" class="form-label">Confirmar senha</label>
        </div>
        <div class="form-group">
          <input type="password" class="form-control" v-model="usuario.confirmarSenha" required>
        </div>
        <div class="col-md-12">
          <button type="submit" class="btn btn-success" :disabled="desabilitar()" @click="cadastrar(usuario)">Cadastrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CrudService from "@/services/crud";

export default {
  name: "form-usuario",
  data() {
    return {
      url: null,
      usuario: {
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        dataHoraCadastro: Date.now(),
        status: 1,
        perfilPermissao: 1
      },
      erro: ''
    }
  },
  mounted() {
    this.$crudUsuario = new CrudService('/usuario/');
    this.$crudImagem = new CrudService('/imagem/');
  },
  methods: {
    async cadastrar(usuario){
      this.erro = '';
      if (this.usuario.senha != this.usuario.confirmarSenha){
        alert('A senha não confere com a confirmaçao');
      } else {
        try {
          if (this.files) {
            const imagem = await this.$crudImagem.saveImagem(this.files);
            console.log(imagem);
            this.usuario.imagem = imagem.data.idImagem;
          }
          await this.$service.save(usuario)
          alert('Usuário criado com sucesso, redirecionando...');
          this.$router.push('/usuario-login');
        } catch(erro) {
          this.erro = erro.response.data.message;
          alert(this.erro);
        }
      }
    },
    desabilitar() {
      return (!this.usuario.nome || this.usuario.nome.length > 100) ||
          (!this.usuario.email || this.usuario.email.length > 150) ||
          (!this.usuario.senha || this.usuario.senha.length > 100) ||
          (!this.usuario.confirmarSenha || this.usuario.confirmarSenha.length > 100);
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.files = files[0];
    }
  },
}
</script>

<style scoped>
.login-page {
  margin: 0;
}
.header{
  color: black;
  font-size: 30px;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 850px;
  margin: 0 auto 100px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  margin: auto;
  border-radius: 10px;
}
.label {
  text-align: left;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
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
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}
.form .register-form {
  display: none;
}

</style>