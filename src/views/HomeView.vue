<template>
  <div id="home">
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <span class="hero-badge">Transformando vidas</span>
          <h1>Conectando pessoas a projetos que fazem a diferenca</h1>
          <p>Somos uma plataforma que une instituicoes, voluntarios e projetos sociais em uma rede de solidariedade e transformacao social.</p>
          <div class="hero-actions">
            <router-link to="/instituicao" class="btn-hero-primary">
              Ver Instituicoes
            </router-link>
            <router-link to="/projeto" class="btn-hero-secondary">
              Explorar Projetos
            </router-link>
          </div>
        </div>
        <div class="hero-image">
          <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="https://s1.static.brasilescola.uol.com.br/be/conteudo/images/imagem-em-lente-convexa.jpg" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="https://fotografiamais.com.br/wp-content/uploads/2018/11/composicao-de-imagem-galeria-1.jpg" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="https://s1.static.brasilescola.uol.com.br/be/conteudo/images/imagem-em-lente-convexa.jpg" class="d-block w-100" alt="...">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="stats-section">
      <div class="stat-card">
        <div class="stat-icon"><i class="fas fa-building"></i></div>
        <h3>Instituicoes</h3>
        <p>Organizacoes comprometidas com a mudanca social</p>
      </div>
      <div class="stat-card">
        <div class="stat-icon secondary"><i class="fas fa-project-diagram"></i></div>
        <h3>Projetos</h3>
        <p>Iniciativas que transformam comunidades</p>
      </div>
      <div class="stat-card">
        <div class="stat-icon accent"><i class="fas fa-users"></i></div>
        <h3>Voluntarios</h3>
        <p>Pessoas dispostas a fazer a diferenca</p>
      </div>
    </section>

    <section class="partners-section">
      <h4>Empresas que acreditam no nosso trabalho</h4>
      <div class="partners-grid">
        <img src="../assets/icons8-shopee.svg" alt="empresas" class="partner-logo">
        <img src="../assets/icons8-shopee.svg" alt="empresas" class="partner-logo">
        <img src="../assets/icons8-shopee.svg" alt="empresas" class="partner-logo">
        <img src="../assets/icons8-shopee.svg" alt="empresas" class="partner-logo">
        <img src="../assets/icons8-shopee.svg" alt="empresas" class="partner-logo">
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  mounted(){
    this.$emit('logado');
  }
};
</script>

<style scoped>
.hero-section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 0 60px;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-badge {
  display: inline-block;
  background: var(--primary-light);
  color: var(--primary);
  font-weight: 600;
  font-size: 13px;
  padding: 6px 14px;
  border-radius: 9999px;
  margin-bottom: 16px;
}

.hero-text h1 {
  font-size: 40px;
  font-weight: 800;
  line-height: 1.15;
  color: var(--gray-900);
  margin: 0 0 16px;
}

.hero-text p {
  font-size: 16px;
  color: var(--gray-500);
  line-height: 1.7;
  margin: 0 0 32px;
}

.hero-actions {
  display: flex;
  gap: 12px;
}

.btn-hero-primary {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  background: var(--primary);
  color: var(--white) !important;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

.btn-hero-primary:hover {
  background: var(--primary-dark);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
  color: var(--white) !important;
}

.btn-hero-secondary {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  background: var(--white);
  color: var(--gray-700) !important;
  border: 1.5px solid var(--gray-300);
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  transition: var(--transition);
}

.btn-hero-secondary:hover {
  border-color: var(--gray-400);
  background: var(--gray-50);
  color: var(--gray-700) !important;
}

.hero-image {
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-lg);
}

.stats-section {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 40px 0;
}

.stat-card {
  background: var(--white);
  border-radius: var(--radius-md);
  padding: 32px 24px;
  text-align: center;
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-100);
  transition: var(--transition);
}

.stat-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.stat-icon {
  width: 52px;
  height: 52px;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 22px;
}

.stat-icon.secondary {
  background: var(--secondary-light);
  color: var(--secondary);
}

.stat-icon.accent {
  background: var(--accent-light);
  color: var(--accent);
}

.stat-card h3 {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px;
}

.stat-card p {
  font-size: 14px;
  color: var(--gray-500);
  margin: 0;
}

.partners-section {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
  padding: 40px 0 60px;
  border-top: 1px solid var(--gray-200);
}

.partners-section h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--gray-500);
  margin-bottom: 32px;
}

.partners-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
}

.partner-logo {
  width: 48px;
  height: 48px;
  opacity: 0.35;
  transition: var(--transition);
  filter: grayscale(100%);
}

.partner-logo:hover {
  opacity: 0.7;
  filter: grayscale(0%);
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .hero-text h1 {
    font-size: 28px;
  }
  .stats-section {
    grid-template-columns: 1fr;
  }
  .partners-grid {
    gap: 24px;
    flex-wrap: wrap;
  }
}
</style>
