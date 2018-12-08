const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')

router.get('/', async (request, response) => {
    sql = `select a.art_id, a.art_name, a.art_type, a.art_mat, a.art_price_unit, a.art_price_wholesale, a.art_image, s.sto_quant 
            from article a, stock s 
            where a.art_id = s.art_id`
    await conn.open(sql, [], false, response)
})

router.get('/:name', async (request, response) => {
    sql = `select a.art_id, a.art_name, a.art_type, a.art_mat, a.art_price_unit, a.art_price_wholesale, a.art_image, s.sto_quant 
            from article a, stock s 
            where a.art_id = s.art_id and lower(a.art_name) like lower('` + request.params.name + `%')`
    await conn.open(sql, [], false, response)
})

module.exports = router