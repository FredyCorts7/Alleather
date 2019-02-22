const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')

router.get('/', async (request, response) => {
    sql = `select cat_id from categorie`
    await conn.open(sql, [], false, response)
})


router.get('/:id', async (request, response) => {
    sql = `select * from article where art_id = :id`
    let id = parseInt(request.params.id)
    await conn.open(sql, [id], false, response)
})

router.post('/', async (request, response) => {
    sql = `select * from article`
    await conn.open(sql, [], false, response)
})

router.delete('/', async (req, res) => {
    sql = `insert into stock values(:nit, :idart, :idcolor, :idsize, :date, :quant, :price, :image)`
    let nit = req.body.nit
})

module.exports = router