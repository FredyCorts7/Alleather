<template>
  <div class="container-fluid">
    <h1 class="titulo">Manage Provider</h1>
    <b-row class="justify-content-md-center">
      <b-button @click="this.showInsert" class="colornav insertemp">Register</b-button>
      <b-button @click="this.showUpdate" class="colornav updateemp">Modify</b-button>
      <b-button @click="this.showDelete" class="colornav deleteemp">Delete</b-button>
      <b-button @click="this.showSelect" class="colornav selectemp">To List</b-button>
      
    </b-row>
    <div id="insert" class="container">
      <b-row class="justify-content-center">
        <b-col>
          <b-card no-body class="bg-dark regis">
            <b-card-body class="p-4">
              <b-form>
                <h1>Register Provider</h1>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Identify Nit</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input :disabled=this.toModify @keydown.native="validarSoloNumeros" ref="percode" required type="text" class="form-control" placeholder="Ex. 1090123861" v-model="provider.nit"/>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Name</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input required type="text" class="form-control" placeholder="Ex. George" v-model="provider.name"/>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Email</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input required type="text" class="form-control" placeholder="Ex. example@gmail.com" v-model="provider.email"/>
                </b-input-group>
              
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Address</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input required type="text" class="form-control" placeholder="Ex. Cll 22A #4-55 Ceiba" v-model="provider.address"/>
                </b-input-group>
                <b-button v-if="!updateisOpened" class="colornav" block @click="this.registerProvider">Register</b-button>
                <b-button v-if="updateisOpened" class="colornav" block @click="this.updateProvider">Modify</b-button>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <div id="select" class="justify-content-md-center manageemp">
        <table class="table table-bordered table-outlined table-striped tabla table-responsive">
            <thead>
              <tr class="theader">
                <th>Name</th>
                <th>Address</th>
                <th>Email</th>
                <th v-if="updateisOpened">Update</th>
                <th v-if="deleteisOpened">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pro of providers" :key="pro">
                <td>{{pro[1]}}</td>
                <td>{{pro[2]}}</td>
                <td>{{pro[3]}}</td>
                <td v-if="updateisOpened"><b-button variant="warning" @click="updateProviders(pro[0])">Update</b-button></td>
                <td v-if="deleteisOpened"><b-button variant="danger" @click="deleteProviders(pro[0])">Delete</b-button></td>
               </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<style>
  .manageemp {
    font-family: 'varela round';
    margin: 80px 0 30px 0
  }
  .tabla {
    border-radius: 20px;
  }
  .theader {
    background-color: rgb(48, 51, 51);
    color: white;
  }
  .colornav {
    background-color: #68B0AB;
    border-color: #68B0AB;
    margin: 0 5px
  }
  .colornav:hover {
    background-color: rgb(88, 148, 144);
    border-color: rgb(88, 148, 144)
  }
  .selectpro {
    display: none
  }
  .titulo {
    text-align: center; 
    font-weight: bolder;
    margin: 40px 0 40px 0;
  }

</style>

<script>
export default {
    data: function () {
      return {
        provider: {
          nit: '',
          name: '',
          address: '',
          email: ''
        },
        providers: [],       
        insertisOpened: true,
        selectisOpened: false,
        updateisOpened: false,
        deleteisOpened: false,
        toModify: false     
      }
  },
  created() {
    if (!this.$session.exists()) {
      this.$router.push('/')
      this.$toastr.warning('No tiene el permiso para acceder a éste recurso')
    } else this.getProvider()
  },
  methods: {
    validarSoloNumeros: function (evt) {
      if(parseInt(evt.key) + '' === 'NaN'
          && evt.which !== 8 
          && evt.which !== 9
          && evt.which !== 190 
          && evt.which !== 37 
          && evt.which !== 39) {
        evt.preventDefault()
      }
    },
    registerProvider () {
      if (this.provider.nit != '' && this.provider.name != '' && this.provider.address != '' && this.provider.email != '') {
            fetch('/api/provider/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body: JSON.stringify(this.provider)
          })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              if (data.Error) this.$toastr.warning('Puede que éste email ya esté siendo utilizado', 'Register')
            })
            .catch(err => {
              this.$toastr.info('successfully registered', 'Register')
              this.provider.nit = ''
              this.provider.name = ''
              this.provider.email = ''
              this.provider.address = ''
              this.getProvider()
            })
      } else this.$toastr.warning('Debes suministrar todos los datos', 'Register')
    },
    updateProvider () {
      if (this.provider.nit != '' && this.provider.name != '' && this.provider.email != '' && this.provider.address != '') {
        fetch('/api/provider/', {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body: JSON.stringify(this.provider)
          })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              if (data.Error) this.$toastr.warning('A ocurrido un error', 'Update')
            })
            .catch(err => {
              this.$toastr.info('successfully modify', 'Modify')
              this.provider.nit = ''
              this.provider.name = ''
              this.provider.email = ''
              this.provider.address = ''
              document.getElementById('insert').style.display = 'none'
              this.getProvider()
            })
        } else this.$toastr.warning('Debes suministrar todos los datos', 'Register')
    },
    showInsert () {
      this.getProvider()
      this.insertisOpened = true
      this.updateisOpened = false
      this.deleteisOpened = false
      this.selectisOpened = false
      document.getElementById('insert').style.display = 'block'
      document.getElementById('select').style.display = 'none'
    },
    showUpdate () {
      this.getProvider()
      this.insertisOpened = false
      this.updateisOpened = true
      this.deleteisOpened = false
      this.selectisOpened = false
      document.getElementById('insert').style.display = 'none'
      document.getElementById('select').style.display = 'block'
    },
    showDelete () {
      this.getProvider()
      this.insertisOpened = false
      this.updateisOpened = false
      this.deleteisOpened = true
      this.selectisOpened = false
      
      document.getElementById('insert').style.display = 'none'
      document.getElementById('select').style.display = 'block'
    },
    showSelect () {
      this.getProvider()
      this.insertisOpened = false
      this.updateisOpened = false
      this.deleteisOpened = false
      this.selectisOpened = true
     
      document.getElementById('insert').style.display = 'none'
      document.getElementById('select').style.display = 'block'
    },
    getProvider () {
      fetch('/api/provider/')
        .then(res => res.json())
        .then(data => {
          this.providers = data
          console.log(this.providers)
        })
    },
    updateProviders (nit) {
      document.getElementById('insert').style.display = 'block'
      fetch('/api/provider/' + nit)
        .then(res => res.json())
        .then(data => {
          this.toModify = true
          this.provider.nit = data[0][0]
          this.provider.name = data[0][1]
          this.provider.email = data[0][2]
          this.provider.address = data[0][3]
          this.$toastr.info('Solo puedes modificar lo que se permita', 'Modify')
        })
    },
    deleteProviders (nit) {
      fetch('/api/provider/' + nit, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
        .then(data => {
          this.getProvider()
          this.$toastr.info('Remove succesfully', 'Deleting')
        })
    },
  }
}
</script>