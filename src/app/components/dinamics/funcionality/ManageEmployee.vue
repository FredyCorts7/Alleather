<template>
  <div class="container-fluid">
    <h1 class="titulo">Manage Employees</h1>
    <b-row class="justify-content-md-center">
      <b-button @click="this.showInsert" class="colornav insertemp">Register</b-button>
      <b-button @click="this.showUpdate" class="colornav updateemp">Modify</b-button>
      <b-button @click="this.showDelete" class="colornav deleteemp">Delete</b-button>
      <b-button @click="this.showSelect" class="colornav selectemp">To List</b-button>
      <b-button @click="this.showHire" class="colornav selectemp">To Contract</b-button>
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
                  <b-form-input @keydown.native="validarSoloNumeros" ref="percode" required type="text" class="form-control" placeholder="Ex. 1090123861" v-model="person.code"/>
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
                <b-button v-if="!updateisOpened" class="colornav" block @click="this.registerPerson">Register</b-button>
                <b-button v-if="updateisOpened" class="colornav" block @click="this.updatePerson">Modify</b-button>
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
                <th>Sex</th>
                <th>Email</th>
                <th>Birthday</th>
                <th>Image</th>
                <th>Address</th>
                <th v-if="updateisOpened">Update</th>
                <th v-if="deleteisOpened">Delete</th>
                <th v-if="hireisOpened">Hire</th>
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
                <td v-if="updateisOpened"><b-button variant="warning" @click="updateEmployees(emp[6])">Update</b-button></td>
                <td v-if="deleteisOpened"><b-button variant="danger" @click="deleteEmployees(emp[6])">Delete</b-button></td>
                <td v-if="hireisOpened"><b-button variant="info" @click="hireEmployees(emp[6])">Hire</b-button></td>
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
  .select {
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
        deleteisOpened: false,
        hireisOpened: false
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
        if (this.person.image == undefined) {
          fetch('/api/person/' + 0, {
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
              this.getEmployees()
            })
        } else {
          this.person.image = this.image.name
          fetch('/api/person/' + 1, {
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
              this.person.image = undefined
              this.getEmployees()
            })
        }
      } else this.$toastr.warning('Debes suministrar todos los datos', 'Register')
    },
    updatePerson () {
      if (this.person.code != '' && this.person.name != '' && this.person.surname != '' && this.person.sex != '' && this.person.email != '' && this.person.birth != '' && this.person.address != '') {
        this.person.image = this.image.name
          fetch('/api/employee/', {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body: JSON.stringify(this.person)
          })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              if (data.Error) this.$toastr.warning('Puede que éste email ya esté siendo utilizado', 'Modify')
            })
            .catch(err => {
              this.$toastr.info('successfully modify', 'Modify')
              this.person.code = ''
              this.person.name = ''
              this.person.surname = ''
              this.person.sex = ''
              this.person.email = ''
              this.person.pass = ''
              this.person.birth = ''
              this.person.address = ''
              document.getElementById('insert').style.display = 'none'
              this.getEmployees()
            })
        } else this.$toastr.warning('Debes suministrar todos los datos', 'Register')
    },
    showInsert () {
      this.getEmployees()
      this.insertisOpened = true
      this.updateisOpened = false
      this.deleteisOpened = false
      this.selectisOpened = false
      this.hireisOpened = false
      document.getElementById('insert').style.display = 'block'
      document.getElementById('select').style.display = 'none'
    },
    showUpdate () {
      this.getEmployees()
      this.insertisOpened = false
      this.updateisOpened = true
      this.deleteisOpened = false
      this.selectisOpened = false
      this.hireisOpened = false
      document.getElementById('insert').style.display = 'none'
      document.getElementById('select').style.display = 'block'
    },
    showDelete () {
      this.getEmployees()
      this.insertisOpened = false
      this.updateisOpened = false
      this.deleteisOpened = true
      this.selectisOpened = false
      this.hireisOpened = false
      document.getElementById('insert').style.display = 'none'
      document.getElementById('select').style.display = 'block'
    },
    showSelect () {
      this.getEmployees()
      this.insertisOpened = false
      this.updateisOpened = false
      this.deleteisOpened = false
      this.selectisOpened = true
      this.hireisOpened = false
      document.getElementById('insert').style.display = 'none'
      document.getElementById('select').style.display = 'block'
    },
    showHire () {
      fetch('/api/person/', {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          this.employees = data
          console.log(this.employees)
        })
      this.insertisOpened = false
      this.updateisOpened = false
      this.deleteisOpened = false
      this.selectisOpened = false
      this.hireisOpened = true
      document.getElementById('insert').style.display = 'none'
      document.getElementById('select').style.display = 'block'
    },
    getEmployees () {
      fetch('/api/employee/')
        .then(res => res.json())
        .then(data => {
          this.employees = data
          console.log(this.employees)
        })
    },
    updateEmployees (identify) {
      document.getElementById('insert').style.display = 'block'
      fetch('/api/employee/' + identify)
        .then(res => res.json())
        .then(data => {
          this.person.code = data[0][0]
          this.person.name = data[0][1]
          this.person.surname = data[0][2]
          this.person.sex = data[0][3]
          this.person.email = data[0][4]
          //this.person.birth = data[0][5]
          //this.person.image = data[0][6]
          this.person.address = data[0][7]
          this.$toastr.info('Solo puedes modificar lo que se te permita', 'Modify')
        })
    },
    deleteEmployees (identify) {
      fetch('/api/employee/' + identify, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
        .then(data => {
          this.getEmployees()
          this.$toastr.info('Remove succesfully', 'Deleting')
        })
    },
    hireEmployees (identify) {
      fetch('/api/employee/' + identify, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
        .then(data => {
          this.showHire()
          this.$toastr.info('Hire succesfully', 'Hire')
        })
    }
  }
}
</script>