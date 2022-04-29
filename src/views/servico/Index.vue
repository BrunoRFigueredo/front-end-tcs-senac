<template>
  <div id="index-service" class="container">
    <div>
      <router-link to="/servicos-register" class="botao">Cadastrar um serviço</router-link>
    </div>
    <div>
      <div class="row mt-5" id="cardCenter">
        <div class="card m-3" style="width: 18rem;" v-for="servico in servicos.conteudo" :key="servico.id">
          <div class="card-body">
            <h5 class="text-center">Serviço</h5>
            <p class="text-center fw-bold mt-2">{{servico.nome}}</p>
            
              <!--<router-link tag="button" class="botao" :to="`/servico/${servico.id}`">Visualizar</router-link>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CrudService from '@/services/crud'

export default {
  name: "index-service",
  data(){
    return{
      servicos: []
    }
  },
  mounted(){
    this.$crudServico = new CrudService('/servico/')
    this.carregarServico();
  },
  methods:{
    async carregarServico(){
      const {data} = await this.$crudServico.findAll({
        tamanhoPagina: this.tamanhoPagina,
        paginaDesejada: this.paginaDesejada
      })
      console.log(data);
      this.servicos = data;
      
    }
  }
}
</script>