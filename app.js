import express from 'express'
const app = express()

app.get('/overlay/css', function (req, res) {
    //send file as MIME CSS type
    res.type('text/css')
    res.sendFile('/overlay/overlay.min.css', { root: '.'})
})

app.get('/overlay/functions/grabber', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/overlay/functions/grabber.min.js', { root: '.'})
})

app.get('/overlay/functions/scroll', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/overlay/functions/scroll.min.js', { root: '.'})
})

app.get('/overlay/functions/tool', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/overlay/functions/tool.min.js', { root: '.'})
})

app.get('/tool/brush', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/overlay/functions/tools/brush.min.js', { root: '.'})
})

app.get('/tool/circle', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/overlay/functions/tools/circle.min.js', { root: '.'})
})

app.get('/tool/rectangle', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/overlay/functions/tools/rectangle.min.js', { root: '.'})
})

app.get('/tool/blur', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/overlay/functions/tools/blur.min.js', { root: '.'})
})

app.get('/tool/text', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/overlay/functions/tools/text.min.js', { root: '.'})
})

app.get('/tool/arrow', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/overlay/functions/tools/arrow.min.js', { root: '.'})
})

app.get('/tool/comment', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/overlay/functions/tools/comment.min.js', { root: '.'})
})

app.get('/tool/accept', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/overlay/functions/process/accept.min.js', { root: '.'})
})

app.get('/tool/reject', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/overlay/functions/process/reject.min.js', { root: '.'})
})

app.get('/tool/export', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/overlay/functions/tools/export.min.js', { root: '.'})
})

app.get('/tool/shortcuts', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/overlay/functions/shortcuts.min.js', { root: '.'})
})

app.get('/overlay', function (req, res) {
    res.type('text/html')
    res.sendFile('/views/overlay.html', { root: '.'})
})

app.get('/', function (req, res) {
    res.type('text/html')
    res.sendFile('/views/overlay.html', { root: '.'})
})

app.get('/overlay/functions/process/accept.py', function (req, res) {
    res.type('text/python')
    res.sendFile('/overlay/functions/process/accept.py', { root: '.'})
})

app.get('/jquery/js', function (req, res) {
    //send file as MIME JS type
    res.type('text/javascript')
    res.sendFile('/node_modules/jquery/dist/jquery.min.js', { root: '.'})
})


app.listen(8668)