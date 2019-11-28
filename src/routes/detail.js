const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')

router.post('/', async (req, res) => {
    const invId = '(select max(inv_id) from invoice)'
    let sql = ''
    try {
        sql += 'begin '
        let detail = req.body.detailInvoice
        for (let i = 0; i < detail.length; i++) {
            sql += `insert into detail values (${invId}, ${detail[i].artId}, ${detail[i].artCant}); `
        }
        sql += 'end;'
        await conn.open(sql, [], true, res)
    } catch (error) {
        res.send(JSON.stringify({ error }))
    }
})

module.exports = router