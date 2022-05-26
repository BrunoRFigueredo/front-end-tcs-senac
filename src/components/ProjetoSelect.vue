<template>
  <div id="projeto-select" class="container">
    
  </div>
</template>

<script>
import CrudService from '@/services/crud';
export default {
  name: 'projeto-select',
  props: ['id'],
  data(){
    return{
      projeto: {}
    }
  },
  mounted() {
    this.$crudProjetos = new CrudService('/projeto/');
    this.carregarProjeto(this.id);
  },
  methods: {
    async carregarProjeto(id){
      const {data} = await this.$crudProjetos.findById(id);
      this.projeto = data;
      console.log(data);
    }
  }
}
</script>

<style>
</style>