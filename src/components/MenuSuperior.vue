<template>
  <div id="menu-superior">
    <nav class="mb-5 mt-2">
      <ul class="text-center">
        <router-link to="/" class="m-4">Página Inicial</router-link>
        <router-link to="/instituicao" class="m-4">Instituições</router-link>
        <router-link to="/projeto" class="m-4">Projetos Sociais</router-link>
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