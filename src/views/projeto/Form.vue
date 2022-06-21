<template>
    <div class="login-page">
        <div class="form">
            <div class="alert alert-danger" role="alert" v-if="this.erro">
                {{this.erro}}
            </div>
            <h3 class="text-center pb-4"><strong>Cadastrar Projeto</strong></h3>
            <form class="login" @keyup="this.limpaErro()">
                <div class="row">
                    <div class="form-group col-md-12">
                        <div class="label">
                            <label for="nome" class="form-label">Nome</label>
                        </div>
                        <div>
                            <input id="nome" type="text" class="form-control" v-model="projeto.nome">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-md-12">
                        <div class="label">
                            <label for="descricao" class="form-label">Descricao</label>
                        </div>
                        <div>
                            <input id="descricao" type="textarea" class="form-control" v-model="projeto.descricao" required>
                        </div>
                    </div>
                </div>
                    
                <div class="row">
                    <div class="form-group col-md-6">
                        <div class="label">
                            <label for="datainicio" class="form-label">Data Início</label>
                        </div>
                        <div>
                            <input @keyup="formatarData(projeto.dataInicio)" id="datainicio" type="date" class="form-control" v-model="projeto.dataInicio" required>
                        </div>
                    </div>
                
                    <div class="form-group col-md-6">
                        <div class="label">
                            <label for="datainicio" class="form-label">Data Final</label>
                        </div>
                        <div>
                            <input @keyup="formatarData(projeto.dataInicio)" id="datafim" type="date" class="form-control"  v-model="projeto.dataFinal">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-md-12">
                        <div class="label">
                            <label for="instituicao" class="form-label">Instituição</label>
                        </div>
                        <div>
                            <input id="instituicao" type="text" disabled class="form-control" v-model="this.nomeInstituicao">
                        </div>
                    </div>
                </div>
                                
                <div class="col-md-12 btn-cadastrar">
                    <BotaoSalvar @click="cadastrar(projeto)" />
                </div>     
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

<style>
.login-page {
  padding: 10px;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 800px;
  margin: 0 auto 100px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  margin: auto;
}
.label {
  text-align: left;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 3px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 50%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.btn-cadastrar{
    text-align: center;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
</style>