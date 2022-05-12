<template>
  <div id="form-service" class="container" v-if="estaLogado()">
    <form action="" class="w-50">
      <div class="row mb-4">
        <div class="col">
          <label class="form-label">Nome do serviço</label>
          <input type="text" class="form-control" v-model="servico.nome" required>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col">
          <label class="form-label">Descrição do serviço</label>
          <input type="text" class="form-control" v-model="servico.descricao" required>
        </div>
      </div>
      <span v-if="error" class="alert alert-warning" for="">{{ error }}</span>
      <button type="submit" class="btn btn-success" @click="cadastrar(servico)">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import CrudService from '@/services/crud';
import {isLogged} from '@/services/auth';

export default {
  name: "form-service",
  data() {
    return {
      servico: {
        nome: '',
        descricao: '',
        status: 1
      },
      erro: ''
    }
  },
  computed: {
    title() {
      return this.$route.params.id
          ? 'Editar serviço'
          : 'Novo serviço'
    }
  },
  mounted() {
    if (!this.estaLogado()) {
      this.$router.push('/');
    }
    this.$crudServico = new CrudService('/servico/');
    if (this.$route.params.id) {
      this.carregaServico(this.$route.params.id);
    }

  },
  methods: {
    async cadastrar(servico) {
      try {
        await this.$crudServico.save(servico);
        this.$router.push('/servicos');
      } catch (erro) {
        console.log(erro);
        this.erro = erro.response.data.message;
      }
    },
    async carregaServico(idServico) {
      const {data} = await this.$crudServico.findById(idServico);
      this.servico = data;
    },
    desabilitar() {
      return ((!this.servico.nome || this.servico.nome.length > 45) ||
          (!this.servico.descricao || this.servico.descricao.length > 200))
    },
    estaLogado() {
      return isLogged();
    }
  }
}
</script>

<style scoped>
form {
  margin: 0 auto;
}
</style>