<template>
  <div class="page-container">
    <div class="page-header">
      <div>
        <h2 class="page-title">Projetos Sociais</h2>
        <p class="page-subtitle">Descubra projetos que estão transformando comunidades</p>
      </div>
      <div v-if="this.verificaLogado()">
        <router-link to="/cadastrar-projeto">
          <BotaoCadastrar />
        </router-link>
      </div>
    </div>

    <div class="projects-grid">
      <div class="project-card" v-for="proj in projetos" :key="proj.id">
        <div class="project-card-header">
          <div class="project-icon">
            <i class="fas fa-project-diagram"></i>
          </div>
          <div class="project-status">
            <span class="status-badge active">Ativo</span>
          </div>
        </div>
        <h3 class="project-name">{{proj.nome}}</h3>
        <div class="project-dates">
          <div class="date-item">
            <i class="fas fa-calendar-alt"></i>
            <span>Inicio: {{proj.data_inicio}}</span>
          </div>
          <div class="date-item">
            <i class="fas fa-calendar-check"></i>
            <span>Final: {{proj.data_final}}</span>
          </div>
        </div>
        <router-link :to="`/projeto/${proj.id}`" class="project-link">
          Visualizar
          <i class="fas fa-arrow-right"></i>
        </router-link>
      </div>
    </div>

    <div class="pagination-container">
      <span class="pagination-info">Pagina {{ paginaDesejada }} de {{ totalPagina }}</span>
      <v-pagination
          v-model="paginaDesejada"
          :pages="totalPagina"
          :range-size="tamanhoPagina"
          :hideFirstButton="true"
          :hideLastButton="true"
          active-color="#dbeafe"
          @update:modelValue="carregarProjetos"
          class="pagination"
      />
    </div>
  </div>
</template>

<script>
import { isLogged } from '@/services/auth';
import CrudService from '@/services/crud';
import VPagination from "@hennge/vue3-pagination";
import BotaoCadastrar from '@/components/BotaoCadastrar.vue';
import { permit } from '@/util/permit';

export default {
  name: "index-project",
  components: {
    VPagination,
    BotaoCadastrar
},
  data() {
    return {
      projetos: [],
      tamanhoPagina: 3,
      paginaDesejada: 1,
      total: 0,
      totalPagina: 0,
      nomeInstituicao: '',
      idInstituicao: '',
    }
  },
  mounted() {
    this.$crudProjetos = new CrudService('/projeto/');
    this.$crudInstituicao = new CrudService('/instituicao/');
    this.carregarProjetos();
    this.$emit('logado');
  },
  methods: {
    async carregarProjetos() {
      const {data} = await this.$crudProjetos.findAll({
        paginaDesejada: this.paginaDesejada - 1,
        tamanhoPagina: this.tamanhoPagina
      })
      console.log(data)
      this.projetos = data.conteudo;
      this.total = data.totalRegistros;
      const calculoPaginacao = data.totalRegistros / this.tamanhoPagina;
      this.totalPagina = calculoPaginacao === Math.floor(calculoPaginacao) ? calculoPaginacao : Math.floor(calculoPaginacao) + 1;
    },
    verificaLogado(){
      if (isLogged()){
        if (this.permissao(['INSTITUICAO'])){
          return true;
        }
        false;
      }
    },
    permissao(roles) {
      return permit(roles);
    },
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
  margin-bottom: 32px;
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.project-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 24px;
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-100);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.project-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.project-icon {
  width: 44px;
  height: 44px;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.status-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 9999px;
}

.status-badge.active {
  background: var(--secondary-light);
  color: var(--secondary);
}

.project-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0 0 16px;
}

.project-dates {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  flex-grow: 1;
}

.date-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--gray-500);
}

.date-item i {
  color: var(--gray-400);
  width: 14px;
  text-align: center;
}

.project-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--primary);
  color: var(--white) !important;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition);
}

.project-link:hover {
  background: var(--primary-dark);
  box-shadow: var(--shadow-md);
  color: var(--white) !important;
}

.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
  padding: 20px 0;
}

.pagination-info {
  font-size: 14px;
  color: var(--gray-500);
  font-weight: 500;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
