const express = require('express')
const app = express()
const pug = require('pug')

app.set('view engine', 'pug')

const helloWorld = pug.compileFile('hello-world.pug')

app.get('/helloWorld', function (req, res) {
  res.send(helloWorld())
})

app.get('/bootstrap/css', function (req, res) {
    //send file as MIME CSS type
    res.type('text/css')
    res.sendFile(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css')
})

app.listen(8668)