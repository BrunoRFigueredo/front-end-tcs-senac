<template>
  <div id="form-service" class="container">
    <form action="" class="w-50">
      <div class="row mb-4">
        <div class="col">
          <label class="form-label">Nome do serviço</label>
          <input type="text" class="form-control" v-model="servico.nome" required>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col">
          <label class="form-label">Descrição do serviço</label>
          <input type="text" class="form-control" v-model="servico.descricao" required>
        </div>
      </div>
      <button class="botao mt-2" @click="cadastrar(servico)">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import CrudService from '@/services/crud';
export default {
  name: "form-service",
  data(){
    return{
      servico:{
        nome: '',
        descricao: '',
        status: 's'
      }
    }
  },
  mounted(){
    this.$crudServico = new CrudService('/servico/');
  },
  methods: {
    async cadastrar(servico){
      await this.$crudServico.save(servico);
      console.log(servico);
    }
  }
}
</script>

<style scoped>
  form{
    margin: 0 auto;
  }
</style>