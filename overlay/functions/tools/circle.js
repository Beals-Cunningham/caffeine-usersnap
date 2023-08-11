let c = null
import {strokeColor, lineWidth} from "/overlay/functions/tool"

const Circle = (p, strokeColor, lineWidth) => {
    c = p
    console.log('Circle', c)

    $('#overlay-canvas').off('mousedown')
    $('#overlay-canvas').off('mousemove')
    $('#overlay-canvas').off('mouseup')
    $('#overlay-canvas').on('mousedown', mouseDown)
    $('#overlay-canvas').on('mousemove', mouseMove)
    $('#overlay-canvas').on('mouseup', mouseUp)
    $('#tool-options').removeClass()
    $('#tool-options').addClass('tool-option-enabled')
    $('#tool-options').addClass('to-text')
    $('#to-stroke').val(strokeColor)
    $('#to-line-width').text(lineWidth)
}

let drawing = false
let x = 0
let y = 0
let w = 0
let h = 0

function mouseDown(e){
    console.log('mouseDown')
    //on mouse down, start drawing a circle with the top left corner at the mouse position
    x = e.pageX
    y = e.pageY
    w = 0
    h = 0

    drawing = true
    c.strokeStyle = strokeColor
    c.lineWidth = lineWidth

    //c.beginPath()
    //c.arc(x, y, 10, 0, 2 * Math.PI)
    //c.stroke()

    //create a temporary div to show the circle
    //add temporary div to the document
    $('body').append('<div id="temp-circle"></div>')
    $('#temp-circle').css('position', 'absolute')
    $('#temp-circle').css('left', x)
    $('#temp-circle').css('top', y)
    $('#temp-circle').css('width', w)
    $('#temp-circle').css('height', h)
    $('#temp-circle').css('border', lineWidth + 'px solid ' + strokeColor)
    $('#temp-circle').css('pointer-events', 'none')
    $('#temp-circle').css('z-index', '80')
    $('#temp-circle').css('border-radius', '100%')
}

function mouseMove(e){
    //on mouse move, draw a circle (c.arc()) to have the bottom right corner at the mouse position
    if (drawing){
        let radius = Math.sqrt(Math.pow(x - e.pageX, 2) + Math.pow(y - e.pageY, 2))
        //c.clearRect(0, 0, c.canvas.width, c.canvas.height)
        //c.beginPath()
        c.strokeStyle = strokeColor
        c.lineWidth = lineWidth
        //c.arc(x, y, radius, 0, 2 * Math.PI)
        //c.stroke()
        $('#temp-circle').css('width', 2 * radius)
        $('#temp-circle').css('height', 2 * radius)
        $('#temp-circle').css('left', x - radius)
        $('#temp-circle').css('top', y - radius)
    }
}

function mouseUp(){
    //on mouse up, remove the temporary div and draw the circle on the canvas
    drawing = false
    
    let radiusString = $('#temp-circle').css('width')
    //remove 'px' from the end of the string
    radiusString = radiusString.substring(0, radiusString.length - 2)
    console.log(radiusString)
    let radius = parseInt(radiusString) / 2


    console.log(x, y, radius)
    c.beginPath()
    c.strokeStyle = strokeColor
    c.lineWidth = lineWidth
    $('#temp-circle').remove()
    c.arc(x, y, radius, 0, 2 * Math.PI)
    c.stroke()
    c.closePath()

}


export default Circle