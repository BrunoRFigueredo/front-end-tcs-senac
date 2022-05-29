<template>
  <div id="projeto-select" class="container">
    <router-link to="/projeto" class="btn btn-success">Voltar</router-link>
    <div class="w-50 divDados"> 
      <h4 class="text-center mt-2 mb-5">{{usuario.nome}}</h4>
      <p>Instituição responsável: {{projeto.nome}}</p>
      <p>Descrição: {{usuario.descricao}}</p>
      <p>Início: {{usuario.dataInicio}}</p>
      <p>Finaliza: {{usuario.dataFinal}}</p>
      <p>CNPJ: {{projeto.cnpj}}</p>
    </div>
  </div>
</template>

<script>
import CrudService from '@/services/crud';
export default {
  name: 'projeto-select',
  props: ['id'],
  data(){
    return{
      projeto: {},
      usuario: {}
    }
  },
  mounted() {
    this.$crudProjetos = new CrudService('/projeto/');
    this.carregarProjeto(this.id);
    this.$emit('logado');
  },
  methods: {
    async carregarProjeto(id){
      const {data} = await this.$crudProjetos.findById(id);
      this.projeto = data.instituicao;
      this.usuario = data;
      console.log(data);
    }
  }
}
</script>

<style scoped>
.divDados{
  margin: 0 auto;
  padding: 20px;
  background-color: #fff; 
  border-radius: 10px;
}
</style>