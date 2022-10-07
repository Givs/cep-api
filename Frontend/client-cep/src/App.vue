<template>
  <div class="app">
    <div class="fields">
      <div class="form">
          <input 
          type="number"
          placeholder="Digite um CEP"
          v-model="zipcode"
          maxlength="8"
          
        >
        <button
          @click="fetchCode"
          v-bind:disabled="zipcode.length != 8"
        >
          Buscar CEP
        </button>
      </div>
      <div class="message" v-if="zipcode.length != 8">
      Digite um CEP com 8 números
    </div>
    </div>
    <div class="results" v-if="info != null">
      <strong>CEP:</strong> {{ info.cep }}                    <br>
      <strong>Logradouro:</strong> {{ info.logradouro ? info.data.logradouro : '-' }}      <br>
      <strong>Bairro:</strong> {{ info.bairro ? info.data.bairro : '-' }}              <br>
      <strong>Localidade:</strong> {{ info.localidade }}      <br>
      <strong>UF:</strong> {{ info.uf }}                      <br>      
      <strong>Complemento:</strong> {{ info.complemento ? info.data.complemento : '-' }}        
    </div>
    <div class="results" v-if="err">
      Cep não encontrado
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
      return {
        url_base: "http://localhost:3001",
        zipcode: '',
        info: null,
        err: false
      }
    },
    methods: {
      fetchCode(){
        axios
          .get(`${this.url_base}/${this.zipcode}`)
          .then(response => {
            if(response.data.erro){
              this.err = true
              this.info = null
            }else{
              this.info = response.data
              this.err = false
            }
            
          })
      }
    }
  }
</script>

<style>
  body {
    background-color: rgb(237, 232, 232);
  }

  .fields {
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .fields .form{
    display:flex;
    align-items: center;
    flex-wrap: wrap;
    height: 50px;
    border-radius: 5px;
    width: 100%;
    justify-content: space-around;
  }

  .fields button{
    background-color: rgb(129, 125, 125);
    color: white
  }
  .fields button:disabled{
    background-color: #ddd;
  }

  .fields .message{
    font-size: 10px;
    color: red
  }
 
  .results {
    margin-top: 10px;
    background-color: white;
    padding: 10px;
    font-size: 12px;
    font-family: 'Courier New', Courier, monospace;
  }
</style>