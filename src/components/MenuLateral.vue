<template >
  <input type="checkbox" id="check">
      <label for="check">
        <i class="fas fa-bars" id="btn"></i>
        <i class="fas fa-times" id="cancel"></i>
      </label>
  <div class="sidebar">
    <header>
      <span class="sidebar-icon"><i class="fas fa-hands-helping"></i></span>
      Menu
    </header>
    <router-link to="/instituicao" class="active">
      <i class="fas fa-building p-2"></i>
      <span>Instituicao</span>
    </router-link>
    <router-link to="/projeto" class="active">
      <i class="fas fa-project-diagram p-2"></i>
      <span>Projetos</span>
    </router-link>
    <router-link to="/servicos" class="active" v-if="permissao(['INSTITUICAO'])">
      <i class="fas fa-concierge-bell p-2"></i>
      <span>Servicos</span>
    </router-link>
    <router-link to="/voluntario" class="active">
      <i class="fas fa-users p-2"></i>
      <span>Voluntarios</span>
    </router-link>
    <router-link to="/categoria" class="active" v-if="permissao(['INSTITUICAO'])">
      <i class="fas fa-tags p-2"></i>
      <span>Categorias</span>
    </router-link>
    <router-link to="/insumo" class="active" v-if="permissao(['INSTITUICAO'])">
      <i class="fas fa-box-open p-2"></i>
      <span>Insumos</span>
    </router-link>
    <router-link to="/" class="active logout-link" @click="sair()">
      <i class="fas fa-sign-out-alt p-2"></i>
      <span>Logout</span>
    </router-link>
  </div>
</template>

<script>
import { permit } from "@/util/permit";
import { isLogged, logout } from "@/services/auth";

export default {
  name: "index-logado",

  methods: {
    permissao(roles) {
      return permit(roles);
    },
    estaLogado() {
      return isLogged();
    },
    sair(){
      logout();
      this.$emit('deslogado');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
  .sidebar{
    top: 0;
    position: fixed;
    width: 260px;
    left: -260px;
    height: 100%;
    background: var(--gray-900);
    transition: all .35s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 99;
    text-decoration: none;
    box-shadow: var(--shadow-xl);
    overflow-y: auto;
  }

  .sidebar header{
    font-size: 18px;
    font-weight: 700;
    color: var(--white);
    line-height: 64px;
    text-align: center;
    background: var(--gray-800);
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .sidebar-icon {
    background: var(--primary);
    width: 32px;
    height: 32px;
    border-radius: var(--radius);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

  .sidebar a{
    display: flex;
    align-items: center;
    height: 52px;
    width: 100%;
    color: var(--gray-300);
    padding-left: 24px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    border-left: 3px solid transparent;
    transition: all 0.2s ease;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
  }

  .sidebar a:hover {
    background: rgba(255,255,255,0.06);
    color: var(--white);
    border-left: 3px solid var(--primary);
  }

  .sidebar a i {
    width: 24px;
    text-align: center;
    font-size: 15px;
    color: var(--gray-400);
    transition: var(--transition);
  }

  .sidebar a:hover i {
    color: var(--primary);
  }

  .sidebar a span{
    letter-spacing: 0.3px;
    color: inherit;
    text-decoration: none;
  }

  .logout-link {
    margin-top: auto;
    border-top: 1px solid rgba(255,255,255,0.08);
  }

  .logout-link:hover {
    border-left-color: var(--danger) !important;
  }

  .logout-link:hover i {
    color: var(--danger) !important;
  }

  #check{
    display: none;
  }

  label #btn, label #cancel{
    position: absolute;
    cursor: pointer;
    color: var(--white);
    border-radius: var(--radius);
    border: none;
    margin: 14px 20px;
    font-size: 20px;
    background: var(--gray-800);
    height: 40px;
    width: 40px;
    text-align: center;
    line-height: 40px;
    transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: var(--shadow-md);
    z-index: 100;
  }

  label #btn:hover, label #cancel:hover {
    background: var(--primary);
    transform: scale(1.05);
  }

  label #cancel{
    visibility: hidden;
  }

  #check:checked ~ .sidebar{
    left: 0;
  }

  #check:checked ~ label #btn{
    margin-left: 265px;
    opacity: 0;
    visibility: hidden;
  }

  #check:checked ~ label #cancel {
    margin-left: 265px;
    visibility: visible;
    z-index: 100;
  }
</style>
