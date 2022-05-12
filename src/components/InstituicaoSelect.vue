<template>
  <div id="index-instituition">
    <div class="container w-50 cardCenter">
    <h3 class="text-center pt-2">{{instituicao.nome}}</h3>
      <div>
        <img src="https://fotografiamais.com.br/wp-content/uploads/2018/11/composicao-de-imagem-galeria-1.jpg" class="w-50">
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
      <div class="row">
        <div class="col">
          <p>PIX: {{instituicao.pix}}</p>
        </div>
        <div class="col">
          <p>Telefone: {{instituicao.telefone}}</p>
        </div>
      </div>
      <div class="row mt-2 mb-2">
        <div class="col">
          <p class="text-success">Whatsapp<p class="fw-bold text-success">{{instituicao.whatsapp}}</p></p>
          <button class="btn btn-success">Enviar mensagem</button>
        </div>
        <div class="col">
          <p class="text-danger">Deseja ser um <p class="text-danger">voluntário ?</p></p>
          <router-link class="btn btn-danger" to="">Candidatar-se</router-link>
        </div>
      </div>
      <p class="fw-bold pb-4 descricao">{{instituicao.descricao}}</p>
    </div>
  </div>
</template>

<script>
import CrudService from '@/services/crud'
export default {
  props: ['id'],
  data(){
    return{
      instituicao:{}
    }
  },
  async mounted(){
    this.$crudInstituicao = new CrudService(`/instituicao/`);
    this.carregarInstituicao(this.id);
  },
  methods: {
    async carregarInstituicao(id){
      const { data } = await this.$crudInstituicao.findById(id);
      this.instituicao = data;
      console.log(this.instituicao)
    }
  }
}
</script>

<style scoped>
p{
  font-size: 14px;
  color: #8391a2
}

h3, h4, h5{
  color: #535961
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
  background-color: #f4f4f4; text-align: center; border-radius: 10px;
}
</style>