<template>
    <select name="" id="" v-model="selected" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
        <option v-for="insumo in data" :value="insumo.id">
            {{insumo.nome}}
        </option>
    </select>
</template>

<script>
import { getLogado } from '@/services/auth'
import CrudService from '@/services/crud';
import { buscarInstituicao } from '@/util/buscaInstituicao';

    export default {
        props: ['value'],
        data(){
            return {
                selected: 0,
                data: []
            }
        },
        async mounted(){
            let idUsuarioLogado = getLogado();
            let dados = await buscarInstituicao(idUsuarioLogado);
            this.$crudInsumoInstituicao = new CrudService('/insumo/instituicao/' + dados.instituicao.id)
            const {data} = await this.$crudInsumoInstituicao.findAll({});
            this.data = data.conteudo;
        }
    }
</script>