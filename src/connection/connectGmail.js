// Definimos el transporter
const transporter = nodemailer.createTransport ({
    service: 'Gmail',
    auth: {
        user: 'eulerypi@gmail.com',
        pass: '3,1415;2,718281'
    }
})

/*// Definimos el email
var mailOptions = {
    from: 'ALL LEATHER',
    to: 'fred.cor.14@gmail.com, leyder.universidad@gmail.com, karolesmes@hotmail.com, mateoortiz763@gmail.com',
    subject: 'Merry Christmas',
    text: 'Éste es un gran comienzo muchachos!, ALL LEATHER les desea una feliz navidad JOJOJOJO XD :v.'
}

// Enviamos el email
transporter.sendMail(mailOptions, function(error, info) {
    if (error){
        console.log(error);
    } else {
        console.log("Email sent");
    }
})*/

exports.transporter = transporter