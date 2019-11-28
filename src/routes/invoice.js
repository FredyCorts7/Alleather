const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')

router.get('/:percode', async (req, res) => {
    const { percode } = req.params
    sql = `select inv_id, inv_date, inv_totalmoney from invoice where per_code = :percode`
    await conn.open(sql, [percode], false, res)
})

router.post('/', async (req, res) => {
    let percode = parseInt(req.body.percode)
    let total = parseInt(req.body.total)
    sql = `insert into invoice values(invoiceid.nextval, :percode, sysdate, :total)`
    await conn.open(sql, [percode, total], true, res)
})

module.exports = router