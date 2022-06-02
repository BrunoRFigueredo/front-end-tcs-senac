<template>
  <div id="detalhe-projeto" class="container">
    <router-link to="/projeto" class="btn btn-success">Voltar</router-link>
    <div class="w-50 divDados"> 
      <h4 class="text-center mt-2 mb-5">{{usuario.nome}}</h4>
      <p>Instituição responsável: {{projeto.nome}}</p>
      <p>Descrição: {{usuario.descricao}}</p>
      <p>Início: {{usuario.dataInicio}}</p>
      <p>Finaliza: {{usuario.dataFinal}}</p>
      <p>CNPJ: {{projeto.cnpj}}</p>
      <button type="button" class="btn btn-success" @click="showModal=true">
        Cadastrar serviço
      </button>
    </div>
  </div>

  <!-- Modal Integração Projeto x Serviço -->

  <Modal :model-value="showModal" title="Cadastro de serviço" @update:modelValue="showModal = false">
    <form class="login">
      <div class="row">
        <div class="form-group col-md-6">
          <div class="label">
            <label for="datainicio" class="form-label">Data Início</label>
          </div>
          <div>
            <input @keyup="formatarData(projeto_servico.dataFinal)" id="datainicio" type="date" class="form-control"
                   v-model="projeto_servico.dataInicio" required>
          </div>
        </div>

        <div class="form-group col-md-6">
          <div class="label">
            <label for="datainicio" class="form-label">Data Final</label>
          </div>
          <div>
            <input id="datafim" type="date" class="form-control" @keyup="formatarData(projeto_servico.dataFinal)"
            v-model="projeto_servico.dataFinal">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-md-12">
          <div class="label">
            <label class="form-label">Serviço</label>
          </div>
          <div>
            <ServicoSelect v-model="projeto_servico.servico" required />
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <button type="submit" class="btn btn-success" @click="saveProjetoServico(this.projeto_servico)">
          Cadastrar
        </button>
      </div>
    </form>
  </Modal>
</template>

<script>
import CrudService from '@/services/crud';
import VueModal from "@kouts/vue-modal";
import ServicoSelect from "@/components/ServicoSelect.vue";
import dayjs from "dayjs";

export default {
  components:{
    ServicoSelect,
    'Modal': VueModal
  },
  name: 'detalhe-projeto',
  props: ['id'],
  data(){
    return{
      projeto: {},
      projeto_servico: {
        dataInicio: '',
        dataFinal: '',
        voluntario: '',
        projeto: '',
        servico: ''
      },
      usuario: {},
      showModal: false
    }
  },
  mounted() {
    this.$crudProjetos = new CrudService('/projeto/');
    this.$crudProjetoServico = new CrudService('/projeto-servico/');
    this.carregarProjeto(this.id);
    this.$emit('logado');
  },
  methods: {
    async carregarProjeto(id){
      const {data} = await this.$crudProjetos.findById(id);
      this.projeto_servico.projeto = id;
      this.projeto = data.instituicao;
      this.usuario = data;
      console.log(data);
    },
    async saveProjetoServico(projetoServico){
      const {data} = await this.$crudProjetoServico.save(projetoServico);
      console.log(data);
    },
    formatarData(dataInicio, dataFim){
      if (dataInicio.lenght = 8) {
        const dataIni = dayjs(dataInicio);
        const dataInicioFormatada = dataF.format('YYYY-MM-DD');
        this.projeto.dataInicio = dataInicioFormatada;
      }
      if (dataFim.lenght = 8){
        const dataF = dayjs(dataFim);
        const dataFinalFormatada = dataIni.format('YYYY-MM-DD');
        this.projeto.dataFinal = dataFinalFormatada;
      }
    },
  }
}
</script>

<style scoped>
.divDados{
  margin: 0 auto;
  padding: 20px;
  background-color: #fff; 
  border-radius: 10px;
}
</style>