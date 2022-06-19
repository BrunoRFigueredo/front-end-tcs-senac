<template>
  <div id="index-project" class="container">
    <h4 class="text-center">Projetos Sociais</h4>
    <div class="row mt-5">
      <div class="col">
        <div class="card" v-for="proj in projetos" :key="proj.id">
        <img src="data:image/jpeg;base64,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"/>
        <div class="card__content">
          <h2>{{proj.nome}}</h2>
          <p>Data Início: {{proj.data_inicio}}</p>
          <p>Data Final: {{proj.data_final}}</p>
          <router-link :to="`/projeto/${proj.id}`" class="mt-2">Visualizar</router-link>
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
            @update:modelValue="carregarProjetos"
            class="pagination mt-2"
        />
      </div>
    </div>
    <div class="row mt-4">
      <div v-if="this.verificaLogado()" class="col">
        <router-link to="/cadastrar-projeto">
          <BotaoCadastrar />
        </router-link>    
      </div>
    </div>
  </div>  
</template>

<script>
import { isLogged } from '@/services/auth';
import CrudService from '@/services/crud';
import VPagination from "@hennge/vue3-pagination";
import BotaoCadastrar from '@/components/BotaoCadastrar.vue';
import { permit } from '@/util/permit';

export default {
  name: "index-project",
  components: {
    VPagination,
    BotaoCadastrar
},
  data() {
    return {
      projetos: [],
      tamanhoPagina: 3,
      paginaDesejada: 1,
      total: 0,
      totalPagina: 0,
      nomeInstituicao: '',
      idInstituicao: '',
    }
  },
  mounted() {
    this.$crudProjetos = new CrudService('/projeto/');
    this.$crudInstituicao = new CrudService('/instituicao/');
    this.carregarProjetos();
    this.$emit('logado');
  },
  methods: {
    async carregarProjetos() {
      const {data} = await this.$crudProjetos.findAll({
        paginaDesejada: this.paginaDesejada - 1,
        tamanhoPagina: this.tamanhoPagina
      })
      console.log(data)
      this.projetos = data.conteudo;
      this.total = data.totalRegistros;
      const calculoPaginacao = data.totalRegistros / this.tamanhoPagina;
      this.totalPagina = calculoPaginacao === Math.floor(calculoPaginacao) ? calculoPaginacao : Math.floor(calculoPaginacao) + 1;
    },
    verificaLogado(){
      //return isLogged();
      if (isLogged()){
        if (this.permissao(['INSTITUICAO'])){
          return true;
        }
        false;
      }
    },
    permissao(roles) {
      return permit(roles);
    },
  }
}
</script>

<style scoped>

body{
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.col{
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination{
  display: flex;
  justify-content: center;
  align-items: center;
}

.card{
  min-height:200px;
  width:260px;
  margin: 10px;
  padding:1rem;
  background-color:#fff;
  float: right;
}
.card img{
  width:100%;
  height:160px;
  border-radius:10px;
  position:relative;
  z-index:1000;
  transition:all .5s ease-in-out;
}
.card__content{
  margin:1rem 0;
  color:#222;
  overflow:hidden;
  margin-top:-200px;
  opacity:0;
  visibility:hidden;
  transition:all .5s ease-in-out;
}
.card__content h2{
  margin:.6rem auto;
  text-align:center;
}
.card__content p{
  font-size:1.1rem;
  line-height:1.8rem;
  text-align:center;
}
.card__content a{
  width:200px;
  padding:10px 15px;
  display:block;
  text-align:center;
  margin:.6rem auto;
  font-size:1.1rem;
  color:rgb(156, 156, 156);
  text-decoration:none;
  background-color: #198754;
  border-radius:10px;
  transition:.3s;
}
.card__content a:hover{
  color:#fff;
  background-color: #198754;
  box-shadow:0 0 2px 2px rgba(0,0,0,0.4);
}
.card:hover img{
  margin-top:-60px;
  box-shadow:0 0 4px 6px rgba(0,0,0,0.3);
}
.card:hover>.card__content{
  margin-top:0;
  opacity:1;
  visibility:visible;
}
@media screen and (max-width:800px){
  .container{
    flex-wrap:wrap;
  }
}
</style>