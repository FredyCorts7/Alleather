const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')

router.get('/', async (request, response) => {
    sql = `select a.art_id, a.art_name, a.art_type, a.art_mat, a.art_price_unit, a.art_price_wholesale, a.art_image 
            from article a`
    await conn.open(sql, [], false, response)
})

router.get('/:name', async (request, response) => {
    sql = `select a.art_id, a.art_name, a.art_type, a.art_mat, a.art_price_unit, a.art_price_wholesale, a.art_image 
            from article a 
            where lower(a.art_name) like lower('` + request.params.name + `%')`
    await conn.open(sql, [], false, response)
})

router.delete('/:id', async (request, response) => {
    sql = `delete from article where art_id = ` + request.params.id
    await conn.open(sql, [], true, response)
})

module.exports = router