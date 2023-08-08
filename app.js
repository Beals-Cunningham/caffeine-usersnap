const express = require('express')
const app = express()
const pug = require('pug')
var reload = require('reload')

app.set('view engine', 'pug')

app.get('/helloWorld', function (req, res) {
    //Send /public/hello-world.html file as HTML 
    res.type('text/html')
    res.sendFile(__dirname + '/public/hello-world.html')
})

app.get('/bootstrap/css', function (req, res) {
    //send file as MIME CSS type
    res.type('text/css')
    res.sendFile(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css')
})

app.get('/bootstrap/js', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile(__dirname + '/node_modules/bootstrap/dist/js/bootstrap.min.js')
})

app.get('/reload/js', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile(__dirname + '/node_modules/reload/lib/reload.js')
})

app.listen(8668)
reload(app)