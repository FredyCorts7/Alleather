const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')

router.get('/', async (request, response) => {
    sql = `select per_name || ' ' || per_surname, per_sex, per_email, per_birthday, per_image, per_address, per_code 
            from person
            where rol_id = 2 and per_out = 0` //el 2 de rol_id es empleado y el 0 es que no está despedido
    await conn.open(sql, [], false, response)
})

router.put('/:id', async (request, response) => {
    sql = `update person set per_out = 1 where per_code = ` + request.params.id
    await conn.open(sql, [], true, response)
})

module.exports = router