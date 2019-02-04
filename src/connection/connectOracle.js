var oracle = require('oracledb')

cns = {
    user: "ALLEATHER",
    password: "klmf",
    connectString: "localhost/XE",
};

//row functions
let error = (err, rs, cn) => {
    if (err) {
        rs.send(JSON.stringify(err))
        if (!cn) close(cn)
        return -1
    }
}

let open = (sql, binds, dml, rs) => {
    oracle.getConnection(cns, (err, cn) => {
        if (error(err, rs, null) == -1) return;
        try {
            cn.execute(sql, binds, { autoCommit: dml }, (err, result) => {
                if (error(err, rs, cn) == -1) return;
                if (dml)
                    rs.send(JSON.stringify(result.rowAffected))
                else {
                    rs.send(JSON.stringify(result.rows))
                }
                close(cn)
            })
        } catch (err) {
            rs.send(JSON.stringify(err))
        }
    })
}

let close = cn => {
    cn.release(err => {
        if (err) console.log(err.message)
    })
}

exports.open = open