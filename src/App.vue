<template>
<div id="app">
  <MenuSuperior v-if="this.superiorVisivel"/>
  <MenuLateral  v-if="this.lateralVisivel" @deslogado="this.verificaVisibilidade(this.estaLogado())"/>
  <router-view class="mt-5" @logado="this.verificaVisibilidade(this.estaLogado())"/>

  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
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
    MenuSuperior
  },
    data(){
      return{
        superiorVisivel: true,
        lateralVisivel: false
      }
    },
    mounted(){
      if(!this.estaLogado()){
        
      }
    },
    methods: {
      abrirModal() {
        this.$refs.minhaModal.open()
      },
      estaLogado(){
        
        return isLogged();
      },
      verificaVisibilidade(logado){
        if (logado){
          console.log('logado')
          this.superiorVisivel = false;
          this.lateralVisivel = true;
        } else {
          console.log('deslogado')
          this.superiorVisivel = true;
          this.lateralVisivel = false;
        }
      }
    },
}
</script>

<style scoped>

</style>
