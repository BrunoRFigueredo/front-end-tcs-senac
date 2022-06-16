<template>
  <div id="app">
    <MenuSuperior v-if="this.superiorVisivel"/>
    <MenuLateral  v-if="this.lateralVisivel" @deslogado="this.verificaVisibilidade(this.estaLogado())"/>
    <router-view class="mt-5" @logado="this.verificaVisibilidade(this.estaLogado())"/>
  </div>
</template>

<script>
import MenuLateral from "../src/components/MenuLateral.vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import MenuSuperior from "./components/MenuSuperior.vue";
import { isLogged } from "./services/auth";

export default {
  components: {
    MenuLateral,
    VPagination,
    MenuSuperior,
},
    data(){
      return{
        superiorVisivel: true,
        lateralVisivel: false,
        headerVisivel: false,
      }
    },
    mounted(){
      if(!this.estaLogado()){
        
      }
    },
    methods: {
      estaLogado(){
        
        return isLogged();
      },
      verificaVisibilidade(logado){
        if (logado){
          this.superiorVisivel = false;
          this.lateralVisivel = true;
          this.headerVisivel = true
        } else {
          this.superiorVisivel = true;
          this.lateralVisivel = false;
          this.headerVisivel = false
        }
      }
    },
}
</script>

<style scoped>
  .header{
    background-color: gray;
  }
</style>
