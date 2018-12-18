const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')

router.get('/', async (request, response) => {
    sql = `select per_name || ' ' || per_surname, per_sex, per_email, per_birthday, per_image, per_address, per_code 
            from person
            where rol_id = 2 and per_hired = 0`
    await conn.open(sql, [], false, response)
})

router.get('/:email&:pass', async (request, response) => {
    sql = `select * 
            from person 
            where per_email = :email and decod_pass(per_password) = :pass`
    var email = request.params.email
    var pass = request.params.pass
    await conn.open(sql, [email, pass], false, response)
})

router.post('/', async (request, response) => {
    sql = `insert into person(per_code, per_name, per_surname, per_sex, per_email, per_password, per_birthday, per_image, 
        per_address, rol_id) 
        values(:code, :name, :surname, :sex, :email, :pass, to_date(:birth, 'yyyy-mm-dd'), :image, :address, :rolid)`
    var code = parseInt(request.body.code)
    var name = request.body.name
    var surname = request.body.surname
    var sex = request.body.sex
    var email = request.body.email
    var pass = request.body.pass
    var birth = request.body.birth
    var image = 'imgs/people/' + request.body.image
    var address = request.body.address
    var rolid = parseInt(request.body.rolid)
    await conn.open(sql, [code, name, surname, sex, email, pass, birth, image, address, rolid], true, response)
})

module.exports = router