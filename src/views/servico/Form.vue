<template>
  <div id="form-service" class="container">
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
      <button class="botao mt-2" @click="cadastrar(servico)">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import CrudService from '@/services/crud';

export default {
  name: "form-service",
  data() {
    return {
      servico: {
        nome: '',
        descricao: '',
        status: 's'
      }
    }
  },
  async mounted() {
    this.$crudServico = new CrudService('/servico/');
    if (this.$route.params.id) {
      const {data} = await this.$crudServico.findById(this.$route.params.id);
      this.servico = data;
    }
  },
  computed: {
    title() {
      return this.$route.params.id
          ? 'Editar serviço'
          : 'Novo serviço'
    }
  },
  methods: {
    async cadastrar(servico) {
      try {
        await this.$crudServico.save(servico)
        // success message
        this.$router.replace('servicos')

      } catch (err) {
        alert(err.response.data.message);
      }
    }
  }
}
</script>

<style scoped>
form {
  margin: 0 auto;
}
</style>