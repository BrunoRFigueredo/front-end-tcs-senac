<template>
  <div id="index-instituition">
    <div class="container">
      <h3 class="text-center fw-bold">Instituições</h3>
    <div class="row" style="max-width: 950px;max-height: 550px; overflow-y: scroll;">
      <div class="card m-2" style="width: 18rem;" v-for="instituicao in instituicoes" :key="instituicao.id">
        <div class="card-body">
          <h5 class="text-center fw-bold">{{instituicao.nome}}</h5>
          <span>{{instituicao.status}}</span>
          <div>
            <img src="https://www.eye-image.nl/assets/files/eye-image-homepage.1920x0x0x100.jpg" alt="imagem instituição" srcset="">
          </div>
          <div class="row mt-4">
            <p class="col">Cidade: {{instituicao.cidade}}</p>
            <p class="col">Estado: {{instituicao.uf}}</p>
          </div>
          <button class="botao" :to="`/instituicao/${instituicao.id}`">Visualizar</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      instituicoes: [
        {
          id:1,
          nome: "teste",
          cidade: "Içara",
          uf: "SC",
          status: true
        },
        {
          id:2,
          nome: "mercado",
          cidade: "Criciúma",
          uf: "SC",
          status: false
        },
        {
          id:1,
          nome: "teste",
          cidade: "Içara",
          uf: "SC",
          status: true
        },
        {
          id:2,
          nome: "mercado",
          cidade: "Criciúma",
          uf: "SC",
          status: false
        },
        {
          id:1,
          nome: "teste",
          cidade: "Içara",
          uf: "SC",
          status: true
        },
        {
          id:2,
          nome: "mercado",
          cidade: "Criciúma",
          uf: "SC",
          status: false
        }
      ],
    }
  },
  mounted(){
    
  },
  methods: {
    

  }
}
</script>

<style scoped>
p{
  font-size: 12px;
}

img{
  max-width: 250px;
  widows: 250px;
  height: auto;
  margin: 0 auto;
}

::-webkit-scrollbar-track {
    background-color: #F4F4F4;
}
::-webkit-scrollbar {
    width: 2px;
    background: #F4F4F4;
}
::-webkit-scrollbar-thumb {
    background: #dad7d7;
}
</style>