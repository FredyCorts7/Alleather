const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')
//const mail = require(`C:/Users/richa/Documents/VueProjects/alleather/src/connection`)

router.get('/', async (request, response) => {
    sql = `select a.art_id, a.art_name, a.art_descri, a.art_type, a.art_mat, listagg(sa.size_name, ', ') within group(order by sa.size_name) as "Talla" , (((a.art_price_unit/100) * s.price_unit) + s.price_unit) as "PrecioPorUnidad", (((a.art_price_wholesale/100) * s.price_unit) + s.price_unit) as "PrecioAlMayor", s.art_image
    from stock s, article a, size_art sa
    where s.art_id = a.art_id and sa.size_id = s.size_id and art_active = 1
    group by (a.art_id, a.art_name, a.art_descri, a.art_type, a.art_mat, (((a.art_price_unit / 100) * s.price_unit) + s.price_unit), (((a.art_price_wholesale / 100) * s.price_unit) + s.price_unit), s.art_image)`
    await conn.open(sql, [], false, response)
})

router.get('/:name', async (request, response) => {
    sql = `select a.art_id, a.art_name, a.art_descri, a.art_type, a.art_mat, listagg(sa.size_name, ', ') within group(order by sa.size_name) as "Talla" , (((a.art_price_unit/100) * s.price_unit) + s.price_unit) as "PrecioPorUnidad", (((a.art_price_wholesale/100) * s.price_unit) + s.price_unit) as "PrecioAlMayor", s.art_image
    from stock s, article a, size_art sa
    where s.art_id = a.art_id and sa.size_id = s.size_id and lower(a.art_name) like lower('` + request.params.name + `%') and art_active = 1
    group by (a.art_id, a.art_name, a.art_descri, a.art_type, a.art_mat, (((a.art_price_unit / 100) * s.price_unit) + s.price_unit), (((a.art_price_wholesale / 100) * s.price_unit) + s.price_unit), s.art_image)`
    await conn.open(sql, [], false, response)
})
/*
router.patch('/:id', async (req, res) => { //tomaremos éste patch como nuestro metodo get de http
    sql = `select a.art_id, a.art_name, a.art_descri, a.art_type, a.art_mat, listagg(sa.size_name, ', ') within group(order by sa.size_name) as "Talla" , (((a.art_price_unit/100) * s.price_unit) + s.price_unit) as "PrecioPorUnidad", (((a.art_price_wholesale/100) * s.price_unit) + s.price_unit) as "PrecioAlMayor", s.art_image
    from stock s, article a, size_art sa
    where s.art_id = a.art_id and sa.size_id = s.size_id and art_active = 1 and s.art_id = :id
    group by (a.art_id, a.art_name, a.art_descri, a.art_type, a.art_mat, (((a.art_price_unit / 100) * s.price_unit) + s.price_unit), (((a.art_price_wholesale / 100) * s.price_unit) + s.price_unit), s.art_image)`
    let id = req.params.id
    await conn.open(sql, [id], false, res)
})*/

router.post('/', async (req, res) => {
    sql = `insert into article
    values (:id,:name,:type,:categorie,:material,:priceunit,:pricewholesale,:descrip,:quantmin,0)`
    let id= parseInt(req.body.id)
    let name=req.body.name
    let type=req.body.type
    let categorie=parseInt(req.body.categorie)
    let material=req.body.material
    let priceunit=parseInt(req.body.priceunit)
    let pricewholesale=parseInt(req.body.pricewholesale)
    let descrip= req.body.descrip
    let quantmin=parseInt(req.body.quantmin)

    await conn.open(sql, [id,name,type,categorie,material,priceunit,pricewholesale,descrip,quantmin], true, res)
})

router.put('/:id', async (request, response) => {
    sql = `update article 
            set art_active = 0 
            where art_id = ` + request.params.id
    await conn.open(sql, [], true, response)
})

router.patch('/', async (req, res) => {
    sql = `update article set 
            art_name = '` + req.body.name + `',
            art_type = '` + req.body.type + `' ,
            art_mat = '` + req.body.material + `',
            art_descri = '` + req.body.descrip + `',
            cat_id = `+ req.body.categorie+`,
            art_quant_min = ` + req.body.quantmin +`,
            art_price_unit = ` + req.body.priceunit +`,
            art_price_wholesale =` + req.body.pricewholesale +
            ` where art_id =` + req.body.id
    console.log(sql)
    await conn.open(sql, [], true, res)
})

module.exports = router