<template>
  <div id="user-detail" v-if="estaLogado()">
    <div class="container">
      <h4 class="text-center fw-bold">{{usuario.nome}}</h4>
      <form action="" class="pt-5">
        <div class="row">
          <div class="col">
            <label class="form-label">Nome</label>
            <input type="text" class="form-control" v-model="usuario.nome" required>
          </div>
          <div class="col">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" v-model="usuario.email" required>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col">
            <label class="form-label">Senha</label>
            <input type="password" class="form-control" v-model="usuario.password" required>
          </div>
          <div class="col">
            <label class="form-label">Confirmar senha</label>
            <input type="password" class="form-control" v-model="usuario.confirmPassword" required>
          </div>
        </div>
        <button class="botao mt-4" @click="atualizar(usuario.id)">Atualizar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { isLogged } from '@/services/auth';
import api from "../../services/api";
export default {
  name: "user-detail",
  props: ["id"],
  data(){
    return{
      usuario: {}
    }
  },
  async created(){
    if (this.estaLogado()) {
      await api.get(`/usuario/${this.id}`).then(r => {
      this.usuario = r.data;
      })
    } else {
      this.$router.push('/');
    }
    
  },
  methods:{
    atualizar(id){
      api.put(`/usuario/${id}`, this.usuario);
    },
    estaLogado(){
      return isLogged();
    }
  }
}
</script>