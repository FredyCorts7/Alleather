<template>
    <div>
        <b-carousel id="carousel1" class="cont"
                controls
                indicators
                :interval="3000"
                img-width="1024"
                img-height="480"
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
        <center>
        <template v-for="(art, i) in this.$root.articles">
            <div class="shop" :key="'art_' + i" :id="'art_' + i">
                <div class="shop-img">
                    <img :src=art[8] />
                </div>
                <div class="shop-body">
                    <p id="namearticle">{{art[1]}}</p>
                </div>
                <b-popover triggers="hover" :target="'art_' + i" :header-bg-variant="info">
                    <template slot="title">{{art[1]}}</template>
                    <div>
                        <p class="letraglobalsinnegrita"><strong>Description</strong><br>{{art[2]}}<br>
                            <strong>Type</strong><br>{{art[3]}}<br>
                            <strong>Material</strong><br>{{art[4]}}<br>
                            <strong>Size</strong><br>{{art[5]}}<br>
                            <strong>Unit Price</strong><br>{{art[6]}}<br>
                            <strong>Wholesale price</strong><br>{{art[7]}}<br>
                        </p>
                        <b-btn size="sm" class="colornav"><img class="iconsown" src="imgs/icons/carrito.png"></b-btn>
                        <b-btn size="sm" class="colornav"><img class="iconsown" src="imgs/icons/deseo.png"></b-btn>
                        <b-btn size="sm" class="colornav letraglobal">Buy</b-btn>
                    </div>
                </b-popover>
            </div>  
        </template>
        </center>
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
        <router-view/>
    </div>
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
        font-size: 10px;
        color: rgb(72, 75, 75);
        display: inline-block;
        border-radius: 8px
    }
    .shop .shop-img {
        position: relative;
        background-color: rgb(54, 54, 54);
        z-index: -1
    }
    .shop .shop-img>img {
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
        }
    },
    methods: {
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
                    console.log(this.$root.articles)
                })
        },
    }
}
</script>