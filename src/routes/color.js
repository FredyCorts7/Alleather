const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')

router.get('/', async (request, response) => {
    sql = `select * from color`
    await conn.open(sql, [], false, response)
})

module.exports = router