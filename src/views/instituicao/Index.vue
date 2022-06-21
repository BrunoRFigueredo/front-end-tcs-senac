<template>
<div class="btn-instituicao" >
  <router-link to="/cadastro-instituicao">
    <button class="btn-vincular" type="button" v-if="this.verificaBotao()">
      Vincular-se a uma Instituição
    </button>
  </router-link>
</div>
<section class="wrapper">
  <div class="content">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-4" v-for="instituicao in instituicoes.conteudo" :key="instituicao.id">
          <div class="card">
            <router-link :to="`/instituicao/${instituicao.id}`">
              <a class="img-card">
                <img :src="'data:image.'+ instituicao.usuario.imagem.fileType.split('/')[1] +';base64,' + instituicao.usuario.imagem.file" alt="Logo">
              </a>
            </router-link>
            <div class="card-content">
              <h4 class="card-title">
                <router-link :to="`/instituicao/${instituicao.id}`">
                  <a>{{instituicao.nome}}</a>
                </router-link> 
              </h4>
              <div>
                <a>Email: {{instituicao.email}}</a>
              </div>
              <div>
                <a>CNPJ: {{instituicao.cnpj}}</a>
              </div>
              <div>
                <a>Telefone: {{instituicao.telefone}}</a>
                <span @click="this.enviaMensagem(instituicao.telefone, 'Olá!')"> - <img src="../../assets/whatsapp.png" width="20" alt=""></span>
              </div>
            </div>
          </div>
      </div>            
    </div>
    <div class="row"> 
        <div class="h5 col-md">
            Página {{ paginaDesejada }} de {{ totalPagina }}
          </div>
          <div class="col-md">
            <v-pagination
              v-model="paginaDesejada"
              :pages="totalPagina"
              :range-size="tamanhoPagina"
              :hideFirstButton="true"
              :hideLastButton="true"
              active-color="#DCEDFF"
              @update:modelValue="carregarInstituicoes"
            />
          </div>
        </div>    
     </div>
  </div>
</section>


</template>

<script>
import {getLogado, isLogged} from "@/services/auth";
import CrudService from "@/services/crud"
import { buscarInstituicao } from "@/util/buscaInstituicao";
import { buscarVoluntario } from "@/util/buscaVoluntario";
import {enviaWhatsapp} from "@/util/enviaWhatsapp";
import VPagination from "@hennge/vue3-pagination";

export default {
  name: 'index-instituicao',
  components: {
    VPagination
  },
  data() {
    return {
      instituicoes: [],
      imagemBase64: '',
      tamanhoPagina: 6,
      paginaDesejada: 1,
      total: 0,
      totalPagina: 0,
      instituicaoUsuario: '',
      idInstituicaoUsuario: 0,
      idVoluntarioUsuario: 1
    }
  },
  async mounted() {
    this.$crudInstituicao = new CrudService('/instituicao/');
    this.$usuarioInstituicao = new CrudService('/instituicao/usuario/');
    this.$crudImagem = new CrudService('/usuario/');
    await this.verificaInstituicao(getLogado());
    this.carregarInstituicoes();
    this.$emit('logado');
  },
  methods: {
    verificaBotao() {
      if (this.verificaLogado()) {
        if (this.idInstituicaoUsuario === 0){
          return true;
        };
      }
    },
    async carregarInstituicoes() {
      const {data} = await this.$crudInstituicao.findAll({
        paginaDesejada: this.paginaDesejada - 1,
        tamanhoPagina: this.tamanhoPagina
      })
      this.instituicoes = data;
      this.total = data.totalRegistros;
      const calculoPaginacao = data.totalRegistros / this.tamanhoPagina;
      this.totalPagina = calculoPaginacao === Math.floor(calculoPaginacao) ? calculoPaginacao : Math.floor(calculoPaginacao) + 1;
    },
    verificaLogado() {
      return isLogged();
    },
    async verificaInstituicao(idUsuario) {
      if (getLogado()) {
        try {
          this.instituicaoUsuario = await this.$usuarioInstituicao.findById(idUsuario);
          this.idInstituicaoUsuario = this.instituicaoUsuario.data.id;
        } catch (erro) {
          console.log(erro);
        }
      }
    },
    enviaMensagem(telefone, mensagem) {
      enviaWhatsapp(telefone, mensagem);
    },
  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:400,100,900);

html,
body {
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  background: #FFF;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
}

.contato {
  text-align: center;
}

.wrapper {
  display: table;
  height: 100%;
  width: 100%;
}

.container-fostrap {
  display: table-cell;
  padding: 1em;
  text-align: center;
  vertical-align: middle;
}

.fostrap-logo {
  width: 100px;
  margin-bottom: 15px
}

h1.heading {
  color: #fff;
  font-size: 1.15em;
  font-weight: 900;
  margin: 0 0 0.5em;
  color: #505050;
}

@media (min-width: 450px) {
  h1.heading {
    font-size: 3.55em;
  }
}

@media (min-width: 760px) {
  h1.heading {
    font-size: 3.05em;
  }
}

@media (min-width: 900px) {
  h1.heading {
    font-size: 3.25em;
    margin: 0 0 0.3em;
  }
}

.card {
  display: block;
  margin-bottom: 20px;
  line-height: 1.42857143;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: box-shadow .25s;
}

.card:hover {
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.img-card {
  width: 100%;
  height: 200px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  display: block;
  overflow: hidden;
}

.img-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: all .25s ease;
}

.card-content {
  padding: 15px;
  text-align: left;
}

.card-title {
  margin-top: 0px;
  font-weight: 700;
  font-size: 1.65em;
}

.card-title a {
  color: #000;
  text-decoration: none !important;
}

.card-read-more {
  border-top: 1px solid #D4D4D4;
}

.card-read-more a {
  text-decoration: none !important;
  padding: 10px;
  font-weight: 600;
  text-transform: uppercase;
  align-items: center;
}

.btn-instituicao {
  border: none;
  text-align: right;
  margin: 10px;
  font-family: Arial, Helvetica, sans-serif;
}
.btn-vincular {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: #4CAF50;
    width: 20%;
    border: 0;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    /* -webkit-transition: all 0.3 ease; */
    transition: all 0.3 ease;
    cursor: pointer;
    border-radius: 5px;
    }
  .card-content a{
    color: black;
  }

</style>
