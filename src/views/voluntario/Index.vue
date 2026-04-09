<template>
  <div class="page-container">
    <div class="page-header">
      <div>
        <h2 class="page-title">Voluntarios</h2>
        <p class="page-subtitle">Pessoas que dedicam seu tempo para transformar vidas</p>
      </div>
      <router-link to="/cadastrar-voluntario" v-if="this.verificaBotao()">
        <button class="btn-vincular">
          <i class="fas fa-hand-holding-heart"></i>
          Tornar-se voluntario
        </button>
      </router-link>
    </div>

    <div class="volunteers-grid">
      <div class="volunteer-card" v-for="volun in voluntarios" :key="volun.id">
        <div class="volunteer-avatar">
          <img :src="'data:image.' + volun.usuario.imagem.fileType.split('/')[1] + ';base64,' + volun.usuario.imagem.file"
            alt="Logo">
        </div>
        <h3 class="volunteer-name">{{ volun.usuario.nome }}</h3>
        <div class="volunteer-info">
          <i class="fas fa-map-marker-alt"></i>
          <span>{{ volun.cidade }}</span>
        </div>
        <router-link :to="`/voluntario/${volun.id}`" class="volunteer-link">
          Visualizar
          <i class="fas fa-arrow-right"></i>
        </router-link>
      </div>
    </div>

    <div class="pagination-container">
      <span class="pagination-info">Pagina {{ paginaDesejada }} de {{ totalPagina }}</span>
      <v-pagination v-model="paginaDesejada" :pages="totalPagina" :range-size="tamanhoPagina" :hideFirstButton="true"
        :hideLastButton="true" active-color="#dbeafe" @update:modelValue="listarVoluntarios" />
    </div>
  </div>
</template>

<script>
import CrudService from "@/services/crud";
import VPagination from "@hennge/vue3-pagination";
import { permit } from "@/util/permit";
import { getLogado, isLogged } from "@/services/auth";
export default {
  name: "index-voluntary",
  components: {
    VPagination
  },
  data() {
    return {
      voluntarios: [],
      tamanhoPagina: 3,
      paginaDesejada: 1,
      total: 0,
      totalPagina: 0,
      voluntarioUsuario: '',
      idVoluntarioUsuario: 0,
    }
  },
  async mounted() {
    this.$crudVoluntario = new CrudService('/voluntario/');
    this.$crudUsuario = new CrudService('/usuario/');
    this.$usuarioVoluntario = new CrudService('/voluntario/usuario/');
    this.$emit('logado');
    await this.listarVoluntarios();
    await this.verificaVoluntario(getLogado());
  },
  methods: {
    async listarVoluntarios() {
      const { data } = await this.$crudVoluntario.findAll({
        paginaDesejada: this.paginaDesejada - 1,
        tamanhoPagina: this.tamanhoPagina
      })
      this.voluntarios = data.conteudo;
      this.total = data.totalRegistros;
      const calculoPaginacao = data.totalRegistros / this.tamanhoPagina;
      this.totalPagina = calculoPaginacao === Math.floor(calculoPaginacao) ? calculoPaginacao : Math.floor(calculoPaginacao) + 1;
    },
    verificaLogado() {
      if (isLogged()) {
        if (permit(['INSTITUICAO'])) {
          return false;
        }
        return true;
      }
    },
    async buscaUsuario(idUsuarioLogado) {
      const { dados } = await this.$crudUsuario.findById(idUsuarioLogado);
      console.log(dados);
    },
    async verificaVoluntario(idUsuarioLogado) {
      if (getLogado()) {
        try {
          this.voluntarioUsuario = await this.$usuarioVoluntario.findById(idUsuarioLogado);
          this.idVoluntarioUsuario = this.voluntarioUsuario.data.id;
          console.log(this.idVoluntarioUsuario);
        } catch (erro) {
          console.log(erro);
        }
      }
    },
    verificaBotao() {
      if (this.verificaLogado()) {
        return this.idVoluntarioUsuario === 0;
      }
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

.btn-vincular {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--secondary);
  color: var(--white);
  border: none;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

.btn-vincular:hover {
  background: var(--secondary-dark);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.volunteers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.volunteer-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 32px 24px;
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-100);
  text-align: center;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.volunteer-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.volunteer-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 16px;
  border: 3px solid var(--primary-light);
  box-shadow: var(--shadow-md);
}

.volunteer-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.volunteer-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0 0 8px;
}

.volunteer-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--gray-500);
  margin-bottom: 20px;
}

.volunteer-info i {
  color: var(--gray-400);
  font-size: 13px;
}

.volunteer-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: var(--primary);
  color: var(--white) !important;
  border-radius: var(--radius);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition);
}

.volunteer-link:hover {
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
  .volunteers-grid {
    grid-template-columns: 1fr;
  }
}
</style>
