const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')

router.get('/', async (request, response) => {
    sql = `select per_name || ' ' || per_surname, per_sex, per_email, per_birthday, per_image, per_address, per_code 
            from person
            where rol_id = 3`
    await conn.open(sql, [], false, response)
})

router.get('/:email&:pass', async (request, response) => {
    sql = `select per_code, per_name, per_surname, per_sex, per_email, decod_pass(per_password), per_birthday, per_image, per_address, rol_id, per_hired 
            from person 
            where per_email = :email and decod_pass(per_password) = :pass`
    var email = request.params.email
    var pass = request.params.pass
    await conn.open(sql, [email, pass], false, response)
})

router.patch('/', async (request, response) => {
    sql = `select per_name || ' ' || per_surname, per_sex, per_email, per_birthday, per_image, per_address, per_code 
            from person
            where rol_id = 2 and per_hired = 0` //el 2 de rol_id es empleado y el 0 es que no está despedido
    await conn.open(sql, [], false, response)
})

router.post('/:option', async (request, response) => {
    var opt = parseInt(request.params.option)
    var code = parseInt(request.body.code)
    var name = request.body.name
    var surname = request.body.surname
    var sex = request.body.sex
    var email = request.body.email
    var pass = request.body.pass
    var birth = request.body.birth
    var address = request.body.address
    var rolid = parseInt(request.body.rolid)
    if (opt == 1) {
        var image = 'imgs/people/' + request.body.image
        sql = `insert into person(per_code, per_name, per_surname, per_sex, per_email, per_password, per_birthday, per_image, 
            per_address, rol_id) 
            values(:code, :name, :surname, :sex, :email, encod_pass(:pass), to_date(:birth, 'yyyy-mm-dd'), :image, :address, :rolid)`
        await conn.open(sql, [code, name, surname, sex, email, pass, birth, image, address, rolid], true, response)
    } else if (opt == 0) {
        sql = `insert into person(per_code, per_name, per_surname, per_sex, per_email, per_password, per_birthday, per_address, rol_id) 
            values(:code, :name, :surname, :sex, :email, encod_pass(:pass), to_date(:birth, 'yyyy-mm-dd'), :address, :rolid)`
        await conn.open(sql, [code, name, surname, sex, email, pass, birth, address, rolid], true, response)
    }
})

router.put('/', async(request, response) => {
    sql = `update person set 
            per_name = :name, 
            per_surname = :surname, 
            per_sex = :sex, 
            per_email = :email, 
            per_password = encod_pass(:pass), 
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

module.exports = router