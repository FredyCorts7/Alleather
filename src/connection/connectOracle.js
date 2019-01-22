var oracle = require('oracledb')

cns = {
    user: "ALL_LEATHER",
    password: "klmf",
    connectString: "localhost/XE"
};

function error (err, rs, cn) {
    if (err) {
        console.log(err.message)
        rs.send(JSON.stringify(err))
        if (cn != null) close(cn);
        return -1;
    } else return 0;
}

function open (sql, binds, dml, rs) {
    oracle.getConnection(cns, function(err, cn) {
        if (error(err, rs, null) == -1) return;
        try {
            cn.execute(sql, binds, {autoCommit: dml}, function(err, result) {
                if (error(err, rs, cn) == -1) return;
                if (dml)
                    rs.send(JSON.stringify(result.rowAffected))
                else {
                    rs.send(JSON.stringify(result.rows))
                }
                close(cn)
            })   
        } catch (error) {
            rs.send(JSON.stringify(err))
        }
    })
}

function close (cn) {
    cn.release(
        function (err) {
            if (err) console.log(err.message)
        }
    );
}

exports.open = open