<template>
  <div class="btn-cadastrar">
      <router-link to="/projeto">
        <BotaoVoltar />
      </router-link>
    </div>
  <div id="detalhe-projeto" class="container">
    <div class="w-50 divDados">
      <h4 class="text-center mt-2 mb-5">{{ projeto.nome }}</h4>
      <p>Instituição responsável: {{ nomeInstituicao }}</p>
      <p>Descrição: {{ projeto.descricao }}</p>
      <p>Início: {{ projeto.dataInicio }}</p>
      <p>Finaliza: {{ projeto.dataFinal }}</p>
      <p>CNPJ: {{ projeto.cnpj }}</p>
      <button type="projeto" class="btn btn-success" @click="showModal=true" style="margin-right: 60px">
        Cadastrar serviço
      </button>
      <button type="button" class="btn btn-primary" @click="carregarProjetoServicos(this.id)"
              data-bs-toggle="modal" data-bs-target="#exampleModal">
        Demonstrar serviços
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
            <input @keyup="formatarData(projetoServico.dataFinal)" id="datainicio" type="date" class="form-control"
                   v-model="projetoServico.dataInicio" required>
          </div>
        </div>

        <div class="form-group col-md-6">
          <div class="label">
            <label for="datainicio" class="form-label">Data Final</label>
          </div>
          <div>
            <input id="datafim" type="date" class="form-control" @keyup="formatarData(projetoServico.dataFinal)"
                   v-model="projetoServico.dataFinal">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-md-12">
          <div class="label">
            <label class="form-label">Serviço</label>
          </div>
          <div>
            <ServicoSelect v-model="projetoServico.servico" required/>
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <button type="submit" class="btn btn-success" @click="saveProjetoServico(this.projetoServico)">
          Cadastrar
        </button>
      </div>
    </form>
  </Modal>
  <!-- Modal Integração Projeto x Serviço -->


  <div class="modal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ this.idVoluntarioUsuario ? 'Quais serviços lhe interessam?' : 'Listando serviços do projeto' }} </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div id="index-service" class="container">
            <table class="table text-center">
              <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Data de ínicio</th>
                <th scope="col">Data final</th>
                <th scope="col">Voluntário</th>
                <th scope="col">Serviço</th>
                <th scope="col">Status do serviço</th>
                <th v-if="this.idInstituicaoUsuario === this.instituicao.id" scope="col">Ações</th>
                <th v-if="this.idInstituicaoUsuario === this.instituicao.id" scope="col">
                  Aprovar/Reprovar
                </th>
                <th v-if="this.idVoluntarioUsuario" scope="col">Seja voluntário</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="projetoServico in data" :key="projetoServico.id">
                <th scope="row">{{ projetoServico.id }}</th>
                <td>{{ projetoServico.dataInicio }}</td>
                <td>{{ projetoServico.dataFinal }}</td>
                <td>{{ projetoServico.nomeVoluntario }}</td>
                <td>{{ projetoServico.nomeServico }}</td>
                <td>{{ projetoServico.statusServicoEnum }}</td>
                <td v-if="this.idInstituicaoUsuario === this.instituicao.id">
                  <button @click="deletarServico(servico.id)" v-if="this.idInstituicaoUsuario === this.instituicao.id"
                          class="btn">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
                <td v-if="this.idInstituicaoUsuario === this.instituicao.id">
                  <button
                      :disabled="!projetoServico.idVoluntario"
                      @click="aprovarReprovarVoluntario(projetoServico.id, true)" class="btn" title="Aprovar">
                    <i class="bi bi-check2-square"></i>
                  </button>
                  <button
                      :disabled="!projetoServico.idVoluntario"
                      @click="aprovarReprovarVoluntario(projetoServico.id, false)" class="btn" title="Reprovar">
                    <i class="bi bi-x-square"></i>
                  </button>
                </td>
                <td v-if="this.idVoluntarioUsuario">
                  <button v-if="this.idVoluntarioUsuario"
                          :disabled="projetoServico.idVoluntario"
                          @click="vincularVoluntario(projetoServico.id)" class="btn" title="Voluntariar-se">
                    <i class="bi bi-check2-square"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="row">
              <div class="h5 col-md">
                Página {{ paginaDesejada }} de {{ totalPagina }}
              </div>
              <div class="col-md">
                <v-pagination
                    v-model="paginaDesejada"
                    :pages="totalPagina"
                    :range-size="tamanhoPagina"
                    :hideFirstButton="true"
                    :hideLastButton="true"
                    active-color="#DCEDFF"
                    @update:modelValue="carregarServico"
                />
              </div>
            </div>
            <!--<router-link tag="button" class="botao" :to="`/servico/${servico.id}`">Visualizar</router-link>-->
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" id="fechar" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import CrudService from '@/services/crud';
import VueModal from "@kouts/vue-modal";
import ServicoSelect from "@/views/servico/ServicoSelect.vue";
import dayjs from "dayjs";
import api from "@/services/api";
import {getLogado} from "@/services/auth";
import {buscarVoluntario} from "@/util/buscaVoluntario";
import {buscarInstituicao} from "@/util/buscaInstituicao";
import {getClient} from "@/services/http";
import BotaoVoltar from '@/components/BotaoVoltar.vue';

export default {
  components: {
    ServicoSelect,
    "Modal": VueModal,
    BotaoVoltar
},
  name: 'detalhe-projeto',
  props: ['id'],
  data() {
    return {
      nomeInstituicao: '',
      projeto: {},
      instituicao: {id: null},
      idInstituicaoUsuario: '',
      idVoluntarioUsuario: '',
      projetoServico: {
        dataInicio: '',
        dataFinal: '',
        voluntario: '',
        projeto: '',
        servico: ''
      },
      data: [],
      tamanhoPagina: 2,
      paginaDesejada: 1,
      total: 0,
      totalPagina: 0,
      showModal: false
    }
  },
  mounted() {
    this.$crudProjetos = new CrudService('/projeto/');
    this.$crudProjetoServico = new CrudService('/projeto-servico/');
    this.carregarProjeto(this.id);
    this.verificarInstituicaoVoluntario();
    this.$emit('logado');
  },
  methods: {
    async carregarProjeto(id) {
      const {data} = await this.$crudProjetos.findById(id);
      this.projeto = data;
      this.nomeInstituicao = this.projeto.instituicao.nome;
      this.instituicao = data.instituicao;
    },
    async carregarProjetoServicos(idProjeto) {
      api
          .get('http://localhost:8080/projeto-servico/servicos/' + idProjeto)
          .then(response => {
            this.data = response.data.conteudo;
            this.total = response.data.totalRegistros;
            const calculoPaginacao = response.data.totalRegistros / this.tamanhoPagina;
            this.totalPagina = calculoPaginacao === Math.floor(calculoPaginacao) ? calculoPaginacao : Math.floor(calculoPaginacao) + 1;
          }).catch(error => {
        alert(error.response.data.message);


      })
    },
    async saveProjetoServico(projetoServico) {
      try {
        this.projetoServico.projeto = this.projeto.id;
        await this.$crudProjetoServico.save(projetoServico);
        this.showModal = false;
        this.projetoServico = {};
      } catch (error) {
        this.error = error.response.data.message;
        alert(this.error);
      }
    },
    formatarData(dataInicio, dataFim) {
      if (dataInicio.lenght === 8) {
        // const dataIni = dayjs(dataInicio);
        this.projeto.dataInicio = dataF.format('YYYY-MM-DD');
      }
      if (dataFim.lenght === 8) {
        // const dataF = dayjs(dataFim);
        this.projeto.dataFinal = dataIni.format('YYYY-MM-DD');
      }
    },
    async verificarInstituicaoVoluntario() {
      let idUsuario = getLogado();
      if (idUsuario) {
        try {
          let dadosVoluntario = await buscarVoluntario(idUsuario);
          let dadosInstituicao = await buscarInstituicao(idUsuario);
          this.idInstituicaoUsuario = dadosInstituicao.instituicao.id;
          this.idVoluntarioUsuario = dadosVoluntario.voluntario.id;
        } catch (erro) {
          console.log(erro);
        }
      }
    },
    async vincularVoluntario(idProjetoServico) {
      if (this.idVoluntarioUsuario) {
        getClient()
            .put('http://localhost:8080/projeto-servico/servicos/' + idProjetoServico + "/vincular-voluntario/" + this.idVoluntarioUsuario)
            .then(response => {
              this.carregarProjetoServicos(this.id);
            });
      }
    },
    async aprovarReprovarVoluntario(idProjetoServico, isAprovado) {
      getClient()
          .put('http://localhost:8080/projeto-servico/servicos/' + idProjetoServico + "/aprovar-reprovar-voluntario?isAprovado=" + isAprovado)
          .then(response => {
            this.carregarProjetoServicos(this.id);
          });
    },
  }
}
</script>

<style scoped>
.divDados {
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
}
.btn-cadastrar{
  text-align: right;
  padding: 10px;
  padding-top: 0px;  
}
</style>