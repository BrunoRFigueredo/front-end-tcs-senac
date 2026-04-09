<template>
  <div class="dashboard-page" v-if="this.estaLogado()">
    <div class="dashboard-hero">
      <div class="hero-content">
        <h1>Bem-vindo ao Projetos Sociais</h1>
        <p>Gerencie instituicoes, projetos e voluntarios em um so lugar</p>
      </div>
    </div>

    <div class="dashboard-grid">
      <router-link to="/instituicao" class="dash-card">
        <div class="dash-icon blue">
          <i class="fas fa-building"></i>
        </div>
        <h3>Instituicoes</h3>
        <p>Visualize e gerencie as instituicoes cadastradas</p>
        <span class="dash-link">Acessar <i class="fas fa-arrow-right"></i></span>
      </router-link>

      <router-link to="/projeto" class="dash-card">
        <div class="dash-icon green">
          <i class="fas fa-project-diagram"></i>
        </div>
        <h3>Projetos</h3>
        <p>Acompanhe os projetos sociais em andamento</p>
        <span class="dash-link">Acessar <i class="fas fa-arrow-right"></i></span>
      </router-link>

      <router-link to="/voluntario" class="dash-card">
        <div class="dash-icon amber">
          <i class="fas fa-users"></i>
        </div>
        <h3>Voluntarios</h3>
        <p>Encontre e conecte-se com voluntarios</p>
        <span class="dash-link">Acessar <i class="fas fa-arrow-right"></i></span>
      </router-link>
    </div>

    <div class="info-section">
      <div class="info-card">
        <h3>Sobre a plataforma</h3>
        <p>Esta plataforma foi criada para facilitar a conexao entre instituicoes, projetos sociais e voluntarios. Nosso objetivo e tornar o trabalho social mais organizado, transparente e acessivel a todos.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { isLogged } from '@/services/auth'
export default {
  name: 'index-logado',
  methods:{
    estaLogado(){
      return isLogged();
    },
  },
  mounted(){
    this.$emit('logado');

    if (!this.estaLogado()){
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
.dashboard-page {
  max-width: 1100px;
  margin: 0 auto;
}

.dashboard-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: var(--radius-lg);
  padding: 48px 40px;
  margin-bottom: 32px;
  text-align: center;
}

.dashboard-hero h1 {
  color: var(--white);
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 8px;
}

.dashboard-hero p {
  color: rgba(255,255,255,0.8);
  font-size: 16px;
  margin: 0;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.dash-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 28px 24px;
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-100);
  text-decoration: none;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}

.dash-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.dash-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 16px;
}

.dash-icon.blue {
  background: var(--primary-light);
  color: var(--primary);
}

.dash-icon.green {
  background: var(--secondary-light);
  color: var(--secondary);
}

.dash-icon.amber {
  background: var(--accent-light);
  color: var(--accent);
}

.dash-card h3 {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px;
  color: var(--gray-900);
}

.dash-card p {
  font-size: 14px;
  color: var(--gray-500);
  margin: 0 0 16px;
  flex-grow: 1;
}

.dash-link {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 6px;
}

.dash-card:hover .dash-link {
  gap: 10px;
}

.info-section {
  margin-bottom: 40px;
}

.info-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 32px;
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-100);
}

.info-card h3 {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 12px;
}

.info-card p {
  font-size: 15px;
  color: var(--gray-600);
  line-height: 1.7;
  margin: 0;
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  .dashboard-hero {
    padding: 32px 24px;
  }
  .dashboard-hero h1 {
    font-size: 24px;
  }
}
</style>
