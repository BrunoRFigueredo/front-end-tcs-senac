<template>
  <div id="index-service" class="container">
    <div>
      <router-link to="/services-register">Cadastrar um serviço</router-link>
    </div>
    <div>
      <div class="row" id="cardCenter">
        <div class="card m-3" style="width: 18rem;" v-for="servico in servicos" :key="servico.id">
          <div class="card-body">
            <h4 class="text-center fw-bold">{{servico.nome}}</h4>
              <p>{{servico.id}}</p>
              <p>{{servico.nome}}</p>
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