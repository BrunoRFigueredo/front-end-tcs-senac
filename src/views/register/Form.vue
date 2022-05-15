<template>
  <!-- <dir id="user-form"> -->
  <form action="" class="col-md-8" id="formulario" @submit="checkForm">
    <h3 class="text-center pb-4"><strong>Cadastrar usuário</strong></h3>
    <div class="mb-12" >
    <img id="blah" :src="url" alt="your image" width="200" height="200" style="align-content: center" />
    </div>
    <div class="mb-3">
      <input accept="image/*" type="file" class="form-control" @change="onFileChange" id="customFile"/>
    </div>
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
        perfilPermissao: 1,
        imagem: ''
      }
    }
  },
  mounted() {
    this.$crudUsuario = new CrudService('/usuario/');
    this.$crudImagem = new CrudService('/imagem/');
  },
  methods: {
    async cadastrar() {
      if (this.usuario.senha != this.usuario.confirmarSenha) {
        alert('A senha não confere com a confirmaçao');
      } else {
        if (this.files) {
          const imagem = await this.$crudImagem.saveImagem(this.files);
          console.log(imagem);
          this.usuario.imagem = imagem.data.idImagem;
        }
        this.$crudUsuario.save(this.usuario).then((r) => {
          alert('Usuário criado com sucesso');
          this.$router.push('/usuario-login');
        }).catch(error => {
          alert('Erro ao criar usuário ' + error.response.data.message);
        })
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
#formulario {
  margin: 0 auto;
}
</style>