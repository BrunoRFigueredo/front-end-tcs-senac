<template>
  <div class="detail-page" v-if="empty">
    <div class="detail-card">
      <div class="detail-header">
        <div class="detail-image">
          <img :src="'data:image.'+ instituicao.usuario?.imagem?.fileType.split('/')[1] +';base64,' + instituicao.usuario?.imagem?.file" alt="Logo">
        </div>
        <h2 class="detail-name">{{instituicao.nome}}</h2>
      </div>

      <div class="detail-grid">
        <div class="detail-section">
          <h3 class="section-title">
            <i class="fas fa-map-marker-alt"></i>
            Localizacao
          </h3>
          <div class="detail-info">
            <div class="info-item">
              <span class="info-label">Estado</span>
              <span class="info-value">{{instituicao.estado}}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Cidade</span>
              <span class="info-value">{{instituicao.cidade}}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Logradouro</span>
              <span class="info-value">{{instituicao.logradouro}}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Numero</span>
              <span class="info-value">{{instituicao.numero}}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h3 class="section-title">
            <i class="fas fa-id-card"></i>
            Informacoes
          </h3>
          <div class="detail-info">
            <div class="info-item">
              <span class="info-label">CEP</span>
              <span class="info-value">{{instituicao.cep}}</span>
            </div>
            <div class="info-item">
              <span class="info-label">CNPJ</span>
              <span class="info-value">{{instituicao.cnpj}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="detail-section contact-section">
        <h3 class="section-title">
          <i class="fas fa-phone"></i>
          Contato
        </h3>
        <div class="contact-card">
          <div>
            <span class="contact-label">WhatsApp</span>
            <span class="contact-phone">{{instituicao.telefone}}</span>
          </div>
          <button @click="this.enviaMensagem(instituicao.telefone, 'Ola')" class="btn-whatsapp">
            <i class="fas fa-comment-dots"></i>
            Enviar mensagem
          </button>
        </div>
      </div>

      <div class="detail-section">
        <h3 class="section-title">
          <i class="fas fa-book"></i>
          Biografia
        </h3>
        <p class="biography-text">{{instituicao.descricao}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import CrudService from '@/services/crud';
import { enviaWhatsapp } from '@/util/enviaWhatsapp';
import VueModal from "@kouts/vue-modal";
import { isLogged } from '@/services/auth';

export default {
  props: ['id'],
  components:{
    "Modal": VueModal,
},
  data(){
    return{
      instituicao:{},
      empty: false,
    }
  },
  async mounted(){
    this.$crudInstituicao = new CrudService(`/instituicao/`);
    this.carregarInstituicao(this.id);
    this.$emit('logado');
  },
  methods: {
    async carregarInstituicao(id){
      const { data } = await this.$crudInstituicao.findById(id);
      this.instituicao = data;
      this.empty = true;
    },
    enviaMensagem(telefone, mensagem){
      enviaWhatsapp(telefone, mensagem);
    },
    verificaLogado(){
      return isLogged();
    }
  }
}
</script>

<style scoped>
.detail-page {
  max-width: 800px;
  margin: 0 auto;
}

.detail-card {
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-100);
  padding: 40px;
}

.detail-header {
  text-align: center;
  margin-bottom: 32px;
}

.detail-image {
  width: 200px;
  height: 200px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin: 0 auto 20px;
  box-shadow: var(--shadow-md);
  border: 3px solid var(--gray-100);
}

.detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-name {
  font-size: 28px;
  font-weight: 800;
  color: var(--gray-900);
  margin: 0;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.detail-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--gray-700);
  margin: 0 0 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  color: var(--primary);
  font-size: 14px;
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.info-label {
  color: var(--gray-500);
  font-weight: 500;
}

.info-value {
  color: var(--gray-800);
  font-weight: 600;
}

.contact-card {
  background: var(--secondary-light);
  border: 1px solid #a7f3d0;
  border-radius: var(--radius);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.contact-label {
  display: block;
  font-size: 12px;
  color: var(--secondary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-phone {
  font-size: 18px;
  font-weight: 700;
  color: var(--secondary-dark);
}

.btn-whatsapp {
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
}

.btn-whatsapp:hover {
  background: var(--secondary-dark);
  box-shadow: var(--shadow-md);
}

.biography-text {
  font-size: 15px;
  color: var(--gray-600);
  line-height: 1.7;
  word-break: break-word;
}

@media (max-width: 640px) {
  .detail-card { padding: 24px; }
  .detail-grid { grid-template-columns: 1fr; }
  .contact-card { flex-direction: column; gap: 12px; text-align: center; }
}
</style>
