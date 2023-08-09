import express from 'express'
const app = express()



app.get('/helloworld', function (req, res) {
    //Send /public/hello-world.html file as HTML 
    res.type('text/html')
    res.sendFile('/views/hello-world.html', { root: '.'})
})

app.get('/overlay/css', function (req, res) {
    //send file as MIME CSS type
    res.type('text/css')
    res.sendFile('/overlay/overlay.css', { root: '.'})
})

app.get('/overlay/functions/grabber', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/overlay/functions/grabber.js', { root: '.'})
})

app.get('/overlay/functions/brush', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/overlay/functions/brush.js', { root: '.'})
})

app.get('/overlay/functions/tool', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/overlay/functions/tool.js', { root: '.'})
})

app.get('/tool/brush', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/overlay/functions/tools/brush.js', { root: '.'})
})

app.get('/tool/circle', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/overlay/functions/tools/circle.js', { root: '.'})
})

app.get('/tool/rectangle', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/overlay/functions/tools/rectangle.js', { root: '.'})
})

app.get('/overlay', function (req, res) {
    res.type('text/html')
    res.sendFile('/views/overlay.html', { root: '.'})
})


app.get('/bootstrap/css', function (req, res) {
    //send file as MIME CSS type
    res.type('text/css')
    res.sendFile('/node_modules/bootstrap/dist/css/bootstrap.min.css', { root: '.'})
})

app.get('/bootstrap/js', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/node_modules/bootstrap/dist/js/bootstrap.min.js', { root: '.'})
})

app.get('/jquery/js', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/node_modules/jquery/dist/jquery.min.js', { root: '.'})
})

app.listen(8668)