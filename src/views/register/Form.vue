<template>
  <div class="register-page">
    <div class="register-card">
      <div class="register-header">
        <div class="register-icon">
          <i class="fas fa-user-plus"></i>
        </div>
        <h2>Criar conta</h2>
        <p class="register-subtitle">Cadastre-se para participar de projetos sociais</p>

      </div>
      <div class="alert alert-danger" role="alert" v-if="this.erro">
        {{this.erro}}
      </div>
      <div class="avatar-section">
        <img id="blah" :src="url" alt="Sua imagem de perfil" class="avatar-preview" v-if="url" />
        <div class="avatar-placeholder" v-else>
          <i class="fas fa-camera"></i>
        </div>
      </div>
      <form class="register-form" @keyup="this.limpaErro()">
        <div class="form-group">
          <label for="imagem" class="form-label">Imagem de perfil</label>
          <input accept="image/*" type="file" class="form-control" @change="onFileChange" id="imagem"/>
        </div>
        <div class="form-group">
          <label for="nome" class="form-label">Nome</label>
          <input id="nome" type="text" class="form-control" placeholder="Seu nome completo" v-model="usuario.nome" required>
        </div>
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input id="email" type="email" class="form-control" placeholder="exemplo@exemplo.com" v-model="usuario.email" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="senha" class="form-label">Senha</label>
            <input id="senha" type="password" class="form-control" placeholder="Min. 6 caracteres" v-model="usuario.senha" required>
          </div>
          <div class="form-group">
            <label for="confirmarSenha" class="form-label">Confirmar senha</label>
            <input id="confirmarSenha" type="password" class="form-control" placeholder="Confirme a senha" v-model="usuario.confirmarSenha" required>
          </div>
        </div>
        <div class="form-group">
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
                this.erro = "A senha nao confere com a confirmacao";
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
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
  margin: -24px;
}

.register-card {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  padding: 40px;
  width: 100%;
  max-width: 520px;
}

.register-header {
  text-align: center;
  margin-bottom: 24px;
}

.register-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--secondary) 0%, #10b981 100%);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 24px;
  color: var(--white);
}

.register-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0 0 8px;
}

.register-subtitle {
  color: var(--gray-500);
  font-size: 14px;
  margin: 0;
}

.avatar-section {
  text-align: center;
  margin-bottom: 24px;
}

.avatar-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary-light);
  box-shadow: var(--shadow-md);
}

.avatar-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 28px;
  color: var(--gray-400);
  border: 2px dashed var(--gray-300);
}

.form-group {
  margin-bottom: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.register-form .form-control {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid var(--gray-200);
  border-radius: var(--radius);
  font-size: 14px;
  transition: var(--transition);
  background: var(--gray-50);
}

.register-form .form-control:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  background: var(--white);
}

@media (max-width: 580px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
