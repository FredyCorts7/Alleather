<template>
    <footer id="foot" class="page-footer font-small blue pt-4">
        <div class="container-fluid text-center text-md-left">
            <div class="row">
                <div id="dashes-right" class="col-md-6 mt-md-0 mt-3">
                    <h5 class="foo">About Us</h5>
                    <p>A business committed to the Colombian Industries of Moroccan Industry.<br>Calle 22ª #6-69 Urbanización Trigal Contemporáneo
                    <br>Cúcuta - Norte de Santander, Colombia<br>Contact: corteciso@gmail.com </p>
                </div>
                <hr class="clearfix w-100 d-md-none pb-3">
                <div class="col-md-6 mb-md-0 mb-3">
                    <h5 class="text foo">Social Networks</h5>
                    <ul id="socialnetworks" class="list-unstyled">
                        <li><a href="http://facebook.com" target="_blank"><img class="face" src="imgs/redes/facebooknegro64.png"/></a></li>
                        <li><a href="http://twitter.com" target="_blank"><img class="twi" src="imgs/redes/twitternegro64.png"/></a></li>
                        <li><a href="http://instragram.com" target="_blank"><img class="ins" src="imgs/redes/instagramnegro64.png"/></a></li>
                        <li><a href="http://co.pinterest.com" target="_blank"><img class="pin" src="imgs/redes/pinsterestnegro64.png"/></a></li>
                        <li><a href="https://www.google.com/maps/place/Urbanizacion+Trigal+Comtemporaneo/@7.9420693,-72.5059087,602m/data=!3m1!1e3!4m8!1m2!2m1!1sCalle+22%C2%AA+%236-69+Urbanizaci%C3%B3n+Trigal+Contempor%C3%A1neo!3m4!1s0x0:0xbac08dae47ae9655!8m2!3d7.9424847!4d-72.5051174" target="_blank"><img class="map" src="imgs/redes/mapsnegro64.png"/></a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-copyright text-center py-3">© FKLSP - 2019 Copyright</div>
    </footer>
</template>

<style>
    #foot {
        font-family: 'varela round';
        font-size: 14px;
        color: white;
        background-color: rgba(0,0,0,.85);
        border-top-style: dashed;
        border-width: 1px;
    }
    #socialnetworks > li {
        display: inline-block
    }
    #dashes-right {
        border-right: 1px solid white;
    }
    .foo {
        margin-bottom: 30px
    }
    .face:hover {
        content: url("/imgs/redes/facebookblanco64.png")
    }
    .twi:hover {
        content: url("/imgs/redes/twitterblanco64.png")
    }
    .ins:hover {
        content: url("/imgs/redes/instagramblanco64.png")
    }
    .pin:hover {
        content: url("/imgs/redes/pinsterestblanco64.png")
    }
    .map:hover {
        content: url("/imgs/redes/mapsblanco64.png")
    }
</style>