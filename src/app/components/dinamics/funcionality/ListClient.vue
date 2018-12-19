<template>
  <div class="container-fluid">
    <h1 class="titulo">List Clients</h1>
  
    <div class="justify-content-md-center manageemp">
        <table class="table table-bordered table-outlined table-striped tabla table-responsive">
            <thead>
              <tr class="theader">
                <th>Name</th>
                <th>Sex</th>
                <th>Email</th>
                <th>Birthday</th>
                <th>Image</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cli of clients" :key="cli">
                <td>{{cli[0]}}</td>
                <td>{{cli[1]}}</td>
                <td>{{cli[2]}}</td>
                <td>{{cli[3]}}</td>
                <td><picture><img class="useritem" :src=cli[4] /></picture></td>
                <td>{{cli[5]}}</td>
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
        clients: [],
      }
  },
  created() {
    if (!this.$session.exists()) {
      this.$router.push('/')
      this.$toastr.warning('No tiene el permiso para acceder a éste recurso')
    } else this.getClients()
  },
  methods: {    
    getClients () {
      fetch('/api/person/')
        .then(res => res.json())
        .then(data => {
          this.clients = data
          console.log(this.clients)
        })
    },
  }
}
</script>