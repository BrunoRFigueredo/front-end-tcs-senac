<template>
  <div class="form-page" v-if="estaLogado()">
    <div class="form-card">
      <div class="form-header">
        <h2>{{ title }}</h2>
        <p>Cadastre um novo servico para sua instituicao</p>
      </div>
      <div class="alert alert-danger" role="alert" v-if="this.erro">
        {{ this.erro }}
      </div>
      <form class="modern-form" @keyup="this.limpaErro()">
        <div class="form-group">
          <label for="nome" class="form-label">Nome do Servico</label>
          <input id="nome" type="text" class="form-control" v-model="servico.nome" required>
        </div>

        <div class="form-group">
          <label for="descricao" class="form-label">Descricao</label>
          <input id="descricao" type="text" class="form-control" v-model="servico.descricao" required>
        </div>

        <div class="form-group">
          <label for="instituicao" class="form-label">Instituicao</label>
          <input id="instituicao" type="text" class="form-control" disabled v-model="this.nomeInstituicao" required>
        </div>

        <BotaoSalvar :disabled="this.desabilitar()" @click="cadastrar(servico)" />
      </form>
    </div>
  </div>
</template>

<script>
import CrudService from '@/services/crud';
import { getLogado, isLogged } from '@/services/auth';
import { buscarInstituicao } from '@/util/buscaInstituicao';
import BotaoSalvar from '@/components/BotaoSalvar.vue';

export default {
  name: "form-service",
  components: {
    BotaoSalvar
  },
  data() {
    return {
      servico: {
        nome: "",
        descricao: "",
        instituicao: "",
        status: 1
      },
      erro: "",
      nomeInstituicao: "",
    };
  },
  computed: {
    title() {
      return this.$route.params.id
        ? "Editar servico"
        : "Novo servico";
    }
  },
  async mounted() {
    if (!this.estaLogado()) {
      this.$router.push("/");
    }
    else {
      let idUsuarioLogado = getLogado();
      this.$crudServico = new CrudService("/servico/");
      if (this.$route.params.id) {
        this.carregaServico(this.$route.params.id);
      }
      const dados = await buscarInstituicao(idUsuarioLogado);
      this.servico.instituicao = dados.instituicao.id;
      this.nomeInstituicao = dados.instituicao.nome;
    }
  },
  methods: {
    async cadastrar(servico) {
      try {
        await this.$crudServico.save(servico);
        this.$router.push("/servicos");
      }
      catch (erro) {
        this.erro = erro.response.data.message;
      }
    },
    async carregaServico(idServico) {
      const { data } = await this.$crudServico.findById(idServico);
      this.servico = data;
      this.servico.instituicao = dados.instituicao.id;
    },
    desabilitar() {
    },
    estaLogado() {
      return isLogged();
    },
    limpaErro() {
      this.erro = '';
    }
  },
  components: { BotaoSalvar }
}
</script>

<style scoped>
.form-page {
  max-width: 600px;
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

@media (max-width: 640px) {
  .form-card { padding: 24px; }
}
</style>
