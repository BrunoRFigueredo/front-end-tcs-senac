<template>
  <select v-model="selected" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
    <option v-for="servico in data" :value="servico.id">
      {{ servico.nome }}
    </option>
  </select>
</template>
<script>

import CrudService from "@/services/crud";
import {getLogado} from "@/services/auth";
import {buscarInstituicao} from "@/util/buscaInstituicao";

export default {
  props: ['value'],
  data() {
    return {
      selected: 0,
      data: []
    }
  },
  async mounted() {
    let idUsuarioLogado = getLogado();
    let dados = await buscarInstituicao(idUsuarioLogado);
    this.$crudServicoInstituicao = new CrudService('/servico/instituicao/' + dados.instituicao.id)
    const {data} = await this.$crudServicoInstituicao.findAll({});
    this.data = data.conteudo;
  }
}
</script>