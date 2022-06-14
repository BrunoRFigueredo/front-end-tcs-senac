<template>
<div class="container">
  <h2 class="text-center pb-2 fw-bold">Lista de voluntários</h2>
    <div class="text-center">
      <router-link to="/cadastrar-voluntario" style="text-decoration:none; color: #77AD78">Deseja ser um voluntário ?</router-link>
    </div>
    <div class="containerCardTotal">
        <div id="index-voluntary" class="w-25 containerCards mt-4" v-for="volun in voluntarios" :key="volun.id">
        <div class="card">
        <img src="https://lh3.googleusercontent.com/ytP9VP86DItizVX2YNA-xTYzV09IS7rh4WexVp7eilIcfHmm74B7odbcwD5DTXmL0PF42i2wnRKSFPBHlmSjCblWHDCD2oD1oaM1CGFcSd48VBKJfsCi4bS170PKxGwji8CPmehwPw=w200-h247-no" alt="Person" class="card__image">
        <p class="card__name">{{volun.nome}}</p>
        <p>{{volun.cidade}}</p>
        <router-link :to="`/voluntario/${volun.id}`" class="btn draw-border">Visualizar</router-link>
      </div>
      </div>
    </div>
  <div class="row text-center" style="margin: 0 auto;">
      <div class="">
        Página {{ paginaDesejada }} de {{ totalPagina }}
      </div>
      <div>
        <v-pagination
            v-model="paginaDesejada"
            :pages="totalPagina"
            :range-size="tamanhoPagina"
            :hideFirstButton="true"
            :hideLastButton="true"
            active-color="#DCEDFF"
            @update:modelValue="listarVoluntarios"
            style="margin-left: 44.2%;"
        />
      </div>
    </div>
</div>
</template>

<script>
import CrudService from "@/services/crud";
import VPagination from "@hennge/vue3-pagination";
export default {
  name: "index-voluntary",
  components: {
    VPagination
  },
  data(){
    return{
      voluntarios: [],
      tamanhoPagina: 3,
      paginaDesejada: 1,
      total: 0,
      totalPagina: 0,
    }
  },
  async mounted(){
    this.$crudVoluntario = new CrudService('/voluntario/');
    this.$emit('logado');
    await this.listarVoluntarios();
  },
  methods: {
    async listarVoluntarios(){
      const {data} = await this.$crudVoluntario.findAll({
        paginaDesejada: this.paginaDesejada - 1,
        tamanhoPagina: this.tamanhoPagina
      })
      this.voluntarios = data.conteudo;
      this.total = data.totalRegistros;
      const calculoPaginacao = data.totalRegistros / this.tamanhoPagina;
      this.totalPagina = calculoPaginacao === Math.floor(calculoPaginacao) ? calculoPaginacao : Math.floor(calculoPaginacao) + 1;
    }
  }
}
</script>

<style scoped>
.containerCardTotal{
  display: flex;
  align-items: center;
  justify-content: center;
}

.containerCards {
  justify-content: center;
  align-items: center;
  display: inline-flex;
}

.card {
  background-color: #222831;
  height: 24rem;
  border-radius: 5px;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.7);
  color: white;
  margin-bottom: 30%;
  
}

.card__name {
  margin-top: 15px;
  font-size: 1.5em;
  color: #fff;
}

.card__image {
  height: 160px;
  width: 160px;
  border-radius: 50%;
  border: 1px solid #272133;
  margin-top: 20px;
  box-shadow: 0 0 20px rgb(252, 252, 252, 1);
}


.draw-border {
  box-shadow: inset 0 0 0 4px #58cdd1;
  color: #58afd1;
  -webkit-transition: color 0.25s 0.0833333333s;
  transition: color 0.25s 0.0833333333s;
  position: relative;
}

.draw-border::before,
.draw-border::after {
  border: 0 solid transparent;
  box-sizing: border-box;
  content: '';
  pointer-events: none;
  position: absolute;
  width: 0rem;
  height: 0;
  bottom: 0;
  right: 0;
}

.draw-border::before {
  border-bottom-width: 4px;
  border-left-width: 4px;
}

.draw-border::after {
  border-top-width: 4px;
  border-right-width: 4px;
}

.draw-border:hover {
  color: #fff;
}

.draw-border:hover::before,
.draw-border:hover::after {
  border-color: #fff;
  -webkit-transition: border-color 0s, width 0.25s, height 0.25s;
  transition: border-color 0s, width 0.25s, height 0.25s;
  width: 100%;
  height: 100%;
}

.draw-border:hover::before {
  -webkit-transition-delay: 0s, 0s, 0.25s;
  transition-delay: 0s, 0s, 0.25s;
}

.draw-border:hover::after {
  -webkit-transition-delay: 0s, 0.25s, 0s;
  transition-delay: 0s, 0.25s, 0s;
}

.btn {
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1.5;
  font: 700 1.2rem 'Roboto Slab', sans-serif;
  padding: 0.75em 2em;
  letter-spacing: 0.05rem;
  margin: 1em;
  width: 13rem;
}

.btn:focus {
  outline: 2px dotted #55d7dc;
}


.social-icons {
  padding: 0;
  list-style: none;
  margin: 1em;
}

.social-icons li {
  display: inline-block;
  margin: 0.15em;
  position: relative;
  font-size: 1em;
}

.social-icons i {
  color: #fff;
  position: absolute;
  top: 0.95em;
  left: 0.96em;
  transition: all 265ms ease-out;
}

.social-icons a {
  display: inline-block;
}

.social-icons a:before {
  transform: scale(1);
  -ms-transform: scale(1);
  -webkit-transform: scale(1);
  content: " ";
  width: 45px;
  height: 45px;
  border-radius: 100%;
  display: block;
  background: linear-gradient(45deg, #ff003c, #c648c8);
  transition: all 265ms ease-out;
}

.social-icons a:hover:before {
  transform: scale(0);
  transition: all 265ms ease-in;
}

.social-icons a:hover i {
  transform: scale(2.2);
  -ms-transform: scale(2.2);
  -webkit-transform: scale(2.2);
  color: #ff003c;
  background: -webkit-linear-gradient(45deg, #ff003c, #c648c8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 265ms ease-in;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  font-size: 1.2em;
}

</style>