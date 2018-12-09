const express = require('express')
const router = express.Router()
const conn = require('../connection/connectOracle')

router.get('/:rolid', async (request, response) => {
    sql = `select f.fun_name, f.fun_image, f.fun_url 
            from functionality f, fun_role fr 
            where fr.fun_id = f.fun_id and fr.rol_id = :rolid`
    var rolid = request.params.rolid
    await conn.open(sql, [rolid], false, response)
})
module.exports=router