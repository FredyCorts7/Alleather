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
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Identify code</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input :disabled=this.toModify @keydown.native="validarSoloNumeros" required type="text" class="form-control" placeholder="Ex. 00000001" v-model="article.id"/>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Name</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input required type="text" class="form-control" placeholder="Ex. Chaqueta" v-model="article.name"/>
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
                  <b-form-input required type="text" class="form-control" placeholder="Ex. Cuero Italiano" v-model="article.material"/>
                </b-input-group>
                 <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Price Unit</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input required type="text" class="form-control" placeholder="Ex. 99999" v-model="article.priceunit"/>
                </b-input-group>
                 <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Price Wholesale</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input required type="text" class="form-control" placeholder="Ex. 99998" v-model="article.pricewholesale"/>
                </b-input-group>
                <b-button v-if="!updateisOpened" class="colornav" block @click="this.registerArticle">Add Article</b-button>
                <b-button v-if="updateisOpened" class="colornav" block @click="this.updateArticles">Modify Article</b-button>
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
                <th v-if="updateisOpened">Update</th>
                <th v-if="deleteisOpened">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="art of this.$root.articles" :key="art">
                <td>{{art[1]}}</td>
                <td>{{art[2]}}</td>
                <td>{{art[3]}}</td>
                <td>{{art[5]}}</td>
                <td>{{art[6]}}</td>
                <td><picture><img class="useritem" :src=art[7] /></picture></td>
                <td v-if="updateisOpened"><b-button variant="warning" @click="toUpdateArticles(art[0])">Update</b-button></td>
                <td v-if="deleteisOpened"><b-button variant="danger" @click="deleteArticles(art[0])">Delete</b-button></td>
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
      options: [
        {value: '', text: 'Choose type...'},
        {value: 'Femenino', text: 'Femenino'},
        {value: 'Masculino', text: 'Masculino'},
        {value: 'Unisex', text: 'Unisex'}
      ],
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
    } else this.getArticles()
  },
  methods: {
    validarSoloNumeros (evt) {
      if(parseInt(evt.key) + '' === 'NaN'
          && evt.which !== 8 
          && evt.which !== 9
          && evt.which !== 190 
          && evt.which !== 37 
          && evt.which !== 39) evt.preventDefault()
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
        .then(data => this.$root.articles = data)
    },
    updateArticles (identify) {
      if (this.article.id != '' && this.article.name != '' && this.article.type != '' && this.article.material != '' && this.article.priceunit != '' && this.article.pricewholesale != '') {
        fetch('/api/article/', {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify(this.article)
        })
          .then(res => res.json())
          .then(data => {
            this.$toastr.success('Se ha actualizado satisfactoriamente', 'Updating...')
            this.article.id = ''
            this.article.name = ''
            this.article.type = ''
            this.article.material = ''
            this.article.priceunit = ''
            this.article.pricewholesale = ''
            document.getElementById('insert').style.display = 'none'
            this.getArticles()
          })
      } else this.$toastr.warning('Debes suministrar todos los datos', 'Updating...')
    },
    deleteArticles (identify) {
      fetch('/api/article/' + identify, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
        .then(data => {
          this.getArticles()
          this.$toastr.success('Se ha eliminado satisfactoriamente', 'Deleting...')
        })
    },
    toUpdateArticles (identify) {
      document.getElementById('insert').style.display = 'block'
      fetch('/api/article/' + identify, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          this.toModify = true
          this.article.id = data[0][0]
          this.article.name = data[0][1]
          this.article.type = data[0][2]
          this.article.material = data[0][3]
          this.article.priceunit = data[0][5]
          this.article.pricewholesale = data[0][6]
          this.$toastr.info('Solo puedes modificar lo que se permita', 'Modify')
        })
    },
  }
}
</script>