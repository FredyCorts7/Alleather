const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')

router.get('/:id', async (req, res) => {
    sql = `select * from wish where per_code =` + req.params.id
    console.log(sql)
    await conn.open(sql, [], false, res)
})

router.post('/:perid&:artid', async (req, res) => {
    sql = `insert into wish(per_code, art_id) values(`+ req.params.perid + `,` + req.params.artid + `)`
    console.log(sql)
    await conn.open(sql, [], true, res)
})

module.exports = router