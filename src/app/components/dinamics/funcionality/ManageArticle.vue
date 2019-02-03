<template>
  <div class="container-fluid">
    <h1 class="titulo">Manage Article</h1>
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
                <h1>Register Articles</h1>
                <p class="text-muted">Register Articles</p>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Identify code</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input @keydown.native="validarSoloNumeros" required type="text" class="form-control" placeholder="Ex. George" v-model="article.id"/>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Name</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input required type="text" class="form-control" placeholder="Ex. Cortés" v-model="article.name"/>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Type</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-select required id="hand-cursor" v-model="article.type" :options="options"></b-form-select>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Material</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input required type="text" class="form-control" placeholder="Ex. example@gmail.com" v-model="article.material"/>
                </b-input-group>
                 <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Price Unit</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input required type="text" class="form-control" placeholder="Ex. example@gmail.com" v-model="article.priceunit"/>
                </b-input-group>
                 <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Price Wholesale</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input required type="text" class="form-control" placeholder="Ex. example@gmail.com" v-model="article.pricewholesale"/>
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
              <tr class="theader">
                <th>Name</th>
                <th>Type</th>
                <th>Material</th>
                <th>Price Unit</th>
                <th>Price Wholesale</th>
                <th>Image</th>
                <th>Quantity</th>
                <th v-if="updateisOpened">Update</th>
                <th v-if="deleteisOpened">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="art of this.$root.articles" :key="art">
                <td>{{art[1]}}</td>
                <td>{{art[2]}}</td>
                <td>{{art[3]}}</td>
                <td>{{art[4]}}</td>
                <td>{{art[5]}}</td>
                <td><picture><img class="useritem" :src=art[6] /></picture></td>
                <td>{{art[7]}}</td>
                <td v-if="updateisOpened"><b-button variant="warning" @click="execUpdate(art[0])">Update</b-button></td>
                <td v-if="deleteisOpened"><b-button variant="danger" @click="execDelete(art[0])">Delete</b-button></td>
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
</style>

<script>
export default {
  data: function () {
    return {
      article: {
        id: '',
        name: '',
        type: '',
        material: '',
        priceunit: '',
        pricewholesale: ''
      },
      image: null,
      options: [],
      insertisOpened: true,
      selectisOpened: false,
      updateisOpened: false,
      deleteisOpened: false,
      c: 0
    }
  },
  created() {
    if (!this.$session.exists()) {
      this.$router.push('/')
      this.$toastr.warning('No tiene el permiso para acceder a éste recurso')
    } else this.getArticles()
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
    getArticles () {
      fetch('/api/article')
        .then(res => res.json())
        .then(data => {
          this.$root.articles = data
          console.log(this.$root.articles)
        })
    },
    execUpdate (identify) {
      this.$toastr.info('Update', 'Function')
    },
    execDelete (identify) {
      fetch('/api/article/' + identify, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
        .then(data => {
        console.log(data)
        this.getArticles()
        this.$toastr.info('Remove Succesfully', 'Deleting')
      })
    }
  }
}
</script>