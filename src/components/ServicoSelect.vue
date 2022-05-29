<template>
  <select v-model="selected" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
    <option v-for="servico in data" :value="servico.id">
      {{ servico.nome }}
    </option>
  </select>
</template>
<script>

import CrudService from "@/services/crud";

export default {
  props: ['value'],
  data() {
    return {
      selected: 0,
      data: []
    }
  },
  async mounted() {
    this.$crudServico = new CrudService('/servico/');
    const {data} = await this.$crudServico.findAll({});
    this.data = data.conteudo;
  }
}
</script>