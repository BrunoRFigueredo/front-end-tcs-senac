<template>
  <div id="index-project" class="container">
    <div v-for="project in projects" :key="project.id">{{project}}</div>
  </div>
</template>

<script>
import api from "../../services/api";
export default {
  name: "index-project",
  data(){
    return{
      projects: []
    }
  },
  mounted(){
    /*api.get("/projeto/").then(r => {
      this.projects = r.data;
    })*/
  }
}
</script>