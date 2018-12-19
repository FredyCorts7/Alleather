<template>
  <div class="flex-row align-items-center">
    <b-container class="reg">
      <b-row class="justify-content-center">
        <b-col>
          <b-card no-body class="bg-dark regis">
            <b-card-body class="p-4">
              <b-form>
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
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
    </b-container>
  </div>
</template>

<style>
  .regis {
    font-family: 'varela round';
    color: white;
    box-shadow: 8px 8px 30px rgba(64, 64, 65, 0.8);
    margin: 70px 0px;
    padding: 0px
  }
  .reg {
    width: 80%
  }
  #hand, #hand-cursor {
    cursor: pointer;
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
        rolid: 3
      },
      image: null,
      options: [
        {value: '', text: 'Choose your sex...'},
        {value: 'Femenino', text: 'Femenino'},
        {value: 'Masculino', text: 'Masculino'},
        {value: 'Indefinido', text: 'Indefinido'}
      ]
    }
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
      if (this.person.code != '' && this.person.name != '' && this.person.surname != '' && this.person.sex != '' && this.person.email != '' && this.person.pass != '' && this.person.birth != '' && this.person.address != '') {
        if (this.person.image == undefined) {
          fetch('/api/person/' + 0, { //0--> la inserción no necesita imagen
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
              this.person.name = ''
              this.person.surname = ''
              this.person.sex = ''
              this.person.email = ''
              this.person.pass = ''
              this.person.birth = ''
              this.person.address = ''
              this.person.code = ''
            })
        } else {
          this.person.image = this.image.name
          fetch('/api/person/' + 1, { //1-->La inserción necesita imagen
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
              this.person.name = ''
              this.person.surname = ''
              this.person.sex = ''
              this.person.email = ''
              this.person.pass = ''
              this.person.birth = ''
              this.person.address = ''
              this.person.code = ''
            })
        }
      }
      else this.$toastr.warning('Debes suministrar todos los datos', 'Register')
    }
  }
}
</script>