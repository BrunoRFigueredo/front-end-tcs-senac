<template>
  <div class="login-page">
    <div class="form">
      <div class="alert alert-danger" role="alert" v-if="this.erro">
        {{this.erro}}
      </div>
      <div class="header">
          <p>Cadastro de Usuário</p>
      </div>        <img id="blah" :src="url" alt="Sua imagem de perfil" width="200" height="200" style="align-content: center" />

      <form class="login" @keyup="this.limpaErro()">
        <div class="label">
          <label for="imagem" class="form-label">Imagem de perfil</label>
        </div>
        <div class="form-group">
          <input accept="image/*" type="file" class="form-control" @change="onFileChange" id="imagem"/>
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
          <BotaoSalvar :disabled="desabilitar()" @click="cadastrar(usuario)"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import CrudService from "@/services/crud";
import BotaoSalvar from "@/components/BotaoSalvar.vue";

export default {
    name: "form-usuario",
    components: {
      BotaoSalvar,
    },
    data() {
        return {
            url: null,
            usuario: {
                nome: "",
                email: "",
                senha: "",
                confirmarSenha: "",
                dataHoraCadastro: Date.now(),
                status: 1,
                perfilPermissao: 1
            },
            erro: '',
        };
    },
    mounted() {
        this.$crudUsuario = new CrudService("/usuario/");
        this.$crudImagem = new CrudService("/imagem/");
    },
    methods: {
        async cadastrar(usuario) {
            this.erro = "";
            if (this.usuario.senha != this.usuario.confirmarSenha) {
                this.erro = "A senha não confere com a confirmaçao";
            }
            else {
                try {
                    if (this.files) {
                        const imagem = await this.$crudImagem.saveImagem(this.files);
                        this.usuario.imagem = imagem.data.idImagem;
                    }
                    await this.$crudUsuario.save(usuario);
                    this.$router.push("/usuario-login");
                }
                catch (erro) {
                    this.erro = erro.response.data.message;
                }
            }
        },
        desabilitar() {
            return (!this.usuario.nome || this.usuario.nome.length > 100) ||
                (!this.usuario.email || this.usuario.email.length > 150) ||
                (!this.usuario.senha || this.usuario.senha.length > 100) ||
                (!this.usuario.confirmarSenha || this.usuario.confirmarSenha.length > 100) ||
                (this.usuario.senha.length < 6) ||
                (this.usuario.confirmarSenha.length < 6) ||
                (!this.files);
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                return;
            }
            this.files = files[0];
        },
        limpaErro(){
          this.erro = '';
        }
    },
    components: { BotaoSalvar }
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
  padding: 3px;
  box-sizing: border-box;
  font-size: 14px;
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