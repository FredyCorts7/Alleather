const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')

router.get('/', async (request, response) => {
    sql = "select fun_name, fun_image, fun_url from functionality"
    await conn.open(sql, [], false, response)
})
module.exports=router