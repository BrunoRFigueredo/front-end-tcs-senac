<template>
  <nav>
    <div class="link" v-if="user.nome">
      <router-link to="/" class="m-2">Início</router-link>
      <router-link to="/instituition" class="m-2">Instituições</router-link> 
      <router-link to="/project" class="m-2">Projetos</router-link>  
      <router-link to="/category" v-if="user.perfilPermissao == 3" class="m-2">Categorias</router-link>
      <router-link to="/insumo" v-if="user.perfilPermissao == 3" class="m-2">Insumos</router-link>
      <router-link to="/voluntary" v-if="user.perfilPermissao == 3" class="m-2">Voluntários</router-link>
      <router-link to="/services" v-if="user.perfilPermissao == 3" class="m-2">Serviços</router-link>
    </div>
    <div class="usuario">
      <div><strong style="color: #504B43">{{user.nome}}</strong></div>
      <div>
        <router-link to="/#" class="text-usuario" v-if="!user.nome" @click="logar()">Acessar conta</router-link> | 
        <router-link to="/user-register" class="text-usuario" v-if="!user.nome">Cadastrar</router-link>
        <button @click="deslogar()" v-if="user.nome" class="botaoDesconectar">Desconectar</button>
      </div>
    </div>
  </nav>
  <router-view class="mt-5 "/>
</template>

<script>
export default {
    data(){
      return{
        user: {
          id: 1,
          nome: "Felipe",
          email: "felipe-daros@hotmail.com",
          password: '123',
          confirmPassword: '123',
          dataHoraCadastro: Date.now(),
          status: 1,
          perfilPermissao: 3
        }
      }
    },
    methods:{
      logar(){
        this.user.nome = "Felipe"
      },
      deslogar(){
        this.user.nome = null
      }
    }
}
</script>

<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  width: 100%;
  padding-left: 2%;
  padding-right: 2%;
  height:80px;
  padding-top: 20px;
}

nav a {
  font-weight: bold;
  color: #77AD78	;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #7DBA84	;
  border-bottom: 1px solid #7DBA84	;
}

nav a:hover{
  color: #8FD694	;
}

.usuario{
  float: right;
}

.link{
  float: left;
}

.text-usuario{
  font-size: 10px;
  text-align: center;
  padding-top: 5%;
}

.botaoDesconectar{
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  background-color: #504B43;
  text-decoration: none;
  font-weight: bold;
  padding: 5px;
  font-size: 10px;
}
</style>
