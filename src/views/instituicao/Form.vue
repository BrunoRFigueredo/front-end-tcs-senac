<template>
  <div class="login-page" id="instituicao-form">
    <div class="form">
      <form class="login" @keyup="this.limpaErro()">
        <div class="alert alert-danger" role="alert" v-if="this.erro">
          {{this.erro}}
        </div>
        <div class="row">
          <span>*Informe <strong>exatamente</strong> os mesmos dados cadastrados na prefeitura.</span>
        </div>
        <div class="row">
          <span>*Após vincular-se a uma instituiçao, é necessário entrar novamente no sistema para liberar acessos as
            novas funcionalidades.</span>
        </div>
        <div class="row">
          <div class="form-group col-md-12 col-sm-12">
            <div class="label">
              <label for="nome" class="form-label">Nome</label>
              <input id="nome" type="text" class="form-control" v-model="instituicao.nome" required>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-6 col-sm-12">
            <div class="label">
              <label for="email" class="form-label">Email</label>
              <input id="email" type="email" class="form-control" v-model="instituicao.email" required>
            </div>
          </div>

          <div class="form-group col-md-6 col-sm-12">
            <div class="label">
              <label for="telefone" class="form-label">Telefone</label>
            </div>
            <div class="form-group">
              <input id="telefone" type="number" class="form-control" v-model="instituicao.telefone" required>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-6 col-sm-12">
            <div class="label">
              <label for="cnpj" class="form-label">CNPJ</label>
              <input id="cnpj" type="text" class="form-control" v-model="instituicao.cnpj" required>
            </div>
          </div>

          <div class="form-group col-md-3 col-sm-12">
            <div class="label">
              <label for="senha" class="form-label">Conta</label>
              <input id="pix" type="text" class="form-control" v-model="instituicao.conta" required>
            </div>
          </div>

          <div class="form-group col-md-3 col-sm-12">
            <div class="label">
              <label for="conta" class="form-label">Agencia</label>
              <input id="conta" type="text" class="form-control" v-model="instituicao.agencia" required>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-4 col-sm-12">
            <div class="label">
              <label for="cep" class="form-label">Cep</label>
            </div>
            <div class="form-group">
              <input id="cep" type="number" @keyup="this.buscaEndereco(this.instituicao.cep)" class="form-control"
                v-model="instituicao.cep" required>
            </div>
          </div>

          <div class="form-group col-md-4 col-sm-12">
            <div class="label">
              <label for="pais" class="form-label">Pais</label>
            </div>
            <div class="form-group">
              <input id="pais" type="text" class="form-control" placeholder="Exemplo: BR" :maxlength="maxEstado"
                v-model="instituicao.pais" required>
            </div>
          </div>

          <div class="form-group col-md-4 col-sm-12">
            <div class="label">
              <label for="estado" class="form-label">Estado</label>
            </div>
            <div class="form-group">
              <input id="estado" type="text" class="form-control" placeholder="Exemplo: SC" :maxlength="maxEstado"
                v-model="instituicao.estado" required>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-6 col-sm-12">
            <div class="label">
              <label for="cidade" class="form-label">Cidade</label>
            </div>
            <div class="form-group">
              <input id="cidade" type="text" class="form-control" v-model="instituicao.cidade" required>
            </div>
          </div>

          <div class="form-group col-md-6 col-sm-12">
            <div class="col">
              <div class="label">
                <label for="bairro" class="form-label">Bairro</label>
              </div>
              <div class="form-group">
                <input id="bairro" type="text" class="form-control" v-model="instituicao.bairro" required>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-10">
            <div class="label">
              <label for="logradouro" class="form-label">Logradouro</label>
            </div>
            <div class="form-group">
              <input id="logradouro" type="text" class="form-control" v-model="instituicao.logradouro" required>
            </div>
          </div>

          <div class="form-group col-md-2">
            <div class="label">
              <label for="numero" class="form-label">Número</label>
            </div>
            <div class="form-group">
              <input id="numero" type="number" class="form-control" v-model="instituicao.numero" required>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <div class="label">
              <label for="cep" class="form-label">Descrição</label>
            </div>
            <textarea name="descricao" id="descricao" class="w-100" v-model="instituicao.descricao"></textarea>
          </div>
        </div>
        <div class="col-md-12">
          <BotaoSalvar @click.prevent="cadastrar(instituicao)" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { getLogado, isLogged } from "@/services/auth";
import CrudService from "@/services/crud";
import axios from "axios";
import BotaoSalvar from "@/components/BotaoSalvar.vue";

export default {
  name: 'instituicao-form',
  components: {
    BotaoSalvar,
  },
  data() {
    return {
      instituicao: {
        nome: '',
        descricao: '',
        cnpj: '',
        agencia: '',
        conta: '',
        email: '',
        telefone: '',
        bairro: '',
        pais: '',
        estado: '',
        cidade: '',
        logradouro: '',
        numero: '',
        cep: '',
        usuario: getLogado(),
      },
      usuarioLogado: {
        id: '',
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        perfilPermissao: '',
        imagem: ''
      },
      maxEstado: 2,
      data: null,
      erro: '',
    }
  },
  mounted() {
    if (!this.verificaLogado()) {
      this.$router.push('/instituicao');
    } else {
      this.$emit('logado');
      this.$crudInstituicao = new CrudService('/instituicao/');
      this.$crudUsuario = new CrudService('/usuario/');
    }
  },
  methods: {
    async cadastrar(instituicao) {
      try {
        await this.$crudInstituicao.save(instituicao)
        this.$router.push('/instituicao');
      } catch (error) {
        this.erro = error.response.data.message;
      }
    },
    buscaEndereco(cep) {
      if (cep.toString().length >= 8) {
        axios.get('https://viacep.com.br/ws/' + cep + '/json/')
          .then(retorno => {
            (
              this.instituicao.estado = retorno.data.uf,
              this.instituicao.cidade = retorno.data.localidade,
              this.instituicao.logradouro = retorno.data.logradouro,
              this.instituicao.pais = 'BR',
              this.instituicao.bairro = retorno.data.bairro
            )
          })
          .catch(erro => {
            (
              console.log('Erro ao carregar dados do endereço ' + erro.response.data.message)
            )
          })
      }
    },
    verificaLogado() {
      return isLogged();
    },
    limpaErro(){
      this.erro = '';
    }
  }
}
</script>

<style scoped>
.login-page {
  margin: 10px;
}

.header {
  color: black;
  font-size: 30px;
}

.form {
  position: relative;
  z-index: 1;
  background: #ADD8E6;
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