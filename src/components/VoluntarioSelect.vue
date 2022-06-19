<template>
  <div id="voluntario-select" class="container">
    <div class="bg-dark w-75 rounded" style="margin: 0 auto;">
      <h3 class="text-center mt-2 mb-5 fw-bold">{{voluntario.nome}}</h3>
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
          <p>Cidade: {{voluntario.cidade}}</p>
        </div>
      </div>
      <div>
        <h4 class="text-center fw-bold">Biografia do Voluntário</h4>
        <pre class="p-4 text-center">{{voluntario.biografia}}</pre>
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
h3, h4, p{
  color: #fff;
  padding: 15px;
  text-align: center;
}

p{
  background-color: rgba(255, 255, 255, 0.015);
  margin: 15px;
  border-radius: 10px;
}
</style>