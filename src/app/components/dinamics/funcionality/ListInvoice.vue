<template>
  <div class="container-fluid">
    <h1 class="titulo">List Invoices</h1>
    <div id="listArticles" class="justify-content-md-center manageemp">
      <!--<b-table outlined bordered hover :items="employees"></b-table>-->
        <table class="table table-bordered table-outlined table-striped tabla table-responsive">
            <thead>
              <tr class="theader">
                <th># de Factura</th>
                <th>Fecha de Pago</th>
                <th>Total Cancelado</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="invo of this.invoices" :key="invo">
                <td>{{invo[0]}}</td>
                <td>{{invo[1]}}</td>
                <td>{{invo[2]}}</td>
                <td><b-button variant="info" @click="showDetail(invo[0])" v-b-modal.details>Mostrar Detalle</b-button></td>
              </tr>
            </tbody>
        </table>
    </div>
    <b-modal id="details" size="lg" hide-footer centered title="Detalle Factura"
        :header-bg-variant="headerBgVariant"
        :header-border-variant="headerBorVariant"
        :header-text-variant="headerTextVariant"
        :body-bg-variant="bodyBgVariant"
        :body-text-variant="bodyTextVariant"
        :footer-bg-variant="footerBgVariant"
        :footer-text-variant="footerTextVariant">
        <center>
            <table class="table table-bordered table-outlined table-striped tabla table-responsive">
              <thead>
                <tr class="theader">
                  <th>Código</th>
                  <th>Categoría</th>
                  <th>Artículo</th>
                  <th>Descripción</th>
                  <th>Proveedor</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="deta of this.detail" :key="deta">
                  <td>{{deta[0]}}</td>
                  <td>{{deta[1]}}</td>
                  <td>{{deta[2]}}</td>
                  <td>{{deta[3]}}</td>
                  <td>{{deta[4]}}</td>
                  <td>{{deta[5]}}</td>
                  <td>{{deta[6]}}</td>
                </tr>
              </tbody>
          </table>
        </center>
    </b-modal>
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
  {key: '0', label: '# de Factura'},
  {key: '1', label: 'Fecha de Pago'},
  {key: '2', label: 'Total Pagado'},
  {key: 'show', label: 'Detalle Factura'}
]

export default {
    data: function () {
      return {
        fieldsInvoices: FIELDS_NO_OPENED,
        invoices: [],
        detail: []
      }
  },
  created() {
    if (!this.$session.exists()) {
      this.$router.push('/')
      this.$toastr.warning('No tiene el permiso para acceder a éste recurso')
    } else this.getInvoices()
  },
  methods: {    
    getInvoices () {
      fetch('/api/invoice/' + this.$session.get('credent')[0])
        .then(res => res.json())
        .then(data => {
          this.invoices = data
          console.log(this.invoices)
        })
    },
    showDetail(invId) {
      fetch('/api/detail/' + invId)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          this.detail = data
        })
    }
  }
}
</script>