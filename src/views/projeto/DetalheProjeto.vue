<template>
  <div class="detail-page">
    <div class="detail-card">
      <div class="detail-header">
        <div class="project-badge">
          <i class="fas fa-project-diagram"></i>
        </div>
        <h2>{{ projeto.nome }}</h2>
        <p class="detail-subtitle">Instituicao: {{ nomeInstituicao }}</p>
      </div>

      <div class="detail-info-grid">
        <div class="info-item">
          <i class="fas fa-align-left"></i>
          <div>
            <span class="info-label">Descricao</span>
            <span class="info-value">{{ projeto.descricao }}</span>
          </div>
        </div>
        <div class="info-item">
          <i class="fas fa-calendar-alt"></i>
          <div>
            <span class="info-label">Inicio</span>
            <span class="info-value">{{ projeto.dataInicio }}</span>
          </div>
        </div>
        <div class="info-item">
          <i class="fas fa-calendar-check"></i>
          <div>
            <span class="info-label">Finaliza</span>
            <span class="info-value">{{ projeto.dataFinal }}</span>
          </div>
        </div>
        <div class="info-item">
          <i class="fas fa-id-card"></i>
          <div>
            <span class="info-label">CNPJ</span>
            <span class="info-value">{{ projeto.instituicao?.cnpj }}</span>
          </div>
        </div>
      </div>

      <div class="actions-grid" v-if="this.verificaLogado()">
        <button class="action-btn-card green" @click="showModal = true">
          <i class="fas fa-concierge-bell"></i>
          Cadastrar servico
        </button>
        <button class="action-btn-card green" @click="showModalInsumo = true">
          <i class="fas fa-box-open"></i>
          Cadastrar Insumo
        </button>
        <button class="action-btn-card green" @click="showModalPrestacao = true">
          <i class="fas fa-file-invoice-dollar"></i>
          Prestacao de contas
        </button>
      </div>

      <div class="actions-grid">
        <button type="button" class="action-btn-card blue" @click="carregarProjetoServicos(this.id)"
          data-bs-toggle="modal" data-bs-target="#exampleModal">
          <i class="fas fa-list"></i>
          Servicos
        </button>
        <button type="button" class="action-btn-card blue" @click="carregarProjetoInsumos(this.id)"
          data-bs-toggle="modal" data-bs-target="#modalInsumos">
          <i class="fas fa-boxes"></i>
          Insumos
        </button>
        <button type="button" class="action-btn-card blue" @click="carregarPrestacaoContas(this.id)"
          data-bs-toggle="modal" data-bs-target="#modalPrestacao">
          <i class="fas fa-chart-bar"></i>
          Prestacao de contas
        </button>
      </div>
    </div>
  </div>

  <!-- Modal Integração Projeto x Serviço -->
  <Modal :model-value="showModal" title="Cadastro de servico" id="modalServico"
    @update:modelValue="showModal = false, this.limpaErro()">
    <div class="alert alert-danger" role="alert" v-if="this.erro">
      {{ this.erro }}
    </div>
    <form class="login" @keyup="this.limpaErro()">
      <div class="row">
        <div class="form-group col-md-6">
          <div class="label">
            <label for="datainicio" class="form-label">Data Inicio</label>
          </div>
          <div>
            <input @keyup="formatarData(projetoServico.dataInicio)" id="datainicio" type="date" class="form-control"
              v-model="projetoServico.dataInicio" required>
          </div>
        </div>

        <div class="form-group col-md-6">
          <div class="label">
            <label for="datafim" class="form-label">Data Final</label>
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
            <label class="form-label">Servico</label>
          </div>
          <div>
            <ServicoSelect @change="this.limpaErro()" v-model="projetoServico.servico" required />
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

  <!-- Modal Integração Projeto x Insumo -->

  <Modal :model-value="showModalInsumo" title="Cadastro de insumos" id="cadastroInsumo"
    @update:modelValue="showModalInsumo = false, this.limpaErro()">
    <div class="alert alert-danger" role="alert" v-if="this.erro">
      {{ this.erro }}
    </div>
    <form class="login" @keyup="this.limpaErro()">
      <div class="row">
        <div class="form-group col-md-12">
          <div class="label">
            <label class="form-label">Insumo</label>
          </div>
          <div>
            <InsumoSelect @change="this.limpaErro()" v-model="projetoInsumo.insumo" />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-md-6">
          <div class="label">
            <label for="quantidade" class="form-label">Quantidade</label>
          </div>
          <div>
            <input id="quantidade" type="number" class="form-control" v-model="projetoInsumo.quantidade" required>
          </div>
        </div>
      </div>

      <div class="col-md-12 btn-cadastrar">
        <button type="submit" class="btn btn-success" @click="saveProjetoInsumo(this.projetoInsumo)">
          Cadastrar
        </button>
      </div>
    </form>
  </Modal>

  <!-- Modal Prestação de contas -->

  <div class="modal fade bd-example-modal-lg" id="modalPrestacao" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="alert alert-danger" role="alert" v-if="this.erro">
          {{this.erro}}
        </div>
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Prestacao de contas</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div id="index-service" class="container">
            <table class="table text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Quantidade</th>
                  <th scope="col">Valor (R$)</th>
                  <th scope="col">Data</th>
                  <th v-if="this.idInstituicaoUsuario === this.instituicao.id" scope="col">Acoes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="prestacaoConta in dataPrestacaoConta" :key="prestacaoConta.id">
                  <th scope="row">{{ prestacaoConta.id }}</th>
                  <td>{{ prestacaoConta.vlArrecadado }}</td>
                  <td>{{ prestacaoConta.qtdAlimento }}</td>
                  <td>{{ prestacaoConta.dataPrestacao }}</td>
                  <td v-if="this.idInstituicaoUsuario === this.instituicao.id">
                    <button @click="deletarPrestacaoConta(prestacaoConta.id)"
                      v-if="this.idInstituicaoUsuario === this.instituicao.id" class="btn">
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" id="fechar" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>

  <Modal :model-value="showModalPrestacao" title="Cadastro de servico" id="modalPrestacao"
    @update:modelValue="showModalPrestacao = false, this.limpaErro()">
    <div class="alert alert-danger" role="alert" v-if="this.erro">
      {{ this.erro }}
    </div>
    <form class="login" @keyup="this.limpaErro()">
      <div class="row">
        <div class="form-group col-md-6">
          <div class="label">
            <label for="dataPrestacao" class="form-label">Data</label>
          </div>
          <div>
            <input @keyup="formatarData(prestacaoConta.dataPrestacao)" id="dataPrestacao" type="date"
              class="form-control" v-model="prestacaoConta.dataPrestacao" required>
          </div>
        </div>
        <div class="form-group col-md-6">
          <div class="label">
            <label for="qtdAlimento" class="form-label">Quantidade de alimento</label>
          </div>
          <div>
            <input id="qtdAlimento" type="number" class="form-control" v-model="prestacaoConta.qtdAlimento">
          </div>
        </div>
        <div class="form-group col-md-12">
          <div class="label">
            <label for="vlArrecadado" class="form-label">Valor Arrecadado (R$)</label>
          </div>
          <div>
            <input id="vlArrecadado" type="number" class="form-control" v-model="prestacaoConta.vlArrecadado">
          </div>
        </div>
      </div>
      <br>
      <div class="col-md-12">
        <button type="submit" class="btn btn-success" @click="savePrestacaoConta(this.prestacaoConta)">
          Cadastrar
        </button>
      </div>
    </form>
  </Modal>

  <!-- Modal Integração Projeto x Insumo -->

  <div class="modal fade bd-example-modal-lg" id="modalInsumos" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="alert alert-danger" role="alert" v-if="this.erro">
          {{ this.erro }}
        </div>
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Insumos do Projeto</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div id="index-service" class="container">
            <table class="table text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Insumo</th>
                  <th scope="col">Quantidade</th>
                  <th scope="col">Status</th>
                  <th v-if="this.idVoluntarioUsuario" scope="col">Deseja Doar?</th>
                  <th v-if="this.idInstituicaoUsuario === this.instituicao.id"  scope="col">Acoes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="projetoInsumo in dataInsumosProjeto" :key="projetoInsumo.id">
                  <th scope="row">{{ projetoInsumo.id }}</th>
                  <td>{{ projetoInsumo.nomeInsumo }}</td>
                  <td>{{ projetoInsumo.quantidade }}</td>
                  <td>
                    <span v-if="projetoInsumo.status === 'EM_ANDAMENTO'" class="badge bg-primary">Em andamento</span>
                    <span v-if="projetoInsumo.status === 'CONCLUIDO'" class="badge bg-success">Concluido</span>
                  </td>
                  <span v-if="this.idVoluntarioUsuario" class="btn-whatsapp-inline"
                    @click="this.enviaMensagem(this.telefoneInstituicao, 'Ola! Gostaria de realizar doacao do insumo ' + projetoInsumo.nomeInsumo + ' !')"><img
                      src="../../assets/whatsapp1.png" height="20" width="20" alt=""></span>
                  <td v-if="this.idInstituicaoUsuario === this.instituicao.id">
                    <button @click="concluirInsumo(projetoInsumo.id)" class="btn">
                      <i class="bi bi-check-all"></i>
                    </button>
                    <button @click="deletarInsumo(projetoInsumo.id)"
                      v-if="this.idInstituicaoUsuario === this.instituicao.id" class="btn">
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="row">
              <div class="h5 col-md">
                Pagina {{ paginaDesejadaInsumos }} de {{ totalPaginaInsumos }}
              </div>
              <div class="col-md">
                <v-pagination v-model="paginaDesejadaInsumos" :pages="totalPaginaInsumos"
                  :range-size="tamanhoPaginaInsumos" :hideFirstButton="true" :hideLastButton="true"
                  active-color="#DCEDFF" @update:modelValue="carregarProjetoInsumos" />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" id="fechar" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Integração Projeto x Serviço -->

  <div class="modal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="alert alert-danger" role="alert" v-if="this.erro">
          {{ this.erro }}
        </div>
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ this.idVoluntarioUsuario ? 'Quais servicos lhe interessam?' : 'Listando servicos do projeto' }} </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div id="index-service" class="container">
            <table class="table text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Data inicio</th>
                  <th scope="col">Data final</th>
                  <th scope="col">Voluntario</th>
                  <th scope="col">Servico</th>
                  <th scope="col">Status</th>
                  <th v-if="this.idInstituicaoUsuario === this.instituicao.id" scope="col">Acoes</th>
                  <th v-if="this.idInstituicaoUsuario === this.instituicao.id" scope="col">
                    Aprovar/Reprovar
                  </th>
                  <th v-if="this.idVoluntarioUsuario" scope="col">Seja voluntario</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="projetoServico in data" :key="projetoServico.id">
                  <th scope="row">{{ projetoServico.id }}</th>
                  <td>{{ projetoServico.dataInicio }}</td>
                  <td>{{ projetoServico.dataFinal }}</td>
                  <td>{{ projetoServico.nomeVoluntario }}</td>
                  <td>{{ projetoServico.nomeServico }}</td>
                  <td>
                    <span v-if="projetoServico.statusServicoEnum === 'EM_ANDAMENTO'" class="badge bg-primary">Em andamento</span>
                    <span v-if="projetoServico.statusServicoEnum === 'CONCLUIDO'" class="badge bg-success">Concluido</span>
                    <span v-if="projetoServico.statusServicoEnum === 'PENDENTE'" class="badge bg-warning">Pendente</span>
                  </td>
                  <td v-if="this.idInstituicaoUsuario === this.instituicao.id">
                    <button @click="concluirServico(projetoServico.id)"
                      v-if="this.idInstituicaoUsuario === this.instituicao.id" class="btn">
                      <i class="bi bi-check-all"></i>
                    </button>
                    <button @click="deletarProjetoServico(projetoServico.id)"
                      v-if="this.idInstituicaoUsuario === this.instituicao.id" class="btn">
                      <i class="bi bi-trash"></i>
                    </button>
                  </td>
                  <td v-if="this.idInstituicaoUsuario === this.instituicao.id">
                    <button :disabled="!projetoServico.idVoluntario || projetoServico.statusServicoEnum !== 'PENDENTE'"
                      @click="aprovarReprovarVoluntario(projetoServico.id, true)" class="btn" title="Aprovar">
                      <i class="bi bi-check2-square"></i>
                    </button>
                    <button :disabled="!projetoServico.idVoluntario || projetoServico.statusServicoEnum !== 'PENDENTE'"
                      @click="aprovarReprovarVoluntario(projetoServico.id, false)" class="btn" title="Reprovar">
                      <i class="bi bi-x-square"></i>
                    </button>
                  </td>
                  <td v-if="this.idVoluntarioUsuario">
                    <button v-if="this.idVoluntarioUsuario" :disabled="projetoServico.idVoluntario"
                      @click="vincularVoluntario(projetoServico.id)" class="btn" title="Voluntariar-se">
                      <i class="bi bi-check2-square"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="row">
              <div class="h5 col-md">
                Pagina {{ paginaDesejada }} de {{ totalPagina }}
              </div>
              <div class="col-md">
                <v-pagination v-model="paginaDesejada" :pages="totalPagina" :range-size="tamanhoPagina"
                  :hideFirstButton="true" :hideLastButton="true" active-color="#DCEDFF"
                  @update:modelValue="carregarServico" />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CrudService from '@/services/crud';
import VueModal from "@kouts/vue-modal";
import ServicoSelect from "@/views/servico/ServicoSelect.vue";
import api from "@/services/api";
import { getLogado, isLogged } from "@/services/auth";
import { buscarVoluntario } from "@/util/buscaVoluntario";
import { buscarInstituicao } from "@/util/buscaInstituicao";
import { getClient } from "@/services/http";
import { permit } from '@/util/permit';
import InsumoSelect from '../insumo/InsumoSelect.vue';
import { enviaWhatsapp } from '@/util/enviaWhatsapp';

export default {
  components: {
    ServicoSelect,
    "Modal": VueModal,
    InsumoSelect
  },
  name: 'detalhe-projeto',
  props: ['id'],
  data() {
    return {
      prestacaoConta: {},
      nomeInstituicao: '',
      telefoneInstituicao: '',
      projeto: {},
      instituicao: { id: null },
      idInstituicaoUsuario: '',
      idVoluntarioUsuario: '',
      projetoServico: {
        dataInicio: '',
        dataFinal: '',
        voluntario: '',
        projeto: '',
        servico: ''
      },
      projetoInsumo: {
        quantidade: 0,
        insumo: '',
        projeto: '',
        status: 0
      },
      data: [],
      dataInsumosProjeto: [],
      totalInsumosProjetos: [],
      dataPrestacaoConta: [],
      tamanhoPaginaInsumos: 2,
      paginaDesejadaInsumos: 1,
      totalPaginaInsumos: 0,
      tamanhoPagina: 2,
      paginaDesejada: 1,
      total: 0,
      totalPagina: 0,
      showModal: false,
      showModalInsumo: false,
      showModalPrestacao: false,
      erro: ''
    }
  },
  mounted() {
    this.$crudProjetos = new CrudService('/projeto/');
    this.$crudProjetoServico = new CrudService('/projeto-servico/');
    this.$crudProjetoInsumo = new CrudService('/projeto-insumo/');
    this.$crudPrestacaoConta = new CrudService('/prestacao-conta/');
    this.$crudInstituicao = new CrudService('/instituicao/usuario/')
    this.carregarProjeto(this.id);
    this.verificarInstituicaoVoluntario();
    this.$emit('logado');
    this.erro = '';
  },
  methods: {
    async carregarProjeto(id) {
      const { data } = await this.$crudProjetos.findById(id);
      this.projeto = data;
      this.nomeInstituicao = this.projeto.instituicao.nome;
      this.instituicao = data.instituicao;
    },
    async carregarProjetoServicos(idProjetoServico) {
      this.erro = '';
      api
        .get('http://localhost:8080/projeto-servico/servicos/' + idProjetoServico)
        .then(response => {
          this.data = response.data.conteudo;
          this.total = response.data.totalRegistros;
          const calculoPaginacao = response.data.totalRegistros / this.tamanhoPagina;
          this.totalPagina = calculoPaginacao === Math.floor(calculoPaginacao) ? calculoPaginacao : Math.floor(calculoPaginacao) + 1;
        }).catch(error => {
          this.erro = error.response.data.message;
        })
    },
    async carregarProjetoInsumos(idProjeto) {
      this.erro = '';
      const dadosProjeto = await this.$crudProjetos.findById(idProjeto);
      this.telefoneInstituicao = dadosProjeto.data.instituicao.telefone;
      api
        .get('http://localhost:8080/projeto-insumo/insumos/' + idProjeto)
        .then(retorno => {
          this.dataInsumosProjeto = retorno.data.conteudo;
          this.totalInsumosProjetos = retorno.data.totalRegistros;
          const calculoPaginacaoInsumos = retorno.data.totalRegistros / this.tamanhoPagina;
          this.totalPaginaInsumos = calculoPaginacaoInsumos === Math.floor(calculoPaginacaoInsumos) ? calculoPaginacaoInsumos : Math.floor(calculoPaginacaoInsumos) + 1;
        }).catch(erro => {
          this.erro = erro.response.data.message;
        })
    },
    async carregarPrestacaoContas(idProjeto) {
      this.erro = '';
      api
        .get('http://localhost:8080/prestacao-conta/projeto/' + idProjeto)
        .then(retorno => {
          this.dataPrestacaoConta = retorno.data.conteudo;
        }).catch(erro => {
          this.erro = erro.response.data.message;
        })
    },
    async saveProjetoServico(projetoServico) {
      try {
        this.projetoServico.projeto = this.projeto.id;
        await this.$crudProjetoServico.save(projetoServico);
        this.showModal = false;
        this.projetoServico = {};
      } catch (error) {
        this.erro = error.response.data.message;
      }
    },
    async saveProjetoInsumo(projetoInsumo) {
      try {
        this.projetoInsumo.projeto = this.projeto.id;
        await this.$crudProjetoInsumo.save(projetoInsumo);
        this.showModalInsumo = false;
        this.projetoInsumo = {};
      } catch (erro) {
        this.erro = erro.response.data.message;
      }
    },
    async savePrestacaoConta(prestacaoConta) {
      try {
        this.prestacaoConta.projeto = this.projeto.id;
        await this.$crudPrestacaoConta.save(prestacaoConta);
        this.showModalPrestacao = false;
        this.prestacaoConta = {};
      } catch (erro) {
        this.erro = erro.response.data.message;
      }
    },
    async deletarPrestacaoConta(idPrestacaoConta) {
      try {
        await this.$crudPrestacaoConta.remove(idPrestacaoConta);
        this.carregarPrestacaoContas(this.id);
      } catch (erro) {
        this.erro = erro.response.data.message;
      }
    },
    deletarInsumo(idInsumo) {
      try {
        this.$crudProjetoInsumo.remove(idInsumo);
        this.carregarProjetoInsumos(idInsumo)
      } catch (erro) {
        this.erro = erro.response.data.message;
      }
    },
    async concluirInsumo(idProjetoInsumo) {
      try {
        getClient()
          .put('http://localhost:8080/projeto-insumo/' + idProjetoInsumo + "/concluir")
          .then(response => {
            this.carregarProjetoInsumos(this.id);
          });
      } catch (erro) {
        this.erro = erro.response.data.message;
      }

    },
    formatarData(dataInicio, dataFim) {
      if (dataInicio.lenght === 8) {
        this.projeto.dataInicio = dataF.format('YYYY-MM-DD');
      }
      if (dataFim.lenght === 8) {
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
    async deletarProjetoServico(idProjetoServico) {
      await this.$crudProjetoServico.remove(idProjetoServico);
      this.carregarProjetoServicos(this.id);
    },
    async concluirServico(idProjetoServico) {
      getClient()
        .put('http://localhost:8080/projeto-servico/servicos/' + idProjetoServico + "/concluir-servico")
        .then(response => {
          this.carregarProjetoServicos(this.id);
        });
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
    verificaLogado() {
      if (isLogged()) {
        if (this.permissao(['INSTITUICAO'])) {
          return true;
        }
        false;
      }
    },
    permissao(roles) {
      return permit(roles);
    },
    enviaMensagem(telefone, mensagem) {
      enviaWhatsapp(telefone, mensagem);
    },
    limpaErro() {
      this.erro = '';
    }
  }
}
</script>

<style scoped>
.detail-page {
  max-width: 800px;
  margin: 0 auto;
}

.detail-card {
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  border: 1px solid var(--gray-100);
  padding: 40px;
}

.detail-header {
  text-align: center;
  margin-bottom: 32px;
}

.project-badge {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 28px;
  color: var(--white);
}

.detail-header h2 {
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 8px;
}

.detail-subtitle {
  color: var(--gray-500);
  font-size: 15px;
  margin: 0;
}

.detail-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 28px;
}

.detail-info-grid .info-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  background: var(--gray-50);
  border-radius: var(--radius);
  border: 1px solid var(--gray-100);
}

.detail-info-grid .info-item i {
  color: var(--primary);
  margin-top: 2px;
  font-size: 14px;
}

.detail-info-grid .info-label {
  display: block;
  font-size: 12px;
  color: var(--gray-500);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-info-grid .info-value {
  display: block;
  font-size: 14px;
  color: var(--gray-800);
  font-weight: 600;
}

.actions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

.action-btn-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border: none;
  border-radius: var(--radius);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.action-btn-card.green {
  background: var(--secondary);
  color: var(--white);
}

.action-btn-card.green:hover {
  background: var(--secondary-dark);
  box-shadow: var(--shadow-md);
}

.action-btn-card.blue {
  background: var(--primary-light);
  color: var(--primary);
  border: 1px solid #bfdbfe;
}

.action-btn-card.blue:hover {
  background: var(--primary);
  color: var(--white);
}

.btn-whatsapp-inline {
  cursor: pointer;
  padding-top: 10px;
}

.btn-cadastrar {
  text-align: right;
  padding: 10px;
}

@media (max-width: 640px) {
  .detail-card { padding: 24px; }
  .detail-info-grid, .actions-grid { grid-template-columns: 1fr; }
}
</style>
