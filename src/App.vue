<template>
  <nav>
    <div class="link">
      <router-link to="/">Início</router-link> | 
      <router-link to="/users">Voluntários</router-link> |
      <router-link to="/instituition">Instituições</router-link> |
      <router-link to="/project">Projetos</router-link>
    </div>
    <div class="usuario">
      <div><strong style="color: #504B43">NOME USUÁRIO</strong></div>
      <div>
        <router-link to="/user-login" class="text-usuario">Login</router-link>
      </div>
    </div>
  </nav>
  <router-view class="mt-5"/>
</template>

<script>
export default {
  
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
</style>
