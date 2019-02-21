<template>
    <div class="container-fluid">
    <h1 class="titulo">Manage Stock</h1>
    <b-row class="justify-content-md-center">
      <b-button @click="this.showInsert" class="colornav insertemp">Add Stock</b-button>
      <b-button @click="this.showAddStock" class="colornav updateemp">To List</b-button>
    </b-row>
    <div id="register" class="container">
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
                  <b-form-select required id="hand-cursor" :options="stock.provider"></b-form-select>
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
                  <b-form-select required id="hand-cursor" :options="stock.color"></b-form-select>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Size</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-select :options="stock.size"></b-form-select>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Quantity</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input required type="text" class="form-control" placeholder="Ex. 30 units" v-model="stock.quant"/>
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Price</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input required type="text" class="form-control" placeholder="Ex. $200" v-model="stock.price"/>
                </b-input-group>
             
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>Image</b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-file id="hand" accept=".jpg, .jpeg" placeholder="Choose a file..." v-model="stock.image"></b-form-file>
                </b-input-group>

                <b-button class="colornav" block >Add Stock</b-button>
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
                <td v-if="updateisOpened"><b-button variant="info" @click="toUpdateArticles(art[0])">Generate Stock</b-button></td>
              </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<style>
  #register {
    display: none
  }
</style>

<script>
export default {
    data: function () {
        return {
            stock: {
                provider: [],
                article: '',
                color: [],
                size: [],
                quant: '',
                price: '',
                image: ''
            },
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
            this.getCategories()
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
        showInsert () {
            this.insertisOpened = true
            this.updateisOpened = false
            this.deleteisOpened = false
            this.selectisOpened = false
            document.getElementById('insert').style.display = 'block'
            document.getElementById('select').style.display = 'none'
        },
        showAddStock () {
            this.insertisOpened = false
            this.updateisOpened = true
            this.deleteisOpened = false
            this.selectisOpened = false
            document.getElementById('insert').style.display = 'none'
            document.getElementById('select').style.display = 'block'
        }
    }
}
</script>
