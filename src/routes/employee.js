const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')

router.get('/:id', async (request, response) => {
    sql = `select per_code, per_name, per_surname, per_sex, per_email, per_birthday, per_image, per_address 
            from person
            where rol_id = 2 and per_hired = 1 and per_code = :id` //el 2 de rol_id es empleado y el 0 es que no está despedido
    var id = request.params.id
    await conn.open(sql, [id], false, response)
})

router.get('/', async (request, response) => {
    sql = `select per_name || ' ' || per_surname, per_sex, per_email, per_birthday, per_image, per_address, per_code 
            from person
            where rol_id = 2 and per_hired = 1` //el 2 de rol_id es empleado y el 0 es que no está despedido
    await conn.open(sql, [], false, response)
})

router.put('/:id', async (request, response) => {
    sql = `update person set per_hired = 0 where per_code = ` + request.params.id
    await conn.open(sql, [], true, response)
})

router.put('/', async(request, response) => {
    sql = `update person set 
            per_name = :name, 
            per_surname = :surname, 
            per_sex = :sex, 
            per_email = :email, 
            per_password = :pass, 
            per_birthday = to_date(:birth, 'yyyy-mm-dd'), 
            per_image = :image, 
            per_address = :address
            where per_code = ` + request.body.code
    var name = request.body.name
    var surname = request.body.surname
    var sex = request.body.sex
    var email = request.body.email
    var pass = request.body.pass
    var birth = request.body.birth
    var image = 'imgs/people/' + request.body.image
    var address = request.body.address
    await conn.open(sql, [name, surname, sex, email, pass, birth, image, address], true, response)
})

router.patch('/:id', async(request, response) => {
    sql = `update person set per_hired = 1 where per_code = ` + request.params.id
    await conn.open(sql, [], true, response)
})

module.exports = router