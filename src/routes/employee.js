const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')

router.get('/:rol', async (request, response) => {
    sql = `select per_name || ' ' || per_surname, per_sex, per_email, per_birthday, per_image, per_address, per_code 
            from person
            where rol_id = :rol`
    var rol = request.params.rol
    await conn.open(sql, [rol], false, response)
})

module.exports = router