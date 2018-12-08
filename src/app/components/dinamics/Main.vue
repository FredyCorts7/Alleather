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
            <!-- Slides with custom text -->
            <b-carousel-slide img-src="imgs/background/back2.jpg">
                <h1>Hello world!</h1>
            </b-carousel-slide>
            <!-- Slides with image only -->
            <b-carousel-slide img-src="imgs/background/back1.jpg">
            </b-carousel-slide>
        </b-carousel>
        <div class="container">
			<div class="row">
				<div class="col-md-4 col-xs-6" v-for="art in this.$root.articles" :key="art">
					<div class="shop">
						<div class="shop-img">
							<img :src=art[6] />
						</div>
						<div class="shop-body">
							<h3>{{art[1]}}<br>{{art[2]}}</h3>
							<a class="cta-btn">{{art[4]}}<i class="fa fa-arrow-circle-right"></i></a>
						</div>
					</div>
				</div>
			</div>
		</div>
        <router-view/>
    </div>
</template>

<style>
    .cont {
        margin-top: 50px
    }
    .shop {
        font-family: 'varela round';
        position: relative;
        overflow: hidden;
        margin: 15px 0px;
        border-radius: 14px;
        height: 350px;
        box-shadow: 6px 6px 25px rgba(64, 64, 65, 0.8)
    }

    .shop::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0px;
        width: 60%;
        background: #68B0AB;
        opacity: 0.8;
        -webkit-transform: skewX(-45deg);
        -ms-transform: skewX(-45deg);
        transform: skewX(-45deg);
    }

    .shop:hover::before {
        visibility: hidden;
    }

    .shop::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 1px;
        width: 100%;
        background: #68B0AB;
        opacity: 0.8;
        -webkit-transform: skewX(-45deg) translateX(-100%);
        -ms-transform: skewX(-45deg) translateX(-100%);
        transform: skewX(-45deg) translateX(-100%);
    }

    .shop:hover::after {
        visibility: hidden;
    }

    .shop .shop-img {
        position: relative;
        background-color: #E4E7ED;
        z-index: -1;
    }

    .shop .shop-img>img {
        width: 100%;
        -webkit-transition: 0.2s all;
        transition: 0.2s all;
    }

    .shop:hover .shop-img>img {
        -webkit-transform: scale(1.1);
        -ms-transform: scale(1.1);
        transform: scale(1.1);
    }

    .shop:hover {
        cursor: pointer;
    }

    .shop .shop-body {
        position: absolute;
        top: 0;
        width: 75%;
        padding: 30px;
        z-index: 10;
    }

    .shop .shop-body h3 {
        color: #FFF;
    }

    .shop .shop-body .cta-btn {
        color: #FFF;
        text-transform: uppercase;
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
        }
    }
}
</script>