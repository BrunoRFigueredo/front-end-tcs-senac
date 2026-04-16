<template>
<div class="page-container" v-if="this.estaLogado()">
  <div class="page-header">
    <div>
      <h2 class="page-title">Insumos</h2>
      <p class="page-subtitle">Gerencie os insumos da sua instituicao</p>
    </div>
    <router-link to="/cadastrar-insumo">
      <BotaoCadastrar />
    </router-link>
  </div>

  <div class="table-card">
    <table class="table text-center">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nome</th>
        <th scope="col">Descricao</th>
        <th scope="col">Unidade Medida</th>
        <th scope="col">Acoes</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="insumo in insumos">
        <th scope="row">{{ insumo.id }}</th>
        <td>{{ insumo.nome }}</td>
        <td>{{ insumo.descricao }}</td>
        <td>{{ insumo.unidadeMedida }}</td>
        <td>
          <div class="action-btns">
            <router-link :to="{ name: 'form-insumo', params: { id: insumo.id }}" class="action-btn edit">
              <i class="bi bi-pencil-square"></i>
            </router-link>
            <button @click="deletarInsumo(insumo.id)" class="action-btn delete">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="pagination-container">
      <span class="pagination-info">Pagina {{paginaDesejada}} de {{totalPagina}}</span>
      <v-pagination
          v-model="paginaDesejada"
          :pages="totalPagina"
          :range-size="tamanhoPagina"
          :hideFirstButton="true"
          :hideLastButton="true"
          active-color="#dbeafe"
          @update:modelValue="carregarInsumo"
      />
    </div>
  </div>
</div>
</template>

<script>
import { getLogado, isLogged } from '@/services/auth';
import CrudService from '@/services/crud';
import { buscarInstituicao } from '@/util/buscaInstituicao';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import BotaoCadastrar from '@/components/BotaoCadastrar.vue';

export default {
  name: "index-insumo",
  components: {
    VPagination,
    BotaoCadastrar
  },
  data(){
    return{
      insumos: [],
      categorias: [],
      tamanhoPagina: 5,
      paginaDesejada: 1,
      total: 0,
      totalPagina: 0,
      idInstituicao: '',
    }
  },
  async mounted(){
    this.$emit('logado');
    if (this.estaLogado()){
      let idUsuarioLogado = getLogado();
      this.$crudInsumo = new CrudService('/insumo/');
      const dados = await buscarInstituicao(idUsuarioLogado);
      this.idInstituicao = dados.instituicao.id;
      this.$crudInsumoInstituicao = new CrudService('/insumo/instituicao/' + dados.instituicao.id);
      this.carregarInsumo();
    } else {
      this.$router.push('/instituicao');
    }
  },
  methods: {
    estaLogado(){
      return isLogged();
    },
    async carregarInsumo(){
      const {data} = await this.$crudInsumoInstituicao.findAll({
        paginaDesejada: this.paginaDesejada -1,
        tamanhoPagina: this.tamanhoPagina,
        idInstituicao: this.idInstituicao
      });
      this.insumos = data.conteudo;
      this.total = data.totalRegistros;
      const calculoPaginacao = data.totalRegistros / this.tamanhoPagina;
      this.totalPagina = calculoPaginacao === Math.floor(calculoPaginacao) ? calculoPaginacao : Math.floor(calculoPaginacao) + 1;
    },
    async deletarInsumo(idInsumo){
      await this.$crudInsumo.remove(idInsumo);
      this.carregarInsumo();
    }
  }
}
</script>

<style scoped>
.page-container {
  max-width: 1100px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 800;
  color: var(--gray-900);
  margin: 0 0 4px;
}

.page-subtitle {
  color: var(--gray-500);
  font-size: 15px;
  margin: 0;
}

.table-card {
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-100);
  overflow: hidden;
  padding: 0 0 20px;
}

.action-btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.action-btn {
  width: 34px;
  height: 34px;
  border-radius: var(--radius);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: var(--transition);
  font-size: 14px;
  text-decoration: none;
}

.action-btn.edit {
  background: var(--primary-light);
  color: var(--primary);
}

.action-btn.edit:hover {
  background: var(--primary);
  color: var(--white);
}

.action-btn.delete {
  background: var(--danger-light);
  color: var(--danger);
}

.action-btn.delete:hover {
  background: var(--danger);
  color: var(--white);
}

.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 16px 20px 0;
}

.pagination-info {
  font-size: 14px;
  color: var(--gray-500);
  font-weight: 500;
}
</style>
