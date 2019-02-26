<template>
    <b-container fluid>
        <b-carousel id="carousel1"
                controls
                indicators
                :interval="2000"
                img-width="1024"
                img-height="480"
                background="#ababab"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd">
            <b-carousel-slide img-src="imgs/background/back2.jpg">
                <h1 class="solo">You choose the best option!</h1>
            </b-carousel-slide>
            <b-carousel-slide img-src="imgs/background/back1.jpg">
                <h1 class="solo">Your security for us counts!</h1>
            </b-carousel-slide>
        </b-carousel>
        <br><br>
        <b-row>
            <b-col sm="9" lg="9" xl="9">
                <template v-for="(art, i) in this.$root.articles">
                    <div class="shop" :key="'art_' + i" :id="'art_' + i">
                        <div class="shop-img">
                            <img :src=art[8] />
                        </div>
                        <div class="shop-body">
                            <center><p id="namearticle">{{art[1]}}</p></center>
                        </div>
                        <b-popover triggers="hover click" :target="'art_' + i">
                            <template slot="title">{{art[1]}}</template>
                            <div>
                                <p class="letraglobalsinnegrita"><strong>Description</strong><br>{{art[2]}}<br>
                                    <strong>Type</strong><br>{{art[3]}}<br>
                                    <strong>Material</strong><br>{{art[4]}}<br>
                                    <strong>Size</strong><br>{{art[5]}}<br>
                                    <strong>Unit Price</strong><br>$ {{art[6]}}<br>
                                    <strong>Wholesale price</strong><br>$ {{art[7]}}<br>
                                </p>
                                <b-input-group class="mb-3">
                                    <b-input-group-prepend>
                                        <b-input-group-text>Quantity</b-input-group-text>
                                    </b-input-group-prepend>
                                    <b-form-input required type="number" class="form-control" placeholder="Ex. 12" min="1" v-model="quantity" />
                                </b-input-group>
                                <b-btn @click="addShoppingCart(art)" size="sm" class="colornav"><img class="iconsown" src="imgs/icons/carrito.png"></b-btn>
                                <b-btn @click="addWishes(art[0])" size="sm" class="colornav"><img class="iconsown" src="imgs/icons/deseo.png"></b-btn>
                                <b-btn id="buttonbuy" class="colornav letraglobal" @click="registerInvoice(art[0])">Buy</b-btn>
                            </div>
                        </b-popover>
                    </div>
                </template>
                <div class="flex-row align-items-center page noart" v-if="this.$root.articles.length == 0">
                    <div class="container">
                        <b-row class="justify-content-center">
                            <b-col md="6">
                                <div class="clearfix">
                                    <h2 class="float-left display-4 pt-3">Oops! We're sorry.</h2>
                                    <h3 class="text-muted">No articles found for the moment.</h3>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                </div>
            </b-col>
            <b-col sm="3" lg="3" xl="3">
                <b-container fluid>
                    <img width="100%" height="800px" src="imgs/articles/default.jpg">
                </b-container>
            </b-col>
        </b-row>
        <br><br>
        <router-view/>
    </b-container>
</template>

<style>
    .letraglobal {
        font-family: "varela round";
        color: black;
        font-weight: bolder;
        font-size: 15px
    }
    .letraglobalsinnegrita {
        font-family: "varela round";
        color: black;
        font-size: 15px
    }
    .iconsown {
        width: 40px;
        height: 40px;
    }
    #namearticle {
        font-family: "varela round";
        font-size: 15px
    }
    #namearticle2 {
        font-family: "varela round";
        font-size: 10px;
        text-align: center
    }
    .noart {
        margin: 10px !important
    }
    .cont {
        margin-top: 50px
    }
    .tarjeta {
        font-family: 'varela round';
        font-size: 22px;
        color: white !important;
    }
    .shop {
        position: relative;
        overflow: hidden;
        margin: 10px;
        height: 220px;
        width: 220px;
        box-shadow: 1px 1px 15px rgba(64, 64, 65, 0.8);
        z-index: 0;
        color: rgb(72, 75, 75);
        display: inline-block;
        border-radius: 8px
    }
    .shop2 {
        position: relative;
        overflow: hidden;
        margin: 5px;
        height: 120px;
        width: 120px;
        box-shadow: 1px 1px 15px rgba(64, 64, 65, 0.8);
        z-index: 0;
        color: rgb(72, 75, 75);
        display: inline-block;
        border-radius: 8px
    }
    .shop .shop-img {
        position: relative;
        background-color: rgb(54, 54, 54);
        z-index: -1
    }
    .shop .shop-img > img {
        width: 100%;
        height: 100%;
        -webkit-transition: 0.2s all;
        transition: 0.2s all;
    }
    .shop2 .shop-img > img {
        width: 100%;
        height: 100%;
        -webkit-transition: 0.2s all;
        transition: 0.2s all;
    }
    .shop-img {
        height: 90%;
    }
    .shop-body {
        height: 10%;
        color: white;
        background-color: #68b0ab
    }
    .shop:hover {
        cursor: pointer;
    }
    .solo {
        text-shadow: 6px 6px 10px rgb(18, 19, 19);
    }
</style>

<script>
export default {
    created () {
        this.getArticles()
    },
    data: function () {
        return {
            slide: 0,
            sliding: null,
            quantity: 1
        }/*Por favor señor sistema necesitamos que se facture y se descuente*/
    },
    methods: {
        registerInvoice(article) {
            let money = 0
            for (let i = 0; i < this.$root.shoppingcart.length; i++) {
                money += this.$root.shoppingcart[6] * this.$root.shoppingcart[9]
            }
            fetch('/api/invoice/', + 1 + '&' + this.$session.get('credent')[0] + '&' + money)
                .then(res => res.json())
                .then(data => {
                    this.$toastr.info('Successfully', 'Add Invoice')
                })
        },
        search (article) {
            var found = false
            for (let i = 0; i < this.$root.shoppingcart.length; i++) {
                if (this.$root.shoppingcart[i][0] == article) {
                    found = true
                    break
                }
            }
            return found
        },
        addShoppingCart (article) {
            if (this.$session.exists()) {
                if (!this.search(article[0])) {
                    article[9] = this.quantity
                    this.$root.shoppingcart.push(article)
                    this.quantity = 1
                    this.$toastr.success('Add successfully', 'Add to Shopping Cart')
                } else this.$toastr.warning('Already exist in your shopping cart', 'Add to Shopping Cart')
            } else this.$toastr.warning('Debes iniciar sesión para poder efectuar éste proceso', 'Add to Wishes')
        },
        addWishes(artid) {
            if (this.$session.exists()) {
                fetch('/api/wish/' + this.$session.get('credent')[0] + '&' + artid, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        this.$toastr.error('This article you already like', 'Add to Wishes')
                    })
                    .catch(err => {
                        this.$toastr.success('Add successfully', 'Add to Wishes')
                        this.getWishes()
                    })
            } else {
                this.$toastr.warning('Debes iniciar sesión para poder efectuar éste proceso', 'Add to Wishes')
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
        onSlideStart (slide) {
            this.sliding = true
        },
        onSlideEnd (slide) {
            this.sliding = false
        },
        getArticles () {
            fetch('/api/article')
                .then(res => res.json())
                .then(data => {
                    this.$root.articles = data
                })
        }
    }
}
</script>