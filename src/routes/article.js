const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')

router.get('/', async (request, response) => {
    sql = "select art_name, art_type, art_price_unit, art_image from article"
    await conn.open(sql, [], false, response)
})

router.get('/:name', async (request, response) => {
    sql = "select art_name, art_type, art_price_unit, art_image from article where lower(art_name) like lower('" + request.params.name + "%')"
    await conn.open(sql, [], false, response)
    
})

module.exports = router