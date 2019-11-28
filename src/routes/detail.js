const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')

router.get('/:invid', async (req, res) => {
    const { invid } = req.params
    sql = `select distinct d.art_id, c.cat_name, a.art_name, a.art_descri, p.pro_name, d.art_quant, (((a.art_price_unit / 100) * s.price_unit) + s.price_unit) from article a, detail d, categorie c, stock s, provider p where s.pro_nit = p.pro_nit and s.art_id = a.art_id and a.cat_id = c.cat_id and d.art_id = a.art_id and d.inv_id = :invid`
    await conn.open(sql, [invid], false, res)
})

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