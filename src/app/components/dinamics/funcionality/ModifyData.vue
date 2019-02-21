<template>
    <div class="flex-row align-items-center">
        <b-container class="reg">
        <h1 class="titulo">Profile</h1>
        <b-row class="justify-content-center">
            <b-button @click="this.showModifyPhones" class="colornav modifyper">Modify</b-button>
            <b-button @click="this.showInsertPhones" class="colornav insertpho">Add Phones</b-button>
            <b-button @click="this.showListPhones" class="colornav selectpho">To List Phones</b-button>
        </b-row>
        <b-row class="justify-content-center">
            <div id="insert" class="container">
                <b-card no-body class="bg-dark regis">
                    <b-card-body class="p-4">
                    <b-form>
                        <h1 v-if="this.showModify">Modify Data</h1>
                        <h1 v-if="this.showAddPhones">Add Phones</h1>
                        <b-input-group class="mb-3" v-if="this.showModify">
                        <b-input-group-prepend>
                            <b-input-group-text>Identify code</b-input-group-text>
                        </b-input-group-prepend>
                        <b-form-input disabled @keydown.native="validarSoloNumeros" required type="text" class="form-control" placeholder="Ex. 1090123861" v-model="person.code"/>
                        </b-input-group>

                        <b-input-group class="mb-3" v-if="this.showModify">
                        <b-input-group-prepend>
                            <b-input-group-text>Name</b-input-group-text>
                        </b-input-group-prepend>
                        <b-form-input required type="text" class="form-control" placeholder="Ex. George" v-model="person.name"/>
                        </b-input-group>

                        <b-input-group class="mb-3" v-if="this.showModify">
                        <b-input-group-prepend>
                            <b-input-group-text>Surname</b-input-group-text>
                        </b-input-group-prepend>
                        <b-form-input required type="text" class="form-control" placeholder="Ex. Cortés" v-model="person.surname"/>
                        </b-input-group>

                        <b-input-group class="mb-3" v-if="this.showModify">
                        <b-input-group-prepend>
                            <b-input-group-text>Sex</b-input-group-text>
                        </b-input-group-prepend>
                        <b-form-select required id="hand-cursor" v-model="person.sex" :options="options"></b-form-select>
                        </b-input-group>

                        <b-input-group class="mb-3" v-if="this.showModify">
                        <b-input-group-prepend>
                            <b-input-group-text>Email</b-input-group-text>
                        </b-input-group-prepend>
                        <b-form-input required type="text" class="form-control" placeholder="Ex. example@gmail.com" v-model="person.email"/>
                        </b-input-group>

                        <b-input-group class="mb-3" v-if="this.showModify">
                        <b-input-group-prepend>
                            <b-input-group-text>Password</b-input-group-text>
                        </b-input-group-prepend>
                        <b-form-input required type="password" class="form-control" placeholder="Password" v-model="person.pass"/>
                        </b-input-group>

                        <b-input-group class="mb-3" v-if="this.showModify">
                        <b-input-group-prepend>
                            <b-input-group-text>Birthday</b-input-group-text>
                        </b-input-group-prepend>
                        <b-form-input type="date" class="form-control" v-model="person.birth"/>
                        </b-input-group>

                        <b-input-group class="mb-3" v-if="this.showModify">
                        <b-input-group-prepend>
                            <b-input-group-text>Perfil image</b-input-group-text>
                        </b-input-group-prepend>
                        <b-form-file id="hand" accept=".jpg, .jpeg" placeholder="Choose a file..." v-model="image"></b-form-file>
                        </b-input-group>

                        <b-input-group class="mb-3" v-if="this.showModify">
                        <b-input-group-prepend>
                            <b-input-group-text>Address</b-input-group-text>
                        </b-input-group-prepend>
                        <b-form-input required type="text" class="form-control" placeholder="Ex. Cll 22A #4-55 Ceiba" v-model="person.address"/>
                        </b-input-group>

                        <b-input-group class="mb-3" v-if="this.showAddPhones">
                            <b-input-group-prepend>
                            <b-input-group-text>Telefono Celular</b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input @keydown.native="validarSoloNumeros" required type="text" class="form-control" placeholder="Ex. 3148456587" v-model="telcel"/>
                        </b-input-group>

                        <b-input-group class="mb-3" v-if="this.showAddPhones">
                            <b-input-group-prepend>
                            <b-input-group-text>Telefono Fijo</b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input @keydown.native="validarSoloNumeros" required type="text" class="form-control" placeholder="Ex. 5712334" v-model="telfij"/>
                        </b-input-group>

                        <b-button v-if="this.showModify" class="colornav" block @click="this.modifyPerson">Modify Data</b-button>
                        <b-button v-if="this.showAddPhones" class="colornav" block @click="this.addPhones">Insert Phones</b-button>
                    </b-form>
                    </b-card-body>
                </b-card>
            </div>
         </b-row>
            <b-row class="justify-content-center">
                <div id="select" class="justify-content-md-center manageemp">
                <table class="table table-bordered table-outlined table-striped tabla table-responsive">
                    <thead>
                    <tr class="theader">
                        <th>Phone Number</th>
                        <th>Phone Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="pho of phones" :key="pho">
                        <td>{{pho[0]}}</td>
                        <td>{{pho[1]}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            </b-row>
        </b-container>
    </div>
</template>

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
                rolid: 3,
                image: 'default.png'
            },
            telcel: '',
            telfij: '',
            phones: [],
            showModify: true,
            showAddPhones: false,
            image: null,
            options: [
                {value: '', text: 'Choose your sex...'},
                {value: 'Femenino', text: 'Femenino'},
                {value: 'Masculino', text: 'Masculino'},
                {value: 'Indefinido', text: 'Indefinido'}
            ]
        }
    },
    created() {
        if (!this.$session.exists()) {
            this.$router.push('/')
            this.$toastr.warning('No tiene el permiso para acceder a éste recurso')
        } else {
            this.$toastr.info('Solo puedes modificar lo que se te permita', 'Modify')
            this.person.code = this.$session.get('credent')[0]
            this.person.name = this.$session.get('credent')[1]
            this.person.surname = this.$session.get('credent')[2]
            this.person.sex = this.$session.get('credent')[3]
            this.person.email = this.$session.get('credent')[4]
            this.person.pass = this.$session.get('credent')[5]
            this.person.address = this.$session.get('credent')[8]
            this.getPhones()
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
        showModifyPhones () {
            this.showModify = true
            this.showAddPhones = false
            document.getElementById('insert').style.display = 'block'
            document.getElementById('select').style.display = 'none'
        },
        showInsertPhones () {
            this.showModify = false
            this.showAddPhones = true
            document.getElementById('insert').style.display = 'block'
            document.getElementById('select').style.display = 'none'
        },
        showListPhones () {
            document.getElementById('insert').style.display = 'none'
            document.getElementById('select').style.display = 'block'
        },
        addPhones () {
            if (this.telcel != '') {
                fetch('/api/phone_per/' + this.$session.get('credent')[0] + '&' + this.telcel + '&' + 0, { // metodo para agregar telefonos celulares tipo 0 "0"
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                    .then(data => {
                        console.log(data)
                        this.$toastr.info('Phone succesfully registered', 'Add')
                        this.getPhones()
                    })
            }
            if (this.telfij != '') {
                fetch('/api/phone_per/' + this.$session.get('credent')[0] + '&' + this.telfij + '&' + 1, { //metodo para agregar telefonos fijos tipo 1
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                    .then(data => {
                        console.log(data)
                        this.$toastr.info('Phone succesfully registered', 'Add')
                        this.getPhones()
                    })
            }
        },
        modifyPerson () {
            this.showModify = true
            this.showAddPhones = false
            this.showListPhones = false
            if (this.person.code != '' && this.person.name != '' && this.person.surname != '' && this.person.sex != '' && this.person.email != '' && this.person.birth != '' && this.person.address != '') {
                if (this.image != undefined || this.image != null) this.person.image = this.image.name
                fetch('/api/person/', {
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
                        this.$toastr.info('successfully modified', 'Modify')
                        this.person.code = ''
                        this.person.name = ''
                        this.person.surname = ''
                        this.person.sex = ''
                        this.person.email = ''
                        this.person.pass = ''
                        this.person.birth = ''
                        this.person.address = ''
                        this.person.image = 'default.png'
                        this.$session.destroy()
                        this.$router.push('/')
                        this.$toastr.warning('Se te ha expulsado de la sesión porque modificaste tus propios datos', 'Session')
                    })
            } else this.$toastr.warning('Debes suministrar todos los datos', 'Register')
        },
        getPhones () {
            fetch('/api/phone_per/' + this.$session.get('credent')[0])
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.phones = data
                })
        }
    }
}
</script>
