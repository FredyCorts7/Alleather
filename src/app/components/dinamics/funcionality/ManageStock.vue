<template>
    <div class="container-fluid">
    <h1 class="titulo">Manage Stock</h1>
    <b-row class="justify-content-md-center">
      <b-button @click="this.showArticles" class="colornav updateemp">To List</b-button>
    </b-row>
    <div id="registerStock" class="container">
      <b-row class="justify-content-center">
        <b-col>
          <b-card no-body class="bg-dark regis">
            <b-card-body class="p-4">
              <b-form>
                <h1>Register Stock</h1>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Provider</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-select required class="hand-cursor" v-model="stock.provider" :options="provider"></b-form-select>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Article</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input :disabled=this.toModify required type="text" class="form-control" v-model="stock.article"/>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Color</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-select required class="hand-cursor" v-model="stock.color" :options="color"></b-form-select>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Size</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-select class="hand-cursor" v-model="stock.size" :options="size"></b-form-select>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Quantity</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input required type="number" class="form-control" placeholder="Ex. 30 units" v-model="stock.quant"/>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Price</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input required type="number" class="form-control" placeholder="Ex. $200" v-model="stock.price"/>
                </b-input-group>
             
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Image</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-file id="hand" accept=".jpg, .jpeg" placeholder="Choose a file..." v-model="image"></b-form-file>
                </b-input-group>

                <b-button class="colornav" block @click="this.insertStock">Add Stock</b-button>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <div id="listArticles" class="justify-content-md-center manageemp">
      <!--<b-table outlined bordered hover :items="employees"></b-table>-->
        <table class="table table-bordered table-outlined table-striped tabla table-responsive">
            <thead>
              <tr class="theader">
                <th>Name</th>
                <th>Type</th>
                <th>Categorie</th>
                <th>Material</th>
                <th>Price Unit</th>
                <th>Price Wholesale</th>
                <th>Description</th>
                <th>Quantity Minimum</th>
                <th v-if="updateisOpened">Add Stock</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="art of this.articles" :key="art">
                <td>{{art[1]}}</td>
                <td>{{art[2]}}</td>
                <td>{{art[3]}}</td>
                <td>{{art[4]}}</td>
                <td>{{art[5]}}</td>
                <td>{{art[6]}}</td>
                <td>{{art[7]}}</td>
                <td>{{art[8]}}</td>
                <td><b-button variant="info" @click="showInsert(art[0])">Generate Stock</b-button></td>
              </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<style>
  .hand-cursor {
    cursor: pointer
  }
  #registerStock {
    display: none
  }
</style>

<script>
export default {
    data: function () {
        return {
            stock: {
                provider: '',
                article: '',
                color: '',
                size: '',
                quant: '',
                price: '',
            },
            provider: [
              {value: '', text: 'Choose an option...'}
            ],
            color: [
              {value: '', text: 'Choose an option...'}
            ],
            size: [
              {value: '', text: 'Choose an option...'}
            ],
            image: '',
            articles: [],
            insertisOpened: false,
            updateisOpened: true,
            toModify: false
        }
    },
    created () {
        if (!this.$session.exists()) {
          this.$router.push('/')
          this.$toastr.warning('No tiene el permiso para acceder a éste recurso')
        } else{
          this.getArticles()
          this.getSizes()
          this.getColors()
          this.getProviders()
        }
    },
    methods: {
        getArticles () {
          fetch('/api/categorie',  {  
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-type': 'application/json'
              }
          })
              .then(res => res.json())
              .then(data => this.articles = data)
        },
        validarSoloNumeros (evt) {
          if(parseInt(evt.key) + '' === 'NaN'
              && evt.which !== 8 
              && evt.which !== 9
              && evt.which !== 190 
              && evt.which !== 37 
              && evt.which !== 39) evt.preventDefault()
        },
        showInsert ( identify ) {
          this.toModify = true
          this.stock.article = identify
          document.getElementById('registerStock').style.display = 'block'
          document.getElementById('listArticles').style.display = 'none'
        },
        insertStock () {
          if (this.stock.provider != '' && this.stock.article != '' && this.stock.color != '' && this.stock.size != '' && this.stock.quant != '' && this.stock.price != '' && this.image) {
            this.stock.image = this.image.name
            fetch('/api/stock',  {
              method: 'POST', 
              headers: {
                  'Accept': 'application/json',
                  'Content-type': 'application/json'
              },
              body: JSON.stringify(this.stock)
            })
              .then(res => res.json())
              .then(data => {
                if (data.Error) this.$toastr.danger('Algo ha salido mal', 'Add Stock')
              })
              .catch(err => {
                this.stock.provider = ''
                this.stock.article = ''
                this.stock.color = ''
                this.stock.size = ''
                this.stock.quant = ''
                this.stock.price = ''
                document.getElementById('registerStock').style.display = 'none'
                document.getElementById('listArticles').style.display = 'block'
                this.$toastr.success('Register stock succesfully', 'Add Stock')
              })
          } else {
            this.$toastr.warning('Debes llenar todos los datos del stock', 'Add Stock')
          }
        },
        showArticles () {
          document.getElementById('registerStock').style.display = 'none'
          document.getElementById('listArticles').style.display = 'block'
        },
        getSizes() {
          fetch('/api/size/')
            .then(res => res.json())
            .then(data => {
              for (let i = 0; i < data.length; i++) {
                this.size.push({value: data[i][0], text: data[i][1]})
              }
            })
        },
        getColors() {
          fetch('/api/color/')
            .then(res => res.json())
            .then(data => {
              for (let i = 0; i < data.length; i++) {
                this.color.push({value: data[i][0], text: data[i][1]})
              }
            })
        },
        getProviders() {
          fetch('/api/provider/')
            .then(res => res.json())
            .then(data => {
              for (let i = 0; i < data.length; i++) {
                this.provider.push({value: data[i][0], text: data[i][1]})
              }
            })
        }
    }
}
</script>