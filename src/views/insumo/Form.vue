<template>
  <div class="login-page">
    <div class="form">
      <div class="alert alert-danger" role="alert" v-if="this.erro">
        {{this.erro}}
      </div>
      <form class="login" @keyup="this.limpaErro()">
        <h3 class="text-center pb-4" v-if="!this.$route.params.id"><strong>Cadastrar Insumo</strong></h3>
        <h3 class="text-center pb-4" v-if="this.$route.params.id"><strong>Editar Insumo</strong></h3>

        <div class="row">
          <div class="form-group col-md-12">
            <div class="label">
              <label for="nome" class="form-label">Nome do Insumo</label>
            </div>
            <div>
              <input id="nome" type="text" class="form-control" v-model="insumo.nome">
            </div>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-12">
            <div class="label">
              <label for="descricao" class="form-label">Descrição</label>
            </div>
            <div>
              <input id="descricao" type="text" class="form-control" v-model="insumo.descricao">
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="form-group col-md-8">
            <div class="label">
              <label for="categoria" class="form-label">Categoria</label>
            </div>
            <div>
              <select id="categoria" class="form-select" v-model="insumo.categoria">
                <option v-for="categoria in categorias" :value="categoria.id">
                  {{categoria.nome}}
                </option>
              </select>
            </div>
          </div>

          <div class="form-group col-md-4">
            <div class="label">
              <label for="descricao" class="form-label">Und. Medida</label>
            </div>
            <div>
              <select id="unidadeMedida" class="form-select" v-model="insumo.unidadeMedida">
                <option value="KG">KG</option>
                <option value="UN">UN</option>
                <option value="LT">Litro(s)</option>
                <option value="CX">Caixa(s)</option>
              </select>
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
        <BotaoSalvar @click="cadastrar(insumo)" />
      </form>
    </div>
  </div>
</template>

<script>
import { getLogado } from '@/services/auth';
import CrudService from '@/services/crud';
import { buscarInstituicao } from '@/util/buscaInstituicao';
import BotaoSalvar from '@/components/BotaoSalvar.vue';

export default {
  name: "form-insumo",
  components: {
    BotaoSalvar
  },
  data() {
    return {
      insumo: {
        nome: '',
        descricao: '',
        unidadeMedida: '',
        categoria: '',
        instituicao: '',
      },
      nomeInstituicao: '',
      categorias: [],
      erro: '',
    }
  },
  async mounted() {
    this.$emit('logado');
    this.$crudInsumo = new CrudService('/insumo/');
    //
    let idUsuarioLogado = getLogado();
    const dados = await buscarInstituicao(idUsuarioLogado);
    this.$getCategoriaInstituicao = new CrudService('/categoria/instituicao/' + dados.instituicao.id);
    this.insumo.instituicao = dados.instituicao.id;
    this.nomeInstituicao = dados.instituicao.nome;
    //
    const {data} = await this.$getCategoriaInstituicao.findAll({});    
    this.categorias = data.conteudo;
    //
    if (this.$route.params.id){
      this.carregaInsumo(this.$route.params.id);
    }
  },
  methods: {
    estaLogado(){
      console.log('');
    },
    async cadastrar(insumo){
      try {        
        await this.$crudInsumo.save(insumo);
        this.$router.push('/insumo');
      } catch (erro) {
        this.erro = erro.response.data.message;
      }
    },
    async carregaInsumo(idInsumo){
      const {data} = await this.$crudInsumo.findById(idInsumo);
      this.insumo = data;
      this.insumo.categoria = data.categoria.id
      this.insumo.instituicao = data.instituicao.id;
      console.log(data);
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