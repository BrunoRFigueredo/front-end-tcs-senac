<template>
  <div class="login-page" id="instituicao-form">
    <div class="form">
      <div class="header">
          <p>Cadastro da Instituição</p>
      </div>  
      <form class="login">  
        <div class="row">
          <div class="col">
            <div class="label">
          <label for="nome" class="form-label">Nome</label>
          </div>
          <div class="form-group">
            <input id="nome" type="text" class="form-control" v-model="instituicao.nome" required>
          </div>
          </div>
          <div class="col">
          <div class="label">
            <label for="cnpj" class="form-label">CNPJ</label>
          </div>
          <div class="form-group">
            <input id="cnpj" type="text" class="form-control" v-model="instituicao.cnpj" required>
          </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="label">
              <label for="senha" class="form-label">PIX</label>
            </div>
            <div class="form-group">
              <input id="pix" type="text" class="form-control" v-model="instituicao.pix" required>
            </div>
          </div>
          <div class="col">
            <div class="label">
              <label for="email" class="form-label">Email</label>
            </div>
            <div class="form-group">
              <input id="email" type="email" class="form-control" v-model="instituicao.email" required>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="label">
              <label for="telefone" class="form-label">telefone</label>
            </div>
            <div class="form-group">
              <input id="telefone" type="number" class="form-control" v-model="instituicao.telefone" required>
            </div>
          </div>
          <div class="col">
            <div class="label">
              <label for="whatsapp" class="form-label">Whatsapp</label>
            </div>
            <div class="form-group">
              <input id="whatsapp" type="number" class="form-control" v-model="instituicao.whatsapp" required>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="label">
              <label for="pais" class="form-label">pais</label>
            </div>
            <div class="form-group">
              <input id="pais" type="text" class="form-control" placeholder="Exemplo: BR" :maxlength="maxEstado" v-model="instituicao.pais" required>
            </div>
          </div>
          <div class="col">
            <div class="label">
              <label for="estado" class="form-label">estado</label>
            </div>
            <div class="form-group">
              <input id="estado" type="text" class="form-control" placeholder="Exemplo: SC" :maxlength="maxEstado" v-model="instituicao.estado" required>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div class="col">
            <div class="label">
              <label for="cidade" class="form-label">Cidade</label>
            </div>
            <div class="form-group">
              <input id="cidade" type="text" class="form-control" v-model="instituicao.cidade" required>
            </div>
          </div>
          <div class="col">
            <div class="label">
              <label for="logradouro" class="form-label">Logradouro</label>
            </div>
            <div class="form-group">
              <input id="logradouro" type="text" class="form-control" v-model="instituicao.logradouro" required>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="label">
              <label for="numero" class="form-label">Número</label>
            </div>
            <div class="form-group">
              <input id="numero" type="number" class="form-control w-50" v-model="instituicao.numero" required>
            </div>
          </div>
          <div class="col">
            <div class="label">
              <label for="cep" class="form-label">Cep</label>
            </div>
            <div class="form-group">
              <input id="cep" type="number"  class="form-control w-50" v-model="instituicao.cep" required>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="label">
              <label for="cep" class="form-label">Descrição</label>
            </div>
            <textarea name="descricao" id="descricao" class="w-100" v-model="instituicao.descricao"></textarea>
          </div>
        </div>
        <div class="col-md-12">
          <button type="submit" class="btn btn-success" @click.prevent="cadastrar(instituicao)">Cadastrar</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import CrudService from "@/services/crud";
export default{
  name: 'instituicao-form',
  data(){
    return{
      instituicao: {
        nome: '',
        descricao: '',
        cnpj: '',
        pix: '',
        email: '',
        telefone: '',
        bairro:'Não há',
        whatsapp: '',
        pais: '',
        estado: '',
        cidade: '',
        logradouro: '',
        numero: '',
        cep: '',
        usuario: 1,
      },
      maxEstado: 2,
    }
  },
  mounted(){
    this.$service = new CrudService('/instituicao/');

    
  },
  methods: {
    async cadastrar(instituicao){
      await this.$service.save(instituicao);
      /*this.erro = '';
      if(this.instituicao == null){
        alert('Todos os campos são obrigatórios para cadastrar uma instituição');
      }else{
      try{
        await this.$service.save(instituicao)
        //this.$router.push('/instituicao');
        console.log(instituicao)
      }catch(err){
        this.erro = erro.response.data.message;
        alert(this.erro);
      }*/
    }
  
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
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
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

</style>