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
    $('#tool-options').addClass('to-rectangle')
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

    c.beginPath()
    c.arc(x, y, 10, 0, 2 * Math.PI)
    c.stroke()
}

function mouseMove(e){
    //on mouse move, draw a circle (c.arc()) to have the bottom right corner at the mouse position
    if (drawing){
        let radius = Math.sqrt(Math.pow(x - e.pageX, 2) + Math.pow(y - e.pageY, 2))
        c.clearRect(0, 0, c.canvas.width, c.canvas.height)
        c.beginPath()
        c.strokeStyle = strokeColor
        c.lineWidth = lineWidth
        c.arc(x, y, radius, 0, 2 * Math.PI)
        c.stroke()
    }
}

function mouseUp(){
    //on mouse up, stop drawing the circle
    drawing = false
}


export default Circle