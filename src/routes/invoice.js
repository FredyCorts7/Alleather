const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')

router.get('/:id&:percode&totalmoney', async (req, res) => {
    sql = `insert into invoice values(:id, :percode, sysdate, :totalmoney)`
    let id = parseInt(req.params.id)
    let percode = parseInt(req.params.percode)
    let totalmoney = parseInt(req.params.totalmoney)
    await conn.open(sql, [id, percode, totalmoney], true, res)
})

module.exports = router