<template>
  <div id="menu-superior">
    <nav>
      <div class="nav-container">
        <div class="nav-brand">
          <router-link to="/sobre" class="brand-link">
            <span class="brand-icon">
              <i class="fas fa-hands-helping"></i>
            </span>
            <span class="brand-text">Projetos Sociais</span>
          </router-link>
        </div>
        <ul class="nav-links">
          <li><router-link to="/sobre">Quem somos</router-link></li>
          <li><router-link to="/instituicao">Instituicoes</router-link></li>
          <li><router-link to="/projeto">Projetos</router-link></li>
        </ul>
        <div class="nav-actions">
          <router-link to="/usuario-login" class="btn-login">
            <i class="fas fa-sign-in-alt"></i>
            Login
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
nav {
  background: var(--white);
  border-bottom: 1px solid var(--gray-200);
  padding: 0 24px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: var(--shadow-sm);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.nav-brand .brand-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--gray-900);
  font-weight: 700;
  font-size: 18px;
}

.brand-icon {
  background: var(--primary);
  color: var(--white);
  width: 36px;
  height: 36px;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.brand-text {
  color: var(--gray-900);
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 8px;
  margin: 0;
  padding: 0;
}

.nav-links li a {
  color: var(--gray-600);
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: var(--radius);
  transition: var(--transition);
}

.nav-links li a:hover,
.nav-links li a.router-link-active {
  color: var(--primary);
  background: var(--primary-light);
}

.btn-login {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--primary);
  color: var(--white) !important;
  padding: 8px 20px;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

.btn-login:hover {
  background: var(--primary-dark);
  color: var(--white) !important;
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  .nav-container {
    padding: 0 16px;
  }
}
</style>
