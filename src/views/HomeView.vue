<template>
  <div id="home" class="container">
    <div class="row">
      <div class="col-sm-6">
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
      <div class="col-sm-6">
        <h3 class="text-center fw-bold mb-4">Quem somos</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae reprehenderit quam at officiis cupiditate! Dolorum id sit non? Cum aliquam cupiditate eligendi quo praesentium veniam itaque fugit similique mollitia consequuntur! Cum aliquam cupiditate eligendi quo praesentium veniam itaque fugit similique mollitia consequuntur Cum aliquam cupiditate eligendi quo praesentium veniam itaque fugit similique mollitia consequuntur</p>
      </div>
      <div class="col text-center mt-5">
        <h4 class="fw-bold mt-4">Empresas que acreditam no nosso trabalho</h4>
        <div>
          <img src="../assets/icons8-shopee.svg" alt="empresas" class="empresas">
          <img src="../assets/icons8-shopee.svg" alt="empresas" class="empresas">
          <img src="../assets/icons8-shopee.svg" alt="empresas" class="empresas">
          <img src="../assets/icons8-shopee.svg" alt="empresas" class="empresas">
          <img src="../assets/icons8-shopee.svg" alt="empresas" class="empresas">
        </div>
        <div class="backgroundBottom"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  mounted(){
    this.$emit('logado');
  }
};
</script>

<style scoped>
  img{
    width: 70%;
    max-width: 70%;
    border-radius: 5px;
  }

  .empresas{
    width: 50px;
    margin-left: 80px;
    margin-right: 80px;
    margin-bottom: 10px;
    margin-top: 60px;
    opacity: 0.5;
  }

  .backgroundBottom{
    width: 1150px;
    height: 2px;
    background-color: #8391a2;
    opacity: 0.5;
  }
</style>
