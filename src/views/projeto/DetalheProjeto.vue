<template>
  <div id="detalhe-projeto" class="container">
    <div class="divDados">
      <h4 class="text-center mt-2 mb-5">{{ projeto.nome }}</h4>
      <p>Instituição responsável: {{ nomeInstituicao }}</p>
      <p>Descrição: {{ projeto.descricao }}</p>
      <p>Início: {{ projeto.dataInicio }}</p>
      <p>Finaliza: {{ projeto.dataFinal }}</p>
      <p>CNPJ: {{ projeto.instituicao?.cnpj }}</p>
      <div class="row">
        <button class="btn btn-success col m-1" @click="showModal = true" v-if="this.verificaLogado()">
          Cadastrar serviço
        </button>
        <button class="btn btn-success col m-1" @click="showModalInsumo = true" v-if="this.verificaLogado()">
          Cadastrar Insumo
        </button>
        <button class="btn btn-success col m-1" @click="showModalPrestacao = true" v-if="this.verificaLogado()">
          Cadastrar prestação de contas
        </button>
      </div>
      <br>
      <div class="row">
        <button type="button" class="btn btn-primary col m-1" @click="carregarProjetoServicos(this.id)"
          data-bs-toggle="modal" data-bs-target="#exampleModal">
          Serviços
        </button>
        <button type="button" class="btn btn-primary col m-1" @click="carregarProjetoInsumos(this.id)"
          data-bs-toggle="modal" data-bs-target="#modalInsumos">
          Insumos
        </button>
        <button type="button" class="btn btn-primary col m-1" @click="carregarPrestacaoContas(this.id)"
          data-bs-toggle="modal" data-bs-target="#modalPrestacao">
          Prestação de contas
        </button>
      </div>
    </div>
  </div>

  <!-- Modal Integração Projeto x Serviço -->
  <Modal :model-value="showModal" title="Cadastro de serviço" id="modalServico"
    @update:modelValue="showModal = false, this.limpaErro()">
    <div class="alert alert-danger" role="alert" v-if="this.erro">
      {{ this.erro }}
    </div>
    <form class="login" @keyup="this.limpaErro()">
      <div class="row">
        <div class="form-group col-md-6">
          <div class="label">
            <label for="datainicio" class="form-label">Data Início</label>
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
            <label class="form-label">Serviço</label>
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
          <h5 class="modal-title" id="exampleModalLabel">Prestação de contas</h5>
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
                  <th v-if="this.idInstituicaoUsuario === this.instituicao.id" scope="col">Ações</th>
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

  <Modal :model-value="showModalPrestacao" title="Cadastro de serviço" id="modalPrestacao"
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
                  <th v-if="this.idInstituicaoUsuario === this.instituicao.id"  scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="projetoInsumo in dataInsumosProjeto" :key="projetoInsumo.id">
                  <th scope="row">{{ projetoInsumo.id }}</th>
                  <td>{{ projetoInsumo.nomeInsumo }}</td>
                  <td>{{ projetoInsumo.quantidade }}</td>
                  <td>
                    <span v-if="projetoInsumo.status === 'EM_ANDAMENTO'" class="badge bg-primary">Em andamento</span>
                    <span v-if="projetoInsumo.status === 'CONCLUIDO'" class="badge bg-success">Concluído</span>
                  </td>
                  <span v-if="this.idVoluntarioUsuario" class="btn-whatsapp"
                    @click="this.enviaMensagem(this.telefoneInstituicao, 'Olá! Gostaria de realizar doação do insumo ' + projetoInsumo.nomeInsumo + ' !')"><img
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
                Página {{ paginaDesejadaInsumos }} de {{ totalPaginaInsumos }}
              </div>
              <div class="col-md">
                <v-pagination v-model="paginaDesejadaInsumos" :pages="totalPaginaInsumos"
                  :range-size="tamanhoPaginaInsumos" :hideFirstButton="true" :hideLastButton="true"
                  active-color="#DCEDFF" @update:modelValue="carregarProjetoInsumos" />
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
                  <td>
                    <span v-if="projetoServico.statusServicoEnum === 'EM_ANDAMENTO'" class="badge bg-primary">Em
                      andamento</span>
                    <span v-if="projetoServico.statusServicoEnum === 'CONCLUIDO'"
                      class="badge bg-success">Concluído</span>
                    <span v-if="projetoServico.statusServicoEnum === 'PENDENTE'"
                      class="badge bg-warning">Pendente</span>
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
                Página {{ paginaDesejada }} de {{ totalPagina }}
              </div>
              <div class="col-md">
                <v-pagination v-model="paginaDesejada" :pages="totalPagina" :range-size="tamanhoPagina"
                  :hideFirstButton="true" :hideLastButton="true" active-color="#DCEDFF"
                  @update:modelValue="carregarServico" />
              </div>
            </div>
            <!--<router-link tag="button" class="botao" :to="`/servico/${servico.id}`">Visualizar</router-link>-->
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
      //return isLogged();
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
.divDados {
  margin: 0 auto;
  padding: 20px;
  background-color: #ADD8E6;
  border-radius: 10px;
  width: 800px;
}

.btn-cadastrar {
  text-align: right;
  padding: 10px;
  padding-top: 0px;
}

.btn-whatsapp {
  padding-top: 30px;
}
</style>