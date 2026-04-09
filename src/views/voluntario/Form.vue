<template>
    <div class="form-page">
        <div class="form-card">
            <div class="form-header">
                <h2>Cadastro de Voluntario</h2>
                <p>Preencha seus dados para tornar-se voluntario</p>
            </div>
            <div class="alert alert-danger" role="alert" v-if="this.erro">
                {{ this.erro }}
            </div>
            <form class="modern-form" @keyup="this.limpaErro()">
                <div class="form-section">
                    <h3 class="section-title">Dados Pessoais</h3>
                    <div class="form-group">
                        <label for="nome" class="form-label">Nome</label>
                        <input id="nome" type="text" class="form-control" disabled v-model="this.usuarioLogado">
                    </div>
                    <div class="form-row four-cols">
                        <div class="form-group">
                            <label for="cpf" class="form-label">CPF</label>
                            <input id="cpf" type="number" class="form-control" v-model="voluntario.cpf">
                        </div>
                        <div class="form-group">
                            <label for="dataNascimento" class="form-label">Data Nascimento</label>
                            <input id="dataNascimento" type="date" class="form-control" v-model="voluntario.dataNascimento">
                        </div>
                        <div class="form-group">
                            <label for="sexo" class="form-label">Sexo</label>
                            <select name="form-select" class="form-control" v-model="voluntario.sexo">
                                <option value="0">Masculino</option>
                                <option value="1">Feminino</option>
                                <option value="2">Nao Informar</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="telefone" class="form-label">Telefone</label>
                            <input id="telefone" type="number" class="form-control" v-model="voluntario.telefone">
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3 class="section-title">Endereco</h3>
                    <div class="form-row three-cols">
                        <div class="form-group">
                            <label for="cep" class="form-label">CEP</label>
                            <input id="cep" type="number" @keyup="this.buscaEndereco(this.voluntario.cep)" class="form-control" v-model="voluntario.cep" required>
                        </div>
                        <div class="form-group">
                            <label for="pais" class="form-label">Pais</label>
                            <input id="pais" type="text" class="form-control" placeholder="BR" v-model="voluntario.pais" required>
                        </div>
                        <div class="form-group">
                            <label for="estado" class="form-label">Estado</label>
                            <input id="estado" type="text" class="form-control" placeholder="SC" v-model="voluntario.estado" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cidade" class="form-label">Cidade</label>
                            <input id="cidade" type="text" class="form-control" v-model="voluntario.cidade" required>
                        </div>
                        <div class="form-group">
                            <label for="bairro" class="form-label">Bairro</label>
                            <input id="bairro" type="text" class="form-control" v-model="voluntario.bairro" required>
                        </div>
                    </div>
                    <div class="form-row address-row">
                        <div class="form-group">
                            <label for="logradouro" class="form-label">Logradouro</label>
                            <input id="logradouro" type="text" class="form-control" v-model="voluntario.logradouro" required>
                        </div>
                        <div class="form-group flex-small">
                            <label for="numero" class="form-label">Numero</label>
                            <input id="numero" type="number" class="form-control" v-model="voluntario.numero" required>
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <div class="form-group">
                        <label for="biografia" class="form-label">Biografia</label>
                        <textarea id="biografia" class="form-control textarea" v-model="voluntario.biografia"></textarea>
                    </div>
                </div>

                <button type="submit" class="btn-salvar" @click="cadastrar(voluntario)">
                    <i class="fas fa-check"></i>
                    Cadastrar
                </button>
            </form>
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
                            console.log('Erro ao carregar dados do endereco ' + erro.response.data.message)
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
.form-page {
  max-width: 800px;
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

.form-section {
  margin-bottom: 28px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-700);
  margin: 0 0 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--gray-200);
}

.form-group {
  margin-bottom: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-row.three-cols {
  grid-template-columns: 1fr 1fr 1fr;
}

.form-row.four-cols {
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.form-row.address-row {
  grid-template-columns: 3fr 1fr;
}

.textarea {
  min-height: 100px;
  resize: vertical;
}

.btn-salvar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 24px;
  background: var(--secondary);
  color: var(--white);
  border: none;
  border-radius: var(--radius);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

.btn-salvar:hover {
  background: var(--secondary-dark);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .form-card { padding: 24px; }
  .form-row, .form-row.three-cols, .form-row.four-cols, .form-row.address-row { grid-template-columns: 1fr; }
}
</style>
