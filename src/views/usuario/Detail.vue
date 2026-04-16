<template>
  <div class="form-page" v-if="estaLogado()">
    <div class="form-card">
      <div class="form-header">
        <div class="user-icon">
          <i class="fas fa-user"></i>
        </div>
        <h2>{{usuario.nome}}</h2>
        <p>Atualize suas informacoes de perfil</p>
      </div>
      <form>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Nome</label>
            <input type="text" class="form-control" v-model="usuario.nome" required>
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" v-model="usuario.email" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Senha</label>
            <input type="password" class="form-control" v-model="usuario.password" required>
          </div>
          <div class="form-group">
            <label class="form-label">Confirmar senha</label>
            <input type="password" class="form-control" v-model="usuario.confirmPassword" required>
          </div>
        </div>
        <button class="btn-update" @click="atualizar(usuario.id)">
          <i class="fas fa-save"></i>
          Atualizar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { isLogged } from '@/services/auth';
import api from "../../services/api";
export default {
  name: "user-detail",
  props: ["id"],
  data(){
    return{
      usuario: {}
    }
  },
  async created(){
    if (this.estaLogado()) {
      await api.get(`/usuario/${this.id}`).then(r => {
      this.usuario = r.data;
      })
    } else {
      this.$router.push('/');
    }

  },
  methods:{
    atualizar(id){
      api.put(`/usuario/${id}`, this.usuario);
    },
    estaLogado(){
      return isLogged();
    }
  }
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
  text-align: center;
  margin-bottom: 32px;
}

.user-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 24px;
  color: var(--white);
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.btn-update {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 24px;
  background: var(--primary);
  color: var(--white);
  border: none;
  border-radius: var(--radius);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  margin-top: 8px;
}

.btn-update:hover {
  background: var(--primary-dark);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .form-card { padding: 24px; }
  .form-row { grid-template-columns: 1fr; }
}
</style>
