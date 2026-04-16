<template>
    <div class="form-page">
        <div class="form-card">
            <div class="form-header">
                <h2>Cadastrar Projeto</h2>
                <p>Crie um novo projeto social para sua instituicao</p>
            </div>
            <div class="alert alert-danger" role="alert" v-if="this.erro">
                {{this.erro}}
            </div>
            <form class="modern-form" @keyup="this.limpaErro()">
                <div class="form-group">
                    <label for="nome" class="form-label">Nome</label>
                    <input id="nome" type="text" class="form-control" v-model="projeto.nome">
                </div>

                <div class="form-group">
                    <label for="descricao" class="form-label">Descricao</label>
                    <input id="descricao" type="textarea" class="form-control" v-model="projeto.descricao" required>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="datainicio" class="form-label">Data Inicio</label>
                        <input @keyup="formatarData(projeto.dataInicio)" id="datainicio" type="date" class="form-control" v-model="projeto.dataInicio" required>
                    </div>
                    <div class="form-group">
                        <label for="datafim" class="form-label">Data Final</label>
                        <input @keyup="formatarData(projeto.dataInicio)" id="datafim" type="date" class="form-control" v-model="projeto.dataFinal">
                    </div>
                </div>

                <div class="form-group">
                    <label for="instituicao" class="form-label">Instituicao</label>
                    <input id="instituicao" type="text" disabled class="form-control" v-model="this.nomeInstituicao">
                </div>

                <BotaoSalvar @click="cadastrar(projeto)" />
            </form>
        </div>
    </div>
</template>

<script>
    import CrudService from '@/services/crud';
    import dayjs from 'dayjs';
    import { getLogado, isLogged } from '@/services/auth';
    import { buscarInstituicao } from '@/util/buscaInstituicao';
    import BotaoSalvar from '@/components/BotaoSalvar.vue';


    export default {
    name: "form-projeto",
    components: {
        BotaoSalvar
    },
    data() {
        return {
            projeto: {
                nome: "",
                descricao: "",
                dataInicio: "",
                dataFinal: "",
                instituicao: ""
            },
            nomeInstituicao: "",
            idInstituicao: "",
            erro: '',
        };
    },
    async mounted() {
        this.erro= '';
        this.showSuccess = false;
        if (!this.verificaLogado()) {
            this.$router.push("/projeto");
        }
        else {
            this.$crudProjeto = new CrudService("/projeto/");
            this.$crudInstituicao = new CrudService("/instituicao/");
            const dados = await buscarInstituicao(getLogado());
            this.projeto.instituicao = dados.instituicao.id;
            this.nomeInstituicao = dados.instituicao.nome;
        }
        this.$emit("logado");
    },
    methods: {
        async cadastrar(projeto) {
            try {
                await this.$crudProjeto.save(projeto);
                this.$router.push("/projeto");
            }
            catch (erro) {
                this.erro = erro.response.data.message
            }
        },
        limpaErro(){
            console.log('asdad');
            this.erro = '';
        },
        async mounted(){
            if (!this.verificaLogado()){
                this.$router.push('/projeto');
            } else {
                this.$crudProjeto = new CrudService('/projeto/');
                this.$crudInstituicao = new CrudService('/instituicao/');
                const dados  = await buscarInstituicao(getLogado());
                this.projeto.instituicao  = dados.instituicao.id;
                this.nomeInstituicao = dados.instituicao.nome;
            }
        },
        formatarData(dataInicio, dataFim) {
            if (dataInicio.lenght = 8) {
                const dataIni = dayjs(dataInicio);
                const dataInicioFormatada = dataF.format("YYYY-MM-DD");
                this.projeto.dataInicio = dataInicioFormatada;
            }
            if (dataFim.lenght = 8) {
                const dataF = dayjs(dataFim);
                const dataFinalFormatada = dataIni.format("YYYY-MM-DD");
                this.projeto.dataFinal = dataFinalFormatada;
            }
        },
        verificaLogado() {
            return isLogged();
        }
    },
    components: { BotaoSalvar }
}
</script>

<style scoped>
.form-page {
  max-width: 700px;
  margin: 0 auto;
}

.form-card {
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-100);
  padding: 40px;
}

.form-header {
  margin-bottom: 28px;
}

.form-header h2 {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 4px;
}

.form-header p {
  color: var(--gray-500);
  font-size: 14px;
  margin: 0;
}

.form-group {
  margin-bottom: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 640px) {
  .form-card { padding: 24px; }
  .form-row { grid-template-columns: 1fr; }
}
</style>
