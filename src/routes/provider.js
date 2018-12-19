const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')


router.get('/', async (request, response) => {
    sql = `select pro_nit, pro_name, pro_address, pro_email 
            from provider 
            where pro_active = 1` 
    await conn.open(sql, [], false, response)
})

router.get('/:id', async (request, response) => {
    sql = `select pro_nit, pro_name, pro_address, pro_email 
            from provider
            where pro_active = 1 and pro_nit = :id` //el 2 de rol_id es empleado y el 0 es que no está despedido
    var id = request.params.id
    await conn.open(sql, [id], false, response)
})

router.put('/', async(request, response) => {
    sql = `update provider set 
            pro_name = :name, 
            pro_address = :address, 
            pro_email = :email 
            where pro_nit = ` + request.body.nit
    var name = request.body.name  
    var address = request.body.address
    var email = request.body.email    
    await conn.open(sql, [name, address, email], true, response)
})

router.put('/:id', async (request, response) => {
    sql = `update provider set pro_active = 0 where pro_nit = ` + request.params.id
    await conn.open(sql, [], true, response)
})

router.post('/', async (request, response) => {
    sql = `insert into provider(pro_nit, pro_name, pro_address, pro_email) values(:nit, :name, :address, :email)`
    var nit = parseInt(request.body.nit)
    var name = request.body.name
    var email = request.body.email
    var address = request.body.address
    await conn.open(sql, [nit, name, address, email], true, response)
})

module.exports = router