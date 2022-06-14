<template>
  <div id="form-voluntario" class="container">
    <div class="login-page">
        <div class="form">
            <div class="header">
                <p>Cadastro de Voluntário</p>
            </div>

            <form class="login">
                <div class="row">
                    <div class="form-group col-md-6">
                        <div class="label">
                            <label for="cpf" class="form-label">CPF</label>
                        </div>
                        <div>
                            <input id="cpf" type="text" class="form-control" v-model="voluntario.cpf">
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <div class="label">
                            <label for="pais" class="form-label">País</label>
                        </div>
                        <div>
                            <input id="pais" type="text" class="form-control" v-model="voluntario.pais">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <div class="label">
                            <label for="telefone" class="form-label">Telefone</label>
                        </div>
                        <div>
                            <input id="telefone" type="text" class="form-control" v-model="voluntario.telefone">
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <div class="label">
                            <label for="telefone" class="form-label">Estado</label>
                        </div>
                        <div>
                            <input id="telefone" type="text" class="form-control" v-model="voluntario.estado">
                        </div>
                    </div>  
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <div class="label">
                            <label for="cidade" class="form-label">Cidade</label>
                        </div>
                        <div>
                            <input id="cidade" type="text" class="form-control" v-model="voluntario.cidade">
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <div class="label">
                            <label for="bairro" class="form-label">Bairro</label>
                        </div>
                        <div>
                            <input id="bairro" type="text" class="form-control" v-model="voluntario.bairro">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-4">
                        <div class="label">
                            <label for="logradouro" class="form-label">Logradouro</label>
                        </div>
                        <div>
                            <input id="logradouro" type="text" class="form-control" v-model="voluntario.logradouro">
                        </div>
                    </div>
                    <div class="form-group col-md-4">
                        <div class="label">
                            <label for="numero" class="form-label">Número</label>
                        </div>
                        <div>
                            <input id="numero" type="text" class="form-control" v-model="voluntario.numero">
                        </div>
                    </div>
                    <div class="form-group col-md-4">
                        <div class="label">
                            <label for="cep" class="form-label" >CEP</label>
                        </div>
                        <div>
                            <input id="cep" type="text" class="form-control" v-model="voluntario.cep">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-12">
                        <div class="label">
                            <label for="cep" class="form-label" >Biografia</label>
                        </div>
                        <div>
                            <textarea id="cep" type="text" class="form-control" v-model="voluntario.biografia"></textarea>
                        </div>
                    </div>
                </div>
                                
                <div class="col-md-6 mt-4" style="margin: 0 auto">
                    <button type="submit" class="btn btn-success" @click="cadastrar(voluntario)">
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import CrudService from '@/services/crud';
import { getLogado, isLogged } from '@/services/auth';

export default {
  name: "form-voluntario",
  data(){
    return{
      usuario: {},
      voluntario: {
        nome: '......',
        biografia: '',
        cpf: '',
        telefone: '',
        pais: '',
        estado: '',
        bairro: '',
        logradouro: '',
        numero: '',
        cep: '',
        usuario: getLogado()
      }
    }
  },
  async mounted(){
    if (!this.verificaLogado()){
                this.$router.push('/projeto');
            } else {
                this.$crudVoluntario = new CrudService('/voluntario/');
                this.$crudInstituicao = new CrudService('/instituicao/');
                this.$crudUsuario = new CrudService('/usuario/');
            }
            this.$emit('logado');
               
  },
  methods: {
      async cadastrar(voluntario){
          try{
              await this.$crudVoluntario.save(voluntario);
              alert('Você se voluntariou!');
              this.$router.push('/voluntario');
          }catch(erro){
              alert(erro.response.data.message);
          }
      },
      verificaLogado(){
          return isLogged();
    },
  }
  
}
</script>

<style scoped>

  .login-page {
    margin: 0;
    }
    .header{
    color: black;
    font-size: 30px;
    }
    .form {
    position: relative;
    z-index: 1;
    background: #FFFFFF;
    max-width: 850px;
    margin: 0 auto 100px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    margin: auto;
    border-radius: 10px;
    }
    .label {
    text-align: left;
    font-family: "Roboto", sans-serif;
    font-size: 14px;
    margin-top: 10px;
    }
    .form button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    /* background: #4CAF50; */
    width: 100%;
    border: 0;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    margin-top: 30px;    
    }
</style>