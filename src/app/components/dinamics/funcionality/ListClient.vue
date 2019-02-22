<template>
  <div class="container-fluid">
    <h1 class="titulo">List Clients</h1>
    <div class="justify-content-md-center manageemp">
      <b-table :items="clients" :fields="fieldsClient" striped responsive stacked="lg" head-variant="dark" :outlined="true"></b-table>
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

const FIELDS_NO_OPENED = [
  {key: '0', label: 'Name'},
  {key: '1', label: 'Sex'},
  {key: '2', label: 'Email'},
  {key: '3', label: 'Birthday'},
  {key: '4', label: 'Image'},
  {key: '5', label: 'Address'}
]

export default {
    data: function () {
      return {
        fieldsClient: FIELDS_NO_OPENED,
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