<template>

  <div id="index-logado" class="container" v-if="this.estaLogado()">
    
    <div class="row">
      <div class="col">
        UMA IMAGEMwe

      </div>
      <div class="col">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit debitis voluptate placeat ex autem odit, natus veritatis praesentium similique consequuntur nesciunt laborum eligendi ratione labore nulla suscipit corrupti accusantium corporis?
      </div>
    </div>
    <div class="w-50 mt-5" style="margin: 0 auto;">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, numquam possimus vero illo ullam provident sapiente molestias ad rerum natus totam beatae harum officia perspiciatis consequatur vitae assumenda? Atque, nulla.
    </div>
    <div class="row mt-5">
      <div class="col">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure ducimus perspiciatis odit amet ex doloremque fuga tempore dolores incidunt id cum ut at praesentium rem mollitia, quasi facere! Dolorum, illo.
      </div>
      <div class="col">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo facilis sed quasi totam quis adipisci velit, voluptatum commodi necessitatibus in illo asperiores sint dicta animi architecto rem aliquam. Dolore, tempora?
      </div>
    </div>
  </div>
</template>

<script>
import { isLogged } from '@/services/auth'
export default {
  name: 'index-logado',
  methods:{
    estaLogado(){
      return isLogged();
    },
  },
  mounted(){
    this.$emit('logado');
    
    if (!this.estaLogado()){
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>

</style>