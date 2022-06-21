<template>
  <div class="servico-page" v-if="estaLogado()">
    <div class="form">
      <div class="alert alert-danger" role="alert" v-if="this.erro">
        {{ this.erro }}
      </div>
      <h3 class="text-center pb-4"><strong>Cadastrar Serviço</strong></h3>
      <form class="cadastro" @keyup="this.limpaErro()">
        <div class="row">
          <div class="form-group col-md-12 col-sm-12">
            <div class="label">
              <label for="nome" class="form-label">Nome do Serviço</label>
            </div>
            <div class="form-group col-md-12">
              <input id="nome" type="text" class="form-control" v-model="servico.nome" required>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-12 col-sm-12">
            <div class="label">
              <label for="descricao" class="form-label">Descrição</label>
            </div>
            <div class="form-group col-md-12">
              <input id="descricao" type="text" class="form-control" v-model="servico.descricao" required>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-12 col-sm-12">
            <div class="label">
              <label for="instituicao" class="form-label">Instituição</label>
            </div>
            <div class="form-group col-md-12">
              <input id="instituicao" type="text" class="form-control" disabled v-model="this.nomeInstituicao" required>
            </div>
          </div>
        </div>
        <BotaoSalvar :disabled="this.desabilitar()" @click="cadastrar(servico)" />
      </form>
    </div>
  </div>
</template>

<script>
import CrudService from '@/services/crud';
import { getLogado, isLogged } from '@/services/auth';
import { buscarInstituicao } from '@/util/buscaInstituicao';
import BotaoSalvar from '@/components/BotaoSalvar.vue';

export default {
  name: "form-service",
  components: {
    BotaoSalvar
  },
  data() {
    return {
      servico: {
        nome: "",
        descricao: "",
        instituicao: "",
        status: 1
      },
      erro: "",
      nomeInstituicao: "",
    };
  },
  computed: {
    title() {
      return this.$route.params.id
        ? "Editar serviço"
        : "Novo serviço";
    }
  },
  async mounted() {
    if (!this.estaLogado()) {
      this.$router.push("/");
    }
    else {
      let idUsuarioLogado = getLogado();
      this.$crudServico = new CrudService("/servico/");
      if (this.$route.params.id) {
        this.carregaServico(this.$route.params.id);
      }
      const dados = await buscarInstituicao(idUsuarioLogado);
      this.servico.instituicao = dados.instituicao.id;
      this.nomeInstituicao = dados.instituicao.nome;
    }
  },
  methods: {
    async cadastrar(servico) {
      try {
        await this.$crudServico.save(servico);
        this.$router.push("/servicos");
      }
      catch (erro) {
        this.erro = erro.response.data.message;
      }
    },
    async carregaServico(idServico) {
      const { data } = await this.$crudServico.findById(idServico);
      this.servico = data;
      this.servico.instituicao = dados.instituicao.id;
    },
    desabilitar() {
      //console.log('teste');
      // return  (!this.servico.nome || this.servico.nome.length > 45)
      //         (!this.servico.descricao || this.servico.descricao.length > 255)
    },
    estaLogado() {
      return isLogged();
    },
    limpaErro() {
      this.erro = '';
    }
  },
  components: { BotaoSalvar }
}
</script>

<style scoped>
.servico-page {
  padding: 10px;
}

.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 460px;
  margin: 0 auto 100px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  margin: auto;
}

.label {
  text-align: left;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
}

.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 3px;
  box-sizing: border-box;
  font-size: 14px;
}

.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 50%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}

.btn-cadastro {
  text-align: right;
}

.form button:hover,
.form button:active,
.form button:focus {
  background: #43A047;
}

.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}

.form .message a {
  color: #4CAF50;
  text-decoration: none;
}

.form .register-form {
  display: none;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}

.container:before,
.container:after {
  content: "";
  display: block;
  clear: both;
}

.container .info {
  margin: 50px auto;
  text-align: center;
}

.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}

.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}

.container .info span a {
  color: #000000;
  text-decoration: none;
}

.container .info span .fa {
  color: #EF3B3A;
}
</style>