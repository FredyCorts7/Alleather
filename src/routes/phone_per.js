const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')

router.post('/:code&:phone&:option', async (request, response) => {
    var opt = parseInt(request.params.option)
    var phone = request.params.phone
    var code = parseInt(request.params.code)
    var type = ''
    if (opt == 0)
        type = 'Móvil'
    else if (opt == 1)
        type = 'Fijo'
    console.log(typeof(code))
    console.log(typeof(phone))
    console.log(typeof(type))
    sql = `insert into phone_per values(:code, :phone, :type)`
    await conn.open(sql, [code, phone, type], true, response)
})

router.get('/:code', async (request, response) => {
    var code = parseInt(request.params.code)
    sql = `select pho_number, pho_type from phone_per where per_code = :code`
    await conn.open(sql, [code], false, response)
})

module.exports = router