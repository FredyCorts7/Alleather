<template>
    <b-container>
        <b-navbar id="nav" toggleable="md" type="dark" fixed="top">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand class="titlenav"><router-link to="/" class="rout"><b-img src="imgs/logo.png" class="logo"/>ALLEATHER</router-link></b-navbar-brand>
            <b-collapse is-nav id="nav_collapse menu">
                <b-navbar-nav class="ml-auto t-sha">
                    <b-nav-form>
                        <b-nav-item class="t-shai" active><router-link to="/" class="rout">Home</router-link></b-nav-item>
                        <b-nav-item class="t-shai" active>
                            <b-img src="imgs/nav/corazon.png" class="icon"/>
                        </b-nav-item>
                        <b-nav-item class="t-shai" active>
                            <b-img src="imgs/nav/carrito.png" class="icon"/>
                        </b-nav-item>
                        <b-nav-item-dropdown>
                            <template slot="button-content">
                                <b-img :src=this.$root.credentials[1] class="user"/><a class="decor-a">{{this.$root.credentials[0]}}</a>
                            </template>
                            <b-dropdown-item class="backg rout2" v-if="!this.$session.exists()" @click="this.existSession">Log in</b-dropdown-item>
                            <b-dropdown-item class="backg" v-if="this.$session.exists()"><router-link to="/profile" class="rout2"><b-img :src=this.$root.credentials[1] class="useritem"/><a class="decor-a">Profile</a></router-link></b-dropdown-item>
                            <b-dropdown-item class="backg rout2" v-if="this.$session.exists()" @click="this.logOut">Log out</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-form-input size="sm" class="mr-sm-2 round" type="text" placeholder="Ex. Jacket" v-model="nameArticle"/>
                        <b-button @click="this.getArcticlebyName" size="sm" class="my-2 my-sm-0 bg-info bt round" type="submit">Search</b-button>
                    </b-nav-form>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-modal id="login" hide-footer centered title="Log in" ref="modalogin"
            :header-bg-variant="headerBgVariant"
            :header-border-variant="headerBorVariant"
            :header-text-variant="headerTextVariant"
            :body-bg-variant="bodyBgVariant"
            :body-text-variant="bodyTextVariant"
            :footer-bg-variant="footerBgVariant"
            :footer-text-variant="footerTextVariant">
            <b-container class="container">
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
                    </b-form-group>
                    <b-button block @click="this.logIn" variant="info" class="marginbott">Log in</b-button>
                    <b-form-text>You have not yet registered? Do it now.</b-form-text>
                    <router-link to="/pages/register" class="rout"><b-button block variant="info" @click="this.closeModal" class="marginbott">Register</b-button></router-link>
                </b-form>
            </b-container>
        </b-modal>
    </b-container>
</template>

<style>
    #nav {
        background-color: #68B0AB;
        font-family: 'varela round';
        box-shadow: 0px 5px 20px rgba(64, 64, 65, 0.5);
        height: 50px
    }
    #login {
        font-family: 'varela round'
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
            footerTextVariant: 'dark'
        }
    },
    created () {
        if (this.$session.exists()) this.$root.credentials = this.$session.get('credent')
    },
    methods: {
        getArcticlebyName () {
            this.$toastr.info('Acabas de buscar articulos relacionados con "' + this.nameArticle + '"', 'Search')
            fetch('/api/article/' + this.nameArticle)
                .then(res => res.json())
                .then(data => {
                    this.$root.articles = data
                    this.nameArticle = ''
            })
        },
        existSession () {
            if (!this.$session.exists()) this.$refs.modalogin.show()
        },
        closeModal () {
            this.$refs.modalogin.hide()
        },
        logIn () {
            if (this.form.email != '' && this.form.pass != '') {
                fetch('/api/person/' + this.form.email + '&' + this.form.pass)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data[0])
                        if (data[0]) {
                            this.$root.credentials = data[0]
                            this.form.email = ''
                            this.form.pass = ''
                            this.$session.start()
                            this.$session.set('credent', this.$root.credentials)
                            this.$forceUpdate()
                            this.$toastr.info('Bienvenido ' + this.$root.credentials[0], 'Log in')
                            this.closeModal()
                        } else {
                            this.$toastr.warning('No concuerdan las credenciales', 'Log in')
                        }
                })
            } else this.$toastr.warning('Todos los campos son obligatorios', 'Log in')
        },
        logOut () {
            this.$toastr.info('Vuelve pronto ' + this.$root.credentials[0], 'Te extrañaremos')
            this.$session.destroy()
            this.$root.credentials = ['User', 'imgs/nav/user.png']
            this.$forceUpdate()
        },
    }
}
</script>