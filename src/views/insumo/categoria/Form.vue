<template>
  <div class="login-page" v-if="this.estaLogado()">
    <div class="form">
      <form class="login" @keyup="this.limpaErro()">
        <div class="alert alert-danger" role="alert" v-if="this.erro">
          {{this.erro}}
        </div>
        <h3 class="text-center pb-4"><strong>Cadastrar Categoria</strong></h3>
        <div class="row">
          <div class="form-group col-md-12">
            <div class="label">
              <label for="nome" class="form-label">Nome da Categoria</label>
            </div>
            <div>
              <input id="nome" type="text" class="form-control" v-model="categoria.nome">
            </div>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-12">
            <div class="label">
              <label for="descricao" class="form-label">Descrição</label>
            </div>
            <div>
              <input id="descricao" type="text" class="form-control" v-model="categoria.descricao">
            </div>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-12 col-sm-12">
            <div class="label">
              <label for="instituicao" class="form-label">Instituição</label>
            </div>
            <div class="form-group col-md-12">
              <input id="instituicao" type="text" class="form-control" disabled v-model="this.nomeInstituicao" required>
            </div>
          </div>
        </div>
        <BotaoSalvar @click="cadastrar(categoria)" />
      </form>
    </div>
  </div>
</template>

<script>
import {getLogado, isLogged} from '@/services/auth';
import CrudService from "@/services/crud";
import { buscarInstituicao } from '@/util/buscaInstituicao';
import BotaoSalvar from '@/components/BotaoSalvar.vue';

export default {
  name: "form-service",
  components: {
    BotaoSalvar
},
  data() {
    return {
      categoria: {
        nome: '',
        descricao: '',
        instituicao: '',
        status: 1
      },
      erro: '',
      nomeInstituicao: '',
      erro: '',
    }
  },
  computed: {
    title() {
      return this.$route.params.id
          ? 'Editar categoria'
          : 'Nova categoria'
    }
  },
  async mounted() {
    this.$emit('logado')
    if (this.estaLogado()) {
      this.$crudCategoria = new CrudService('/categoria/');
      let idUsuarioLogado = getLogado();

      const dados = await buscarInstituicao(idUsuarioLogado);
      this.categoria.instituicao = dados.instituicao.id;
      this.nomeInstituicao = dados.instituicao.nome;

      if (this.$route.params.id) {
        this.carregaCategoria(this.$route.params.id)
      }
    } else {
      this.$router.push('/');
    }
  },
  methods: {
    async cadastrar(categoria) {
      try {
        await this.$crudCategoria.save(categoria);
        this.$router.push('/categoria');
      } catch (erro) {
        this.erro = erro.response.data.message;
      }
    },
    async carregaCategoria(idCategoria) {
      const {data} = await this.$crudCategoria.findById(idCategoria);
      this.categoria = data;
      this.categoria.instituicao = data.instituicao.id;
      console.log(this.instituicao);
    },
    desabilitar() {
      return ((!this.categoria.nome || this.categoria.nome.length > 45) ||
          (!this.categoria.descricao || this.categoria.descricao.length > 200))
    },
    estaLogado() {
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
  padding: 10px;
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
.btn-cadastrar{
    text-align: center;
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