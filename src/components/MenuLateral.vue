<template >
  <!--<div class="area">
    <nav class="main-menu">
        <ul>
            <li class="" v-if="permissao(['NORMAL', 'ADMIN'])">
                <router-link to="/instituicao">
                    <i class="fa fa-home fa-2x bg-dark text-white"></i>
                    <span class="nav-text bg-dark text-white">
                        Instituições
                    </span>
                </router-link>
            </li>
            <li class="has-subnav ">
                <router-link to="/projeto">
                    <i class="fa fa-laptop fa-2x bg-dark text-white"></i>
                    <span class="nav-text bg-dark text-white">
                        Projetos
                    </span>
                </router-link>
            </li>
            <li class="has-subnav " v-if="permissao(['ADMIN'])">
                <router-link to="/servicos">
                <i class="fa fa-list fa-2x bg-dark text-white"></i>
                    <span class="nav-text bg-dark text-white">
                        Serviços
                    </span>
                </router-link>
            </li>
            <li class="has-subnav ">
                <router-link to="/voluntario">
                <i class="fa fa-list fa-2x bg-dark text-white"></i>
                    <span class="nav-text bg-dark text-white">
                        Voluntários
                    </span>
                </router-link>
            </li>
            <li class="has-subnav ">
                <router-link to="/categoria">
                <i class="fa fa-list fa-2x bg-dark text-white"></i>
                    <span class="nav-text bg-dark text-white">
                        Categoria
                    </span>
                </router-link>
            </li>
        </ul>
        <ul class="logout">
            <li>
              <router-link to="/">
                <i class="fa fa-power-off fa-2x bg-dark text-white"></i>
                <span class="nav-text bg-dark text-white" @click="sair()">
                  Logout
                </span>
              </router-link>
            </li>  
        </ul>
    </nav>
  </div>-->
  <input type="checkbox" id="check">
      <label for="check">
        <i class="fas fa-bars" id="btn"></i>
        <i class="fas fa-times" id="cancel"></i>
      </label>
  <div class="sidebar">
    <header>Menu</header>
    <router-link to="/instituicao" class="active">
      <i class="fas fa-qrcode p-2"></i>
      <span>Instituição</span>
    </router-link>
    <router-link to="/projeto" class="active">
      <i class="fas fa-qrcode p-2"></i>
      <span>Projetos</span>
    </router-link>
    <router-link to="/servicos" class="active" v-if="permissao(['INSTITUICAO'])">
      <i class="fas fa-qrcode p-2"></i>
      <span>Serviços</span>
    </router-link>
    <router-link to="/voluntario" class="active">
      <i class="fas fa-qrcode p-2"></i>
      <span>Voluntario</span>
    </router-link>
    <router-link to="/categoria" class="active" v-if="permissao(['INSTITUICAO'])">
      <i class="fas fa-qrcode p-2"></i>
      <span>Categoria</span>
    </router-link>
    <router-link to="/insumo" class="active" v-if="permissao(['INSTITUICAO'])">
      <i class="fas fa-qrcode p-2"></i>
      <span>Insumo</span>
    </router-link>
    <router-link to="/" class="active" @click="sair()">
      <i class="fa fa-power-off p-2"></i>
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
    width: 240px;
    left: -240px;
    height: 100%;
    background: #1e1e1e;
    transition: all .5s ease;
    z-index: 99;
    text-decoration: none;
  }

  .sidebar header{
    font-size: 28px;
    color: #fff;
    line-height: 50px;
    text-align: center;
    background: #1b1b1b;
    user-select: none;
  }

  .sidebar a{
    display: block;
    height: 65px;
    width: 100%;
    color: #fff;
    line-height: 65px;
    padding-left: 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #000;
    border-top: 1px solid rgba(255, 255, 255, .1);
    border-left: 5px solid transparent;
    transition: all 0.5 ease;
    text-decoration: none;
  }

  a.active, a:hover{
    border-left: 5px solid #b912;
    color: #b939;
    z-index: 100;
  }

  .sidebar a span{
    letter-spacing: 1px;
    text-transform: uppercase;
    color: white;
    text-decoration: none;
  }

  #check{
    display: none;
  }

  label #btn, label #cancel{
    position: absolute;
    cursor: pointer;
    color: #fff;
    border-radius: 5px;
    border: 1px solid #262626;
    margin: 15px 30px;
    font-size: 28px;
    background: #262626;
    height: 45px;
    width: 45px;
    text-align: center;
    line-height: 45px;
    transition: all .5s ease;
  }

  label #cancel{
    visibility: hidden;
  }

  #check:checked ~ .sidebar{
    left: 0;
  }

  #check:checked ~ label #btn{
    margin-left: 245px;
    opacity: 0;
    visibility: hidden;
  }

  #check:checked ~ label #cancel {
    margin-left: 245px;
    visibility: visible;
    z-index: 98;
  }
  
  /* @media(max-width: 860px){
    .sidebar{
      top: -80px;
      height: auto;
      width: 60px;
      left: 0;
      margin: 80px 0;
    }

    header, #btn, #cancel{
      display: none;
    }

    a i{
      margin: -20px;
    }

    span{
      visibility: hidden;
    }

    .sidebar router-link {
      height: 60px;
    }

    .sidebar router-link i{
      margin-left: 5px;
    }

    router-link:hover{
      width: 200px;
      background: inherit;
    }

    .sidebar router-link:hover span{
      opacity: 1;
      visibility: visible;
    }
  } */

</style>
