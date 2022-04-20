<template>
  <div id="home" class="container">
    <div class="row">
      <div class="col-sm-6">
        <img src="https://s1.static.brasilescola.uol.com.br/be/conteudo/images/imagem-em-lente-convexa.jpg" alt="">
      </div>
      <div class="col-sm-6">
        <h3>Quem somos</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae reprehenderit quam at officiis cupiditate! Dolorum id sit non? Cum aliquam cupiditate eligendi quo praesentium veniam itaque fugit similique mollitia consequuntur!</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  },
};
</script>

<style scoped>
  img{
    width: 70%;
    max-width: 70%;
    border-radius: 5%;
  }

  h3, p{
    color: #504B43
  }
</style>
