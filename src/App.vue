<template>
  <div id="app">
    <MenuSuperior v-if="this.superiorVisivel"/>
    <MenuLateral  v-if="this.lateralVisivel" @deslogado="this.verificaVisibilidade(this.estaLogado())"/>
    <div class="app-content" :class="{ 'with-navbar': superiorVisivel }">
      <router-view @logado="this.verificaVisibilidade(this.estaLogado())"/>
    </div>
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
  .app-content {
    padding: 24px;
    min-height: 100vh;
  }

  .app-content.with-navbar {
    padding-top: 88px;
  }
</style>
