<template>
  <div class="form-page">
    <div class="form-card">
      <div class="form-header">
        <h2>Vincular Instituicao</h2>
        <p>Preencha os dados para vincular-se a uma instituicao</p>
      </div>
      <form class="modern-form" @keyup="this.limpaErro()">
        <div class="alert alert-danger" role="alert" v-if="this.erro">
          {{this.erro}}
        </div>
        <div class="form-notice">
          <i class="fas fa-info-circle"></i>
          <span>Informe <strong>exatamente</strong> os mesmos dados cadastrados na prefeitura. Apos vincular-se, entre novamente no sistema para liberar os novos acessos.</span>
        </div>

        <div class="form-section">
          <h3 class="section-title">Dados da Instituicao</h3>
          <div class="form-group">
            <label for="nome" class="form-label">Nome</label>
            <input id="nome" type="text" class="form-control" v-model="instituicao.nome" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input id="email" type="email" class="form-control" v-model="instituicao.email" required>
            </div>
            <div class="form-group">
              <label for="telefone" class="form-label">Telefone</label>
              <input id="telefone" type="number" class="form-control" v-model="instituicao.telefone" required>
            </div>
          </div>
          <div class="form-row three-cols">
            <div class="form-group">
              <label for="cnpj" class="form-label">CNPJ</label>
              <input id="cnpj" type="text" class="form-control" v-model="instituicao.cnpj" required>
            </div>
            <div class="form-group">
              <label for="pix" class="form-label">Conta</label>
              <input id="pix" type="text" class="form-control" v-model="instituicao.conta" required>
            </div>
            <div class="form-group">
              <label for="conta" class="form-label">Agencia</label>
              <input id="conta" type="text" class="form-control" v-model="instituicao.agencia" required>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3 class="section-title">Endereco</h3>
          <div class="form-row three-cols">
            <div class="form-group">
              <label for="cep" class="form-label">CEP</label>
              <input id="cep" type="number" @keyup="this.buscaEndereco(this.instituicao.cep)" class="form-control" v-model="instituicao.cep" required>
            </div>
            <div class="form-group">
              <label for="pais" class="form-label">Pais</label>
              <input id="pais" type="text" class="form-control" placeholder="BR" :maxlength="maxEstado" v-model="instituicao.pais" required>
            </div>
            <div class="form-group">
              <label for="estado" class="form-label">Estado</label>
              <input id="estado" type="text" class="form-control" placeholder="SC" :maxlength="maxEstado" v-model="instituicao.estado" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="cidade" class="form-label">Cidade</label>
              <input id="cidade" type="text" class="form-control" v-model="instituicao.cidade" required>
            </div>
            <div class="form-group">
              <label for="bairro" class="form-label">Bairro</label>
              <input id="bairro" type="text" class="form-control" v-model="instituicao.bairro" required>
            </div>
          </div>
          <div class="form-row address-row">
            <div class="form-group flex-grow">
              <label for="logradouro" class="form-label">Logradouro</label>
              <input id="logradouro" type="text" class="form-control" v-model="instituicao.logradouro" required>
            </div>
            <div class="form-group flex-small">
              <label for="numero" class="form-label">Numero</label>
              <input id="numero" type="number" class="form-control" v-model="instituicao.numero" required>
            </div>
          </div>
        </div>

        <div class="form-section">
          <div class="form-group">
            <label for="descricao" class="form-label">Descricao</label>
            <textarea name="descricao" id="descricao" class="form-control textarea" v-model="instituicao.descricao"></textarea>
          </div>
        </div>

        <BotaoSalvar @click.prevent="cadastrar(instituicao)" />
      </form>
    </div>
  </div>
</template>

<script>
import { getLogado, isLogged } from "@/services/auth";
import CrudService from "@/services/crud";
import axios from "axios";
import BotaoSalvar from "@/components/BotaoSalvar.vue";

export default {
  name: 'instituicao-form',
  components: {
    BotaoSalvar,
  },
  data() {
    return {
      instituicao: {
        nome: '',
        descricao: '',
        cnpj: '',
        agencia: '',
        conta: '',
        email: '',
        telefone: '',
        bairro: '',
        pais: '',
        estado: '',
        cidade: '',
        logradouro: '',
        numero: '',
        cep: '',
        usuario: getLogado(),
      },
      usuarioLogado: {
        id: '',
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        perfilPermissao: '',
        imagem: ''
      },
      maxEstado: 2,
      data: null,
      erro: '',
    }
  },
  mounted() {
    if (!this.verificaLogado()) {
      this.$router.push('/instituicao');
    } else {
      this.$emit('logado');
      this.$crudInstituicao = new CrudService('/instituicao/');
      this.$crudUsuario = new CrudService('/usuario/');
    }
  },
  methods: {
    async cadastrar(instituicao) {
      try {
        await this.$crudInstituicao.save(instituicao)
        this.$router.push('/instituicao');
      } catch (error) {
        this.erro = error.response.data.message;
      }
    },
    buscaEndereco(cep) {
      if (cep.toString().length >= 8) {
        axios.get('https://viacep.com.br/ws/' + cep + '/json/')
          .then(retorno => {
            (
              this.instituicao.estado = retorno.data.uf,
              this.instituicao.cidade = retorno.data.localidade,
              this.instituicao.logradouro = retorno.data.logradouro,
              this.instituicao.pais = 'BR',
              this.instituicao.bairro = retorno.data.bairro
            )
          })
          .catch(erro => {
            (
              console.log('Erro ao carregar dados do endereco ' + erro.response.data.message)
            )
          })
      }
    },
    verificaLogado() {
      return isLogged();
    },
    limpaErro(){
      this.erro = '';
    }
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

.form-notice {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: var(--accent-light);
  border: 1px solid #fde68a;
  border-radius: var(--radius);
  padding: 14px 16px;
  font-size: 13px;
  color: #92400e;
  margin-bottom: 28px;
  line-height: 1.5;
}

.form-notice i {
  color: var(--accent);
  margin-top: 2px;
  flex-shrink: 0;
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

.form-row.address-row {
  grid-template-columns: 3fr 1fr;
}

.textarea {
  min-height: 100px;
  resize: vertical;
}

@media (max-width: 640px) {
  .form-card { padding: 24px; }
  .form-row, .form-row.three-cols, .form-row.address-row { grid-template-columns: 1fr; }
}
</style>
