<template>
    <div id="form-voluntario" class="container">
        <div class="login-page">
            <div class="form">
                <div class="alert alert-danger" role="alert" v-if="this.erro">
                    {{ this.erro }}
                </div>                
                <div class="header">
                    <p>Cadastro de Voluntário</p>
                </div>
                <form class="login" @keyup="this.limpaErro()">
                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="label">
                                <label for="nome" class="form-label">Nome</label>
                            </div>
                            <div class="form-group">
                                <input id="nome" type="text" class="form-control" disabled v-model="this.usuarioLogado">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-md-3 col-sm-12">
                            <div class="label">
                                <label for="cpf" class="form-label">CPF</label>
                            </div>
                            <div>
                                <input id="cpf" type="number" class="form-control" v-model="voluntario.cpf">
                            </div>
                        </div>
                        <div class="form-group col-md-3 col-sm-12">
                            <div class="label">
                                <label for="dataNascimento" class="form-label">Data Nascimento</label>
                            </div>
                            <div class="form-group">
                                <input id="dataNascimento" type="date" class="form-control"
                                    v-model="voluntario.dataNascimento">
                            </div>
                        </div>
                        <div class="form-group col-md-3 col-sm-12">
                            <div class="label">
                                <label for="sexo" class="form-label">Sexo</label>
                            </div>
                            <div class="form-group">
                                <select name="form-select" id="" v-model="voluntario.sexo">
                                    <option value="0">Masculino</option>
                                    <option value="1">Feminino</option>
                                    <option value="2">Não Informar</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group col-md-3 col-sm-12">
                            <div class="label">
                                <label for="telefone" class="form-label">Telefone</label>
                            </div>
                            <div class="form-group">
                                <input id="telefone" type="number" class="form-control" v-model="voluntario.telefone">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-md-4 col-sm-12">
                            <div class="label">
                                <label for="cep" class="form-label">Cep</label>
                            </div>
                            <div class="form-group">
                                <input id="cep" type="number" @keyup="this.buscaEndereco(this.voluntario.cep)"
                                    class="form-control" v-model="voluntario.cep" required>
                            </div>
                        </div>

                        <div class="form-group col-md-4 col-sm-12">
                            <div class="label">
                                <label for="pais" class="form-label">Pais</label>
                            </div>
                            <div class="form-group">
                                <input id="pais" type="text" class="form-control" placeholder="Exemplo: BR"
                                    v-model="voluntario.pais" required>
                            </div>
                        </div>

                        <div class="form-group col-md-4 col-sm-12">
                            <div class="label">
                                <label for="estado" class="form-label">Estado</label>
                            </div>
                            <div class="form-group">
                                <input id="estado" type="text" class="form-control" placeholder="Exemplo: SC"
                                    v-model="voluntario.estado" required>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-md-6 col-sm-12">
                            <div class="label">
                                <label for="cidade" class="form-label">Cidade</label>
                            </div>
                            <div class="form-group">
                                <input id="cidade" type="text" class="form-control" v-model="voluntario.cidade"
                                    required>
                            </div>
                        </div>

                        <div class="form-group col-md-6 col-sm-12">
                            <div class="col">
                                <div class="label">
                                    <label for="bairro" class="form-label">Bairro</label>
                                </div>
                                <div class="form-group">
                                    <input id="bairro" type="text" class="form-control" v-model="voluntario.bairro"
                                        required>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-md-10">
                            <div class="label">
                                <label for="logradouro" class="form-label">Logradouro</label>
                            </div>
                            <div class="form-group">
                                <input id="logradouro" type="text" class="form-control" v-model="voluntario.logradouro"
                                    required>
                            </div>
                        </div>

                        <div class="form-group col-md-2">
                            <div class="label">
                                <label for="numero" class="form-label">Número</label>
                            </div>
                            <div class="form-group">
                                <input id="numero" type="number" class="form-control" v-model="voluntario.numero"
                                    required>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="form-group col-md-12">
                            <div class="label">
                                <label for="biografia" class="form-label">Biografia</label>
                            </div>
                            <div>
                                <textarea id="biografia" type="text" class="form-control"
                                    v-model="voluntario.biografia"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 mt-4" style="margin: 0 auto">
                        <button type="submit" class="btn btn-success" @click="cadastrar(voluntario)">
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import CrudService from '@/services/crud';
import { getLogado, isLogged } from '@/services/auth';
import axios from 'axios';
export default {
    name: "form-voluntario",
    data() {
        return {
            usuario: {},
            voluntario: {
                biografia: '',
                cpf: '',
                dataNascimento: '',
                sexo: '',
                telefone: '',
                pais: '',
                estado: '',
                bairro: '',
                logradouro: '',
                numero: '',
                cep: '',
                usuario: getLogado()
            },
            usuarioLogado: '',
            erro: '',
        }
    },
    async mounted() {
        if (!this.verificaLogado()) {
            this.$router.push('/projeto');
        } else {
            this.$crudVoluntario = new CrudService('/voluntario/');
            this.$crudInstituicao = new CrudService('/instituicao/');
            this.$crudUsuario = new CrudService('/usuario/');
            this.buscaNomeUsuario();
        }
        this.$emit('logado');

    },
    methods: {
        async cadastrar(voluntario) {
            try {
                await this.$crudVoluntario.save(voluntario);
                this.$router.push('/voluntario');
            } catch (erro) {
                this.erro = erro.response.data.message;
            }
        },
        verificaLogado() {
            return isLogged();
        },
        limpaErro(){
            this.erro = '';
        },
        buscaEndereco(cep) {
            if (cep.toString().length == 8) {
                axios.get('https://viacep.com.br/ws/' + cep + '/json/')
                    .then(retorno => {
                        (
                            this.voluntario.estado = retorno.data.uf,
                            this.voluntario.cidade = retorno.data.localidade,
                            this.voluntario.logradouro = retorno.data.logradouro,
                            this.voluntario.pais = 'BR',
                            this.voluntario.bairro = retorno.data.bairro
                        )
                    })
                    .catch(erro => {
                        (
                            console.log('Erro ao carregar dados do endereço ' + erro.response.data.message)
                        )
                    })
            } else {
                this.voluntario.estado = null,
                    this.voluntario.cidade = null,
                    this.voluntario.logradouro = null,
                    this.voluntario.pais = null,
                    this.voluntario.bairro = null
            }
        },
        async buscaNomeUsuario() {
            let idUsuarioLogado = getLogado();
            const dados = await this.$crudUsuario.findById(idUsuarioLogado);
            this.usuarioLogado = dados.data.nome;
        },
    }
}
</script>

<style scoped>
.login-page {
    margin: 10px;
}

.header {
    color: black;
    font-size: 30px;
}

.form {
    position: relative;
    z-index: 1;
    background: #ADD8E6;
    max-width: 850px;
    margin: 0 auto 100px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    margin: auto;
    border-radius: 10px;
}

.label {
    text-align: left;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    color: black;
}

label {
    color: black;
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