<template>
  <div id="voluntario-select" class="container">
    <div class="bg w75 rounded" style="margin: 0 auto;  background-color: lightblue;">
      <h3 class="text-center mt-2 mb-5 fw-bold">Dados do voluntário</h3>
      <div class="row">
        <div class="col-md-6">
          <p>Nome: {{ voluntario.usuario.nome }}</p>
          <p>Email: {{ voluntario.email }}</p>
        </div>
        <div class="col-md-6">
          <p>Pais: {{ voluntario.pais }}</p>
          <p>Estado: {{ voluntario.estado }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <p>Cidade: {{ voluntario.cidade }}</p>
          <p>CEP: {{ voluntario.cep }}</p>
        </div>
        <div class="col-md-6">
          <p>Número: {{ voluntario.numero }}</p>
          <p>Logradouro: {{ voluntario.logradouro }}</p>
        </div>
      </div>
      <div>
        <h4 class="text-center fw-bold">Biografia do Voluntário</h4>
        <p class="p-4 text-center">{{ voluntario.biografia }}</p>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import CrudService from '@/services/crud';

export default {
  name: "voluntario-select",
  props: ['id'],
  data() {
    return {
      voluntario: {
        usuario: {}
      }
    }
  },
  mounted() {
    this.$crudVoluntario = new CrudService('/voluntario/');
    this.$emit('logado');
    this.carregarVoluntario(this.id);
  },
  methods: {
    async carregarVoluntario(id) {
      const {data} = await this.$crudVoluntario.findById(id);
      this.voluntario = data;
    }
  }
}
</script>

<style scoped>
h3, h4, p {
  color: black;
  padding: 15px;
  text-align: center;
}

p {
  background-color: white;
  margin: 15px;
  border-radius: 10px;
}
</style>