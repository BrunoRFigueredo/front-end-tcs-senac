<template>
<div class="page-container">
  <div class="page-header">
    <div>
      <h2 class="page-title">Instituições</h2>
      <p class="page-subtitle">Conheça as organizações que fazem a diferença</p>
    </div>
    <router-link to="/cadastro-instituicao" v-if="this.verificaBotao()">
      <button class="btn-vincular" type="button">
        <i class="fas fa-plus"></i>
        Vincular-se a uma Instituição
      </button>
    </router-link>
  </div>

  <div class="cards-grid">
    <div class="inst-card" v-for="instituicao in instituicoes.conteudo" :key="instituicao.id">
      <router-link :to="`/instituicao/${instituicao.id}`" class="card-image-link">
        <div class="card-image">
          <img :src="'data:image.'+ instituicao.usuario.imagem.fileType.split('/')[1] +';base64,' + instituicao.usuario.imagem.file" alt="Logo">
        </div>
      </router-link>
      <div class="card-body">
        <router-link :to="`/instituicao/${instituicao.id}`">
          <h3 class="card-name">{{instituicao.nome}}</h3>
        </router-link>
        <div class="card-info">
          <div class="info-row">
            <i class="fas fa-envelope"></i>
            <span>{{instituicao.email}}</span>
          </div>
          <div class="info-row">
            <i class="fas fa-id-card"></i>
            <span>{{instituicao.cnpj}}</span>
          </div>
          <div class="info-row">
            <i class="fas fa-phone"></i>
            <span>{{instituicao.telefone}}</span>
            <span class="whatsapp-btn" @click="this.enviaMensagem(instituicao.telefone, 'Ola!')">
              <img src="../../assets/whatsapp.png" width="18" alt="WhatsApp">
            </span>
          </div>
        </div>
      </div>
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
      @update:modelValue="carregarInstituicoes"
    />
  </div>
</div>
</template>

<script>
import {getLogado, isLogged} from "@/services/auth";
import CrudService from "@/services/crud"
import { buscarInstituicao } from "@/util/buscaInstituicao";
import { buscarVoluntario } from "@/util/buscaVoluntario";
import {enviaWhatsapp} from "@/util/enviaWhatsapp";
import VPagination from "@hennge/vue3-pagination";

export default {
  name: 'index-instituicao',
  components: {
    VPagination
  },
  data() {
    return {
      instituicoes: [],
      imagemBase64: '',
      tamanhoPagina: 6,
      paginaDesejada: 1,
      total: 0,
      totalPagina: 0,
      instituicaoUsuario: '',
      idInstituicaoUsuario: '',
      idVoluntarioUsuario: ''
    }
  },
  async mounted() {
    this.$crudInstituicao = new CrudService('/instituicao/');
    this.$usuarioInstituicao = new CrudService('/instituicao/usuario/');
    this.$crudImagem = new CrudService('/usuario/');
    await this.verificaInstituicao(getLogado());
    this.carregarInstituicoes();
    this.verificaInstituicaoVoluntario();
    this.$emit('logado');
  },
  methods: {
    verificaBotao() {
      if (this.verificaLogado()) {
        if (!this.idInstituicaoUsuario && !this.idVoluntarioUsuario){
          return true;
        }
      }
    },
    async carregarInstituicoes() {
      const {data} = await this.$crudInstituicao.findAll({
        paginaDesejada: this.paginaDesejada - 1,
        tamanhoPagina: this.tamanhoPagina
      })
      this.instituicoes = data;
      this.total = data.totalRegistros;
      const calculoPaginacao = data.totalRegistros / this.tamanhoPagina;
      this.totalPagina = calculoPaginacao === Math.floor(calculoPaginacao) ? calculoPaginacao : Math.floor(calculoPaginacao) + 1;
    },
    verificaLogado() {
      return isLogged();
    },
    async verificaInstituicao(idUsuario) {
      if (getLogado()) {
        try {
          this.instituicaoUsuario = await this.$usuarioInstituicao.findById(idUsuario);
          this.idInstituicaoUsuario = this.instituicaoUsuario.data.id;
        } catch (erro) {
          console.log(erro);
        }
      }
    },
    enviaMensagem(telefone, mensagem) {
      enviaWhatsapp(telefone, mensagem);
    },
    async verificaInstituicaoVoluntario(){
      let idUsuario = getLogado();
      try {
        let dadosVoluntario = await buscarVoluntario(idUsuario);
        this.idVoluntarioUsuario = dadosVoluntario.voluntario.id;
        console.log(idVoluntarioUsuario);
      } catch(erro){
        console.log(erro.response.data.message);
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

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.inst-card {
  background: var(--white);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-100);
  transition: var(--transition);
}

.inst-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.card-image-link {
  text-decoration: none;
}

.card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: var(--gray-100);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.inst-card:hover .card-image img {
  transform: scale(1.05);
}

.card-body {
  padding: 20px;
}

.card-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0 0 12px;
}

.card-name:hover {
  color: var(--primary);
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--gray-600);
}

.info-row i {
  color: var(--gray-400);
  width: 16px;
  text-align: center;
  font-size: 12px;
}

.info-row span {
  color: var(--gray-600);
}

.whatsapp-btn {
  cursor: pointer;
  margin-left: 4px;
  transition: var(--transition);
}

.whatsapp-btn:hover {
  transform: scale(1.2);
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
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
