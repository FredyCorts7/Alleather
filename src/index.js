const express = require('express')
const morgan = require('morgan')
const server = express()

//settings
server.set('port', 3000)

//middlewares
server.use(morgan('dev'))
server.use(express.json())

//routes
server.use('/api/person', require('./routes/person'))
server.use('/api/article', require('./routes/article'))
server.use('/api/functionality', require('./routes/functionality'))

//static files
server.use(express.static(__dirname + '/public'))

//server is listening
server.listen(server.get('port'), () => {
    console.log('Server on port ' + server.get('port'))
})