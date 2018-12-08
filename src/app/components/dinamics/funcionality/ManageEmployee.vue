<template>
  <div class="container-fluid">
    <h1 class="titulo">Manage Employees</h1>
    <b-row class="justify-content-md-center">
      <b-button @click="this.showInsert" class="colornav insertemp">Register</b-button>
      <b-button @click="this.showUpdate" class="colornav updateemp">Modify</b-button>
      <b-button @click="this.showDelete" class="colornav deleteemp">Delete</b-button>
      <b-button @click="this.showSelect" class="colornav selectemp">Show</b-button>
    </b-row>
    <div id="insert" class="container"> 
      <b-row class="justify-content-center">
        <b-col>
          <b-card no-body class="bg-dark regis">
            <b-card-body class="p-4">
              <b-form>
                <h1>Register Employees</h1>
                <p class="text-muted">Register Employees</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Identify code</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input @keydown.native="validarSoloNumeros" required type="text" class="form-control" placeholder="Ex. 1090123861" v-model="person.code"/>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Name</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input required type="text" class="form-control" placeholder="Ex. George" v-model="person.name"/>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Surname</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input required type="text" class="form-control" placeholder="Ex. Cortés" v-model="person.surname"/>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Sex</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-select required id="hand-cursor" v-model="person.sex" :options="options"></b-form-select>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Email</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input required type="text" class="form-control" placeholder="Ex. example@gmail.com" v-model="person.email"/>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Password</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input required type="password" class="form-control" placeholder="Password" v-model="person.pass"/>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Birthday</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input type="date" class="form-control" v-model="person.birth"/>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Perfil image</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-file id="hand" accept=".jpg, .jpeg" placeholder="Choose a file..." v-model="image"></b-form-file>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Address</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input required type="text" class="form-control" placeholder="Ex. Cll 22A #4-55 Ceiba" v-model="person.address"/>
                </b-input-group>
                <b-button class="colornav" block @click="this.registerPerson">Create Account</b-button>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <div id="select" class="justify-content-md-center manageemp">
      <!--<b-table outlined bordered hover :items="employees"></b-table>-->
        <table class="table table-bordered table-outlined table-striped tabla table-responsive">
            <thead>
              <tr>
                <th>Name</th>
                <th>Sex</th>
                <th>Email</th>
                <th>Birthday</th>
                <th>Image</th>
                <th>Address</th><!--
                <th v-if="updateisOpened">Update</th>
                <th v-if="deleteisOpened">Delete</th>-->
              </tr>
            </thead>
            <tbody>
              <tr v-for="emp of employees" :key="emp">
                <td>{{emp[0]}}</td>
                <td>{{emp[1]}}</td>
                <td>{{emp[2]}}</td>
                <td>{{emp[3]}}</td>
                <td><picture><img class="useritem" :src=emp[4] /></picture></td>
                <td>{{emp[5]}}</td>
                <td v-if="updateisOpened"><b-button variant="warning">Update</b-button></td>
                <td v-if="deleteisOpened"><b-button variant="danger">Delete</b-button></td>
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
  .colornav {
    background-color: #68B0AB;
    border-color: #68B0AB;
    margin: 0 5px
  }
  .colornav:hover {
    background-color: rgb(88, 148, 144);
    border-color: rgb(88, 148, 144)
  }
  #update {
    display: none
  }
  #delete {
    display: none
  }
  #select {
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
      person: {
        code: '',
        name: '',
        surname: '',
        sex: '',
        email: '',
        pass: '',
        birth: '',
        address: '',
        rolid: 2
      },
      employees: [],
      image: null,
      options: [
        {value: '', text: 'Choose your sex...'},
        {value: 'Femenino', text: 'Femenino'},
        {value: 'Masculino', text: 'Masculino'},
        {value: 'Indefinido', text: 'Indefinido'}
      ],
      insertisOpened: true,
      selectisOpened: false,
      updateisOpened: false,
      deleteisOpened: false
    }
  },
  created() {
    if (!this.$session.exists()) {
      this.$router.push('/')
      this.$toastr.warning('No tiene el permiso para acceder a éste recurso')
    } else this.getEmployees()
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
    registerPerson () {
      if (this.person.code != '' && this.person.name != '' && this.person.surname != '' && this.person.sex != '' && this.person.email != '' && this.person.birth != '' && this.person.image != '' && this.person.address != '') {
        this.person.image = this.image.name
        fetch('/api/person/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify(this.person)
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.Error) this.$toastr.warning('Puede que éste email o código de identificación ya estén siendo utilizados', 'Register')
          })
          .catch(err => {
            this.$toastr.info('successfully registered', 'Register')
            this.person.code = ''
            this.person.name = ''
            this.person.surname = ''
            this.person.sex = ''
            this.person.email = ''
            this.person.pass = ''
            this.person.birth = ''
            this.person.address = ''
          })
      } else this.$toastr.warning('Debes suministrar todos los datos', 'Register')
    },
    showInsert () {
      this.insertisOpened = true
      this.updateisOpened = false
      this.deleteisOpened = false
      this.selectisOpened = false
      document.getElementById('insert').style.display = 'block'
      document.getElementById('select').style.display = 'none'
    },
    showUpdate () {
      this.insertisOpened = false
      this.updateisOpened = true
      this.deleteisOpened = false
      this.selectisOpened = false
      document.getElementById('insert').style.display = 'none'
      document.getElementById('select').style.display = 'block'
    },
    showDelete () {
      this.insertisOpened = false
      this.updateisOpened = false
      this.deleteisOpened = true
      this.selectisOpened = false
      document.getElementById('insert').style.display = 'none'
      document.getElementById('select').style.display = 'block'
    },
    showSelect () {
      this.insertisOpened = false
      this.updateisOpened = false
      this.deleteisOpened = false
      this.selectisOpened = true
      document.getElementById('insert').style.display = 'none'
      document.getElementById('select').style.display = 'block'
    },
    getEmployees: function () {
      fetch('/api/employee/' + this.person.rolid)
        .then(res => res.json())
        .then(data => {
          this.employees = data
          console.log(this.employees)
        })
    }
  }
}
</script>