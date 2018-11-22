<template>
  <div class="login">
    <nav class="navbar navbar-light bg-light">
      <a href="#" class="navbar-brand">OEVN Stack (Oracle Express Vue Node)</a>
    </nav>
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="logIn">
                <div class="form-group">
                  <h4>Nombre de usuario</h4>
                  <input type="text" placeholder="Username" class="form-control" v-model="user">
                </div>
                <div class="form-group">
                  <h4>Contraseña</h4>
                  <input type="password" placeholder="Password" class="form-control" v-model="password">
                </div>
                <button class="btn btn-primary btn-block">Log in</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Identificación</th>
                <th>Nombres</th>
                <th>Dirección</th>
                <th>Fecha de Nacimiento</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="person of persons" :key="person">
                <td>{{person[0]}}</td>
                <td>{{person[1]}}</td>
                <td>{{person[2]}}</td>
                <td>{{person[3]}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .login {
    margin: 50px 0px
  }
</style>

<script>
export default {
  name: 'login',
  data: function () {
    return {
      user: '',
      password: '',
      persons: [],
    }
  },
  created: function () {
    this.getPersons()
  },
  methods: {
    logIn: function () {
      this.existPerson(this.user, this.password)
        .then(valor => {
          if (!valor) {
            alert('No concuerdan las credenciales');
            this.$root.credentials = [
              'Log in',
              'imgs/nav/user.png'
            ]
            return
          }
          this.user = ''
          this.password = ''
          this.$router.push('/')
        })
    },
    existPerson: function (user, password) {
      return fetch('/api/person/' + user + '&' + password)
        .then(res => {
          return res.json()
        })
        .then(data => {
          console.log(data[0])
          this.$root.credentials = data[0]
          return (this.$root.credentials != null)
        })
    },
    getPersons: function () {
      fetch('/api/person')
        .then(res => res.json())
        .then(data => {
          this.persons = data
          console.log(this.persons)
        })
    }
  }
}
</script>