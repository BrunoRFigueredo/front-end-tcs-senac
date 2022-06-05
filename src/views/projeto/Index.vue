<template>
  <div id="index-project" class="container">
    <div class="row mt-5">
      <div class="col">
        <div class="card" v-for="proj in projetos" :key="proj.id">
        <img src="https://i.postimg.cc/1X8R7m8y/design.png"/>
        <div class="card__content">
          <h2>{{proj.nome}}</h2>
          <p>Início: {{proj.data_inicio}}</p>
          <p>Início: {{proj.data_final}}</p>
          <router-link :to="`/projeto/${proj.id}`" class="mt-2">Visualizar</router-link>
        </div>
      </div>
      </div>
    </div>
    <div class="row mt-5">
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
        />
      </div>
      <router-link to="/cadastrar-projeto" class="p-5">
    <button>
      Cadastrar Projeto - Teste
    </button>
  </router-link>
    </div>
  </div>
  
    
    


</template>

<script>
import CrudService from '@/services/crud';
import VPagination from "@hennge/vue3-pagination";

export default {
  name: "index-project",
  components: {
    VPagination
  },
  data() {
    return {
      projetos: [],
      tamanhoPagina: 3,
      paginaDesejada: 1,
      total: 0,
      totalPagina: 0
    }
  },
  mounted() {
    this.$crudProjetos = new CrudService('/projeto/');
    this.carregarProjetos();
    this.$emit('logado');
  },
  methods: {
    async carregarProjetos() {
      const {data} = await this.$crudProjetos.findAll({
        paginaDesejada: this.paginaDesejada - 1,
        tamanhoPagina: this.tamanhoPagina
      })
      this.projetos = data.conteudo;
      this.total = data.totalRegistros;
      const calculoPaginacao = data.totalRegistros / this.tamanhoPagina;
      this.totalPagina = calculoPaginacao === Math.floor(calculoPaginacao) ? calculoPaginacao : Math.floor(calculoPaginacao) + 1;
    }
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