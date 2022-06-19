<template>
  <div id="menu-superior">
    <nav class="mb-5 mt-2">
      <ul class="text-center">
        <router-link to="/sobre" class="m-4">Quem somos</router-link>
        <router-link to="/instituicao" class="m-4">Instituições</router-link>
        <router-link to="/projeto" class="m-4">Projetos Sociais</router-link>
        <router-link to="/usuario-login" class="float-end btn btn-success text-white" style="margin-right: 20px;">Login</router-link>
      </ul>
      
    </nav>
  </div>
</template>

<style scoped>

router-link, a{
  transition: 0.7s;
  color: #8391a2;
  font-weight: bold;
  text-decoration: none;
}

router-link, a:hover{
  color: rgb(183, 195, 209);
  transition: 0.7s;
  font-size: 16.5px;
  text-decoration: underline;
}
</style>