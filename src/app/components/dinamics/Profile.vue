<template>
    <div class="flex-row align-items-center page">
        <div class="container">
            <b-row class="justify-content-center">
                <b-col md="6">
                    <div class="clearfix">
                        <h1 class="float-left display-3 mr-4">Your Profile</h1>
                        <h4 class="pt-3">Thanks for your services</h4>
                        <p class="text-muted">The functionalities you can see in the top lateral nav.</p>
                    </div>
                </b-col>
            </b-row>
        </div>
        <input type="checkbox" class="checkbox" id="check">
        <label class="menu" for="check">|||</label>
        <div class="left-panel">
            <ul >
                <router-link to="/" class="rout"><li class="items" v-for="p of fun"><img :src=p[1] />{{p[0]}}</li></router-link>
            </ul>
        </div>
    </div>
</template>

<style>
    .profile {
        font-family: 'varela round'
    }
    .menu {
        width: 1.8rem;
        height: 3.1rem;
        background-color: rgba(64, 64, 65, 0.9);
        border-radius: 0 0.5rem 0.5rem 0;
        position: fixed;
        top: 50px;
        left: 0%;
        font-size: 2rem;
        color: white;
        text-align: center;
        transition: left 0.4s;
        z-index: 2000;
    }
    .menu:hover {
        cursor: pointer
    }
    .checkbox:checked ~ .menu {
        left: 14rem;
        border-radius: 0 0.5rem 0.5rem 0;
    }
    .left-panel {
        background:  -webkit-linear-gradient(#404041e6,#404041e6,#404041e6);
        background: -o-linear-gradient(#404041e6, #404041e6, #404041e6);
        background: linear-gradient(#404041e6, #404041e6,#404041e6);
        position: fixed;
        top: 0;
        left: -14rem;
        width: 14rem;
        height: 100%;
        display: flex;
        align-items: center;
        transition: left 0.4s;
        z-index: 2000;
    }
    .checkbox:checked ~ .left-panel {
        left: 0;
    }
    .checkbox {
        display: none;
        z-index: 5000
    }
    ul .items {
        color: #F7F7F7;
        text-decoration: none;

    }
    .items {
        list-style: none;
        font-size: 1.5rem;
        text-align: center;
        padding: 0 0.5rem;
        display:block !important
    }
    .items:hover {
        color: white;
        border: solid #68B0AB;
        border-width: 0 0 0 5px;
        cursor: pointer;
    }
    
</style>

<script>
export default {
    data: function () {
        return {
            fun: []
        }
    },
    created() {
        this.getFunctionality()
    },
    methods: {
        getFunctionality () {
            fetch('/api/functionality/')
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.fun = data
                })
        }
    }
}
</script>