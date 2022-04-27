<template>
  <div id="service-select">
    <ul>
      <li>{{service}}</li>
    </ul>
  </div>
</template>

<script>
import api from "../../services/api";
export default {
  name: "sevice-select",
  props: ["id"],
  data(){
    return{
      service: {}
    }
  },
  async created(){
    await api.get(`/servico/${this.id}`).then(r => {
      this.service = r.data;
      console.log(r);
    })
  }
}
</script>