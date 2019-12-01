<template>
    <b-container>
        <b-navbar id="nav" toggleable="md" type="dark" fixed="top">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand class="titlenav"><router-link to="/" class="rout"><b-img src="imgs/logo.png" class="logo"/>ALLEATHER</router-link></b-navbar-brand>
            <b-collapse is-nav id="nav_collapse menu">
                <b-navbar-nav class="ml-auto t-sha">
                    <b-nav-item class="t-shai" active><router-link to="/" class="rout">Home</router-link></b-nav-item>
                    <b-nav-item class="t-shai" active @click="this.getWishes">
                        <b-img src="imgs/nav/corazon.png" class="icon" v-b-modal.wishes/>
                    </b-nav-item>
                    <b-nav-item class="t-shai" active v-b-modal.shopcart>
                        <b-img src="imgs/nav/carrito.png" class="icon" v-b-modal.shopcart/>
                    </b-nav-item>
                    <b-nav-item-dropdown>
                        <template slot="button-content">
                            <b-img :src=this.$root.credentials[1] class="user"/><a class="decor-a">{{this.$root.credentials[0]}}</a>
                        </template>
                        <b-dropdown-item class="backg rout2" v-if="!this.$session.exists()" @click="this.existSession">Log in</b-dropdown-item>
                        <b-dropdown-item class="backg" v-if="this.$session.exists()"><router-link to="/profile" class="rout2"><b-img :src=this.$root.credentials[1] class="useritem"/><a class="decor-a">Profile</a></router-link></b-dropdown-item>
                        <b-dropdown-item class="backg rout2" v-if="this.$session.exists()" @click="this.logOut">Log out</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2 round" type="text" placeholder="Ex. Jacket" v-model="nameArticle"/>
                        <b-button @click="this.getArcticlebyName" size="sm" class="my-2 my-sm-0 bg-info bt round" type="submit">Search</b-button>
                    </b-nav-form>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-modal id="login" size="lg" hide-footer centered title="Sign In" ref="modalogin"
            :header-bg-variant="headerBgVariant"
            :header-border-variant="headerBorVariant"
            :header-text-variant="headerTextVariant"
            :body-bg-variant="bodyBgVariant"
            :body-text-variant="bodyTextVariant"
            :footer-bg-variant="footerBgVariant"
            :footer-text-variant="footerTextVariant">
            <b-container>
                <b-row class="justify-content-md-center">
                    <b-col col lg="6">
                        <img src="imgs/login.png" class="logologin">
                    </b-col>
                    <b-col col lg="6">
                        <b-form v-if="show">
                            <b-form-group id="exampleInputGroup1"
                                            label="Email address:"
                                            label-for="exampleInput1">
                                <b-form-input id="exampleInput1"
                                            type="email"
                                            v-model="form.email"
                                            required
                                            placeholder="Enter email">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group id="exampleInputGroup2" class="marginbottom"
                                            label="Password:"
                                            label-for="exampleInput2">
                                <b-form-input id="exampleInput2"
                                            type="password"
                                            v-model="form.pass"
                                            required
                                            placeholder="Enter password">
                                </b-form-input>
                                <b-form-checkbox-group id="exampleInputGroup3"
                                                        ref="checkfield"
                                                        class="marginbottom"
                                                        v-model="showPass" 
                                                        @change="this.showPassword">
                                    <b-form-checkbox value="show">show password</b-form-checkbox>
                                </b-form-checkbox-group>
                            </b-form-group>
                        </b-form>
                    </b-col>
                    <b-col col lg="12">
                        <b-button block @click="this.logIn" class="marginbott colornav">Log in</b-button>
                        <b-form-text>You have not yet registered? Do it now.</b-form-text>
                        <router-link to="/pages/register" class="rout"><b-button block @click="this.closeModal" class="marginbott colornav">Register</b-button></router-link>
                    </b-col>
                </b-row>
            </b-container>
        </b-modal>
        <b-modal id="shopcart" size="lg" centered hide-footer title="Your Shopping Cart"
            :header-bg-variant="headerBgVariant"
            :header-border-variant="headerBorVariant"
            :header-text-variant="headerTextVariant"
            :body-bg-variant="bodyBgVariant"
            :body-text-variant="bodyTextVariant"
            :footer-bg-variant="footerBgVariant"
            :footer-text-variant="footerTextVariant">
            <center>
                <template v-for="(shop, i) in this.$root.shoppingcart">
                    <div class="shop2" :key="'art_' + i" :id="'art_' + i">
                        <div class="shop-img">
                            <img :src=shop[8] />
                        </div>
                        <div class="shop-body">
                            <p id="namearticle2">{{shop[1]}} - {{shop[9]}}</p>
                        </div>
                    </div>
                </template>
                <p>Total a pagar: ${{this.$root.total}}</p>
                <b-btn @click="this.registerInvoicewithDetail" class="colornav" block>Buy</b-btn>
            </center>
        </b-modal>
        <b-modal id="wishes" size="lg" hide-footer centered title="Your Wishes"
            :header-bg-variant="headerBgVariant"
            :header-border-variant="headerBorVariant"
            :header-text-variant="headerTextVariant"
            :body-bg-variant="bodyBgVariant"
            :body-text-variant="bodyTextVariant"
            :footer-bg-variant="footerBgVariant"
            :footer-text-variant="footerTextVariant">
            <center>
                <template v-for="(wish, i) in this.$root.wishes">
                    <div class="shop2" :key="'art_' + i" :id="'art_' + i">
                        <div class="shop-img">
                            <img :src=wish[8] />
                        </div>
                        <div class="shop-body">
                            <p id="namearticle2">{{wish[1]}}</p>
                        </div>
                    </div>
                </template>
            </center>
        </b-modal>
    </b-container>
</template>

<style>
    body {
        font-family: 'varela round'
    }
    #nav {
        background-color: #68B0AB;
        box-shadow: 0px 5px 20px rgba(64, 64, 65, 0.5);
        height: 50px
    }
    .logologin {
        margin-right: auto;
        margin-left: auto;
        width: 160px;
        height: 160px
    }
    .backg:hover {
        background-color: rgba(64, 64, 65, 0.9)
    }
    .marginbott {
        margin-bottom: 5px;
    }
    .marginbottom {
        margin-bottom: 35px
    }
    .container {
        width: 80%
    }
    .titlenav {
        font-weight: bolder
    }
    .round {
        border: none;
        border-radius: 20px
    }
    .t-shai:hover {
        text-shadow: 3px 3px 10px rgba(64, 64, 65, 0.5)
    }
    .t-shai {
        margin: 0px
    }
    .icon {
        width: 25px;
        height: 25px
    }
    .logo {
        width: 55px;
        height: 50px;
        margin: 5px
    }
    .icon:hover {
        background-color: rgb(83, 141, 137);
        border-radius: 20px;
        padding: 2px
    }
    .rout {
        color: white;
    }
    .rout2 {
        color: black;
    }
    .rout2:hover {
        text-decoration: none;
        color: white
    }
    .rout:hover {
        text-decoration: none;
        color: white
    }
    .user {
        border-radius: 20px;
        width: 21px;
        height: 25px
    }
    .useritem {
        border-radius: 30px;
        width: 46px;
        height: 50px
    }
    .decor-a {
        margin: 0px 3px
    }
</style>

<script>
export default {
    data: function () {
        return {
            form: {
                email: '',
                pass: ''
            },
            nameArticle: '',
            show: true,
            headerBgVariant: 'dark',
            headerBorVariant: 'dark',
            headerTextVariant: 'light',
            bodyBgVariant: 'light',
            bodyTextVariant: 'dark',
            footerBgVariant: 'light',
            footerTextVariant: 'dark',
            showPass: ''
        }
    },
    created () {
        if (this.$session.exists()) this.$root.credentials = [this.$session.get('credent')[1], this.$session.get('credent')[7]]
        this.debouncedGetArticlebyName = _.debounce(this.getArcticlebyName(), 800)
    },
    watch: {
        nameArticle: function (newName, oldName) {
            this.getArcticlebyName()
            this.debouncedGetArticlebyName()
        }
    },
    methods: {
        registerInvoicewithDetail() {
            if (this.$root.shoppingcart.length > 0) {
                let money = 0
                let detailInvoice = []
                for (let i = 0; i < this.$root.shoppingcart.length; i++) {
                    money += this.$root.shoppingcart[i][6] * this.$root.shoppingcart[i][9]
                    detailInvoice.push({
                        artId: this.$root.shoppingcart[i][0],
                        artCant: this.$root.shoppingcart[i][9]
                    })
                }
                var invoice = {
                    percode: this.$session.get('credent')[0],
                    total: money
                }
                fetch(`/api/invoice/`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(invoice)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.Error) this.$toastr.warning('Surgió un error al efectuar la compra', 'Invoice')
                    })
                    .catch(err => {
                        var articleArray = { detailInvoice }
                        fetch('/api/detail/', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify(articleArray)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
                                if (data.Error) this.$toastr.warning('Surgió un error al efectuar la compra', 'Invoice')
                            })
                            .catch(err => {
                                console.log('Add Detail')
                                this.$root.total = 0
                            })
                            
                        this.$toastr.success('Add successfully', 'Add Invoice')
                        this.$root.shoppingcart = []
                    })
            } else {
                this.$toastr.warning('Tu carrito de compras no tiene articulos', 'Add Invoice')
            }
        },
        getWishes() {
            if (this.$session.exists()) {
                this.$root.wishes = []
                fetch('/api/wish/' + this.$session.get('credent')[0])
                    .then(res => res.json())
                    .then(data => {
                        for (let i = 0; i < data.length; i++) {
                            for (let j = 0; j < this.$root.articles.length; j++) {
                                if (data[i][1] == this.$root.articles[j][0]) {
                                    this.$root.wishes.push(this.$root.articles[j])
                                }
                            }
                        }
                    })
            } else {
                this.$toastr.warning('Debes iniciar sesión para poder efectuar éste proceso', 'Add to Wishes')
            }
        },
        getArcticlebyName () {
            this.$toastr.info('Acabas de buscar articulos relacionados con "' + this.nameArticle + '"', 'Search')
            fetch('/api/article/' + this.nameArticle)
                .then(res => res.json())
                .then(data => {
                    this.$root.articles = data
            })
        },
        existSession () {
            if (!this.$session.exists()) this.$refs.modalogin.show()
        },
        closeModal () {
            this.$refs.modalogin.hide()
        },
        logIn: function () {
            if (this.form.email != '' && this.form.pass != '') {
                /*console.log(this.$store, this.store, this.Store)
                this.$store.dispatch('login', {email: this.form.email, pass: this.form.pass}).then(boo => {
                    console.log(boo, this.$store.getters.userData)
                })
                return*/
                fetch('/api/person/' + this.form.email + '&' + this.form.pass)
                    .then(res => res.json())
                    .then(data => {
                        if (data[0]) {
                            this.$root.credentials = [data[0][1], data[0][7]]
                            this.form.email = ''
                            this.form.pass = ''
                            this.$session.start()
                            this.$session.set('credent', data[0])
                            this.$forceUpdate()
                            this.$toastr.info('Bienvenido ' + this.$root.credentials[0] + ' hace ' + this.$session.get('credent')[11] + ' dias no ingresabas', 'Log in')
                            this.closeModal()
                            return fetch('/api/person/' + data[0][0], {
                                method: 'PUT',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-type': 'application/json'
                                }
                            })
                        } else {
                            this.$toastr.warning('No concuerdan las credenciales', 'Log in')
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log("Estoy en resolve")
                    })
                    .catch(err => {
                        console.log("Última fecha actualizada")
                    })
            } else this.$toastr.warning('Todos los campos son obligatorios', 'Log in')
        },
        logOut () {
            this.$toastr.info('Vuelve pronto ' + this.$root.credentials[0], 'Te extrañaremos')
            this.$session.destroy()
            this.$root.credentials = ['User', 'imgs/nav/user.png']
            this.$forceUpdate()
            this.$router.push('/')
        },
        showPassword () {
            let inputPass = document.querySelector('#exampleInput2')
            if (this.showPass[0] == "show") inputPass.setAttribute("type", "password")
            else inputPass.setAttribute("type", "text")
        }
    }
}
</script>