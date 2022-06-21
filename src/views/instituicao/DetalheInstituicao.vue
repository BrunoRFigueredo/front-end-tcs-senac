<template>
  <div id="index-instituition" v-if="empty">
    <div class="container w-50 cardCenter">
    <h3 class="text-center pt-2">{{instituicao.nome}}</h3>
      <div class="img-card">
        <img :src="'data:image.'+ instituicao.usuario?.imagem?.fileType.split('/')[1] +';base64,' + instituicao.usuario?.imagem?.file" alt="Logo">
      </div>

    <div class="row mt-4">
        <div class="col">
          <p>Estado: {{instituicao.estado}}</p>
          <p>Cidade: {{instituicao.cidade}}</p>
        </div>
        <div class="col">
          <p>CEP: {{instituicao.cep}}</p>
          <p>CNPJ: {{instituicao.cnpj}}</p>
        </div>
        <div class="col">
          <p>Estado: {{instituicao.logradouro}}</p>
          <p>Cidade: {{instituicao.numero}}</p>
        </div>
      </div>
      <div class="row mt-2 mb-2">
        <div class="col">
          <span class="text-success">Whatsapp<p class="fw-bold text-success">{{instituicao.telefone}}</p></span>
          <button @click="this.enviaMensagem(instituicao.telefone, 'Olá')" class="btn btn-success">Enviar mensagem</button>
        </div>
      </div>
      <br>
      <h4>
        Biografia da instituição
      </h4>
      <p class="fw-bold pb-4 descricao">{{instituicao.descricao}}</p>
    </div>
  </div>
</template>

<script>
import CrudService from '@/services/crud';
import { enviaWhatsapp } from '@/util/enviaWhatsapp';
import VueModal from "@kouts/vue-modal";
import { isLogged } from '@/services/auth';

export default {
  props: ['id'],
  components:{
    "Modal": VueModal,
},
  data(){
    return{
      instituicao:{},
      empty: false,
    }
  },
  async mounted(){
    this.$crudInstituicao = new CrudService(`/instituicao/`);
    this.carregarInstituicao(this.id);
    this.$emit('logado');
  },
  methods: {
    async carregarInstituicao(id){
      const { data } = await this.$crudInstituicao.findById(id);
      this.instituicao = data;
      this.empty = true; 
    },
    enviaMensagem(telefone, mensagem){
      enviaWhatsapp(telefone, mensagem);
    },
    verificaLogado(){
      return isLogged();
    }
  }
}
</script>

<style scoped>
p{
  font-size: 14px;
}

h3, h4, h5{
  color: black;
}

::-webkit-scrollbar-track {
    background-color: #F4F4F4;
}
::-webkit-scrollbar {
    width: 2px;
    background: #F4F4F4;
}
::-webkit-scrollbar-thumb {
    background: #dad7d7;
}

.descricao{
  word-break: break-word;
}

.cardCenter{
  background-color: #ADD8E6; text-align: center; border-radius: 10px;
}
  .img-card {
    width: 400px;
    height:400px;
    margin-left: 280px;
    border-top-left-radius:2px;
    border-top-right-radius:2px;
    display:block;
    overflow: hidden;
  }
  .img-card img{
    width: 400px;
    height: 400px;
    object-fit:cover; 
    transition: all .25s ease;
  } 
  .btn-cadastro{
    text-align: right;
    padding: 10px;
    padding-top: 0px;
  }
</style>