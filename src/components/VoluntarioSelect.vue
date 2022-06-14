<template>
  <div id="voluntario-select" class="container">
    <router-link to="/voluntario" class="btn btn-success">Voltar</router-link>
    <div class="w-75 bg-white p-2 rounded" style="margin: 0 auto;">
      <h4 class="text-center mt-2 mb-5 fw-bold">{{voluntario.nome}}</h4>
      <div class="row">
        <div class="col-md-6">
          <p>Email: {{voluntario.email}}</p>
          <p>CPF: {{voluntario.cpf}}</p>
        </div>
        <div class="col-md-6">
          <p>Pais: {{voluntario.pais}}</p>
          <p>Estado: {{voluntario.estado}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <p>Cidade: {{voluntario.cidade}}</p>
          <p>CEP: {{voluntario.cep}}</p>
        </div>
        <div class="col-md-6">
          <p>Número: {{voluntario.numero}}</p>
          <p>Cidade: {{voluntario.logradouro}}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <p>Cidade: {{voluntario.telefone}}</p>
        </div>
      </div>
      <div>
        <h4 class="text-center fw-bold">Biografia do Voluntário</h4>
        <p class="text-center fw-bold mt-4">{{voluntario.biografia}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import CrudService from '@/services/crud';

export default {
    name: "voluntario-select",
    props: ['id'],
    data(){
      return{
        voluntario: {}
      }
    },
    mounted(){
      this.$crudVoluntario = new CrudService('/voluntario/');
      this.$emit('logado');
      this.carregarVoluntario(this.id);
    },
    methods: {
      async carregarVoluntario(id){
        const {data} = await this.$crudVoluntario.findById(id);
        this.voluntario = data;
      }
    }
  }
</script>

<style scoped>

</style>