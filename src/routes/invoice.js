const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')

router.get('/last', async (req, res) => {
    sql = `select max(inv_id) as lastId from invoice`
    await conn.open(sql, [], false, res)
})

router.post('/', async (req, res) => {
    let percode = parseInt(req.body.percode)
    let total = parseInt(req.body.total)
    sql = `insert into invoice values(invoiceid.nextval, :percode, sysdate, :total)`
    await conn.open(sql, [percode, total], true, res)
})

module.exports = router