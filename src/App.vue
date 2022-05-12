<template>
<div id="app">
  <!--<nav>
    <div class="link" v-if="user.nome">
      <router-link to="/" class="m-2">Início</router-link>
      <router-link to="/instituicao" class="m-2">Instituições</router-link>
      <router-link to="/projeto" class="m-2">Projetos</router-link>
      <router-link to="/categoria" v-if="user.perfilPermissao == 3" class="m-2">Categorias</router-link>
      <router-link to="/insumo" v-if="user.perfilPermissao == 3" class="m-2">Insumos</router-link>
      <router-link to="/voluntario" v-if="user.perfilPermissao == 3" class="m-2">Voluntários</router-link>
      <router-link to="/servico" v-if="user.perfilPermissao == 3" class="m-2">Serviços</router-link>
    </div>
    <div class="usuario">
      <router-link :to="`/usuario-detail/${user.id}`">{{user.nome}}</router-link>
      <div>
        <router-link to="/#" class="text-usuario" v-if="!user.nome" @click="logar()">Acessar conta</router-link> |
        <router-link to="/usuario-register" class="text-usuario" v-if="!user.nome">Cadastrar</router-link>
        <button @click="deslogar()" v-if="user.nome" class="botaoDesconectar">Desconectar</button>
      </div>
    </div>
  </nav>-->
  <MenuLateral/>
  <router-view class="mt-5 "/>
  </div>
</template>

<script>
import MenuLateral from "../src/components/MenuLateral.vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
  components: {
    MenuLateral,
    VPagination
  },
    data(){
      return{
      }
    },
}
</script>

<style scoped>

</style>
