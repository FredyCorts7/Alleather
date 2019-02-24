const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')

router.post('/', async (req, res) => {
    sql = `insert into stock values(:nit, :idart, :idcolor, :idsize, sysdate, :quant, :price, :image)`
    let nit = parseInt(req.body.provider)
    let idart = parseInt(req.body.article)
    let idcolor = parseInt(req.body.color)
    let idsize = parseInt(req.body.size)
    let quant = parseInt(req.body.quant)
    let price = parseInt(req.body.price)
    let image = 'imgs/articles/' + req.body.image
    await conn.open(sql, [nit, idart, idcolor, idsize, quant, price, image], true, res)
})

module.exports = router
