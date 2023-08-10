let c = null
import {strokeColor, lineWidth} from "/overlay/functions/tool"

const Rectangle = (p, strokeColor, lineWidth) => {
    c = p
    console.log('Rectangle', c)
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
let rect = null
let x = 0
let y = 0
let w = 0
let h = 0

function mouseDown(e){
    console.log('mouseDown')
    //on mouse down, start drawing a rectangle with the top left corner at the mouse position
    x = e.pageX
    y = e.pageY
    w = 0
    h = 0
    rect = {x:x, y:y, w:w, h:h}
    console.log(rect)
    drawing = true
    c.strokeStyle = strokeColor
    c.lineWidth = lineWidth

    c.strokeRect(rect.x, rect.y, rect.w, rect.h)

    //create a temporary div to show the rectangle with border set to the stroke color and line width
    //add temporary div to the document
    $('body').append('<div id="temp-rect"></div>')

    $('#temp-rect').css('position', 'absolute')
    $('#temp-rect').css('left', rect.x)
    $('#temp-rect').css('top', rect.y)
    $('#temp-rect').css('width', rect.w)
    $('#temp-rect').css('height', rect.h)
    $('#temp-rect').css('border', lineWidth + 'px solid ' + strokeColor)
    $('#temp-rect').css('pointer-events', 'none')
    $('#temp-rect').css('z-index', '80')

}

function mouseMove(e){
    //on mouse move, update the rectangle to have the bottom right corner at the mouse position
    if (drawing){
        // c.clearRect(0, 0, c.canvas.width, c.canvas.height)

        w = e.pageX - rect.x
        h = e.pageY - rect.y

        rect.w = w
        rect.h = h
        c.strokeStyle = strokeColor
        c.lineWidth = lineWidth
 
        //c.strokeRect(rect.x, rect.y, rect.w, rect.h)

        $('#temp-rect').css('left', rect.x)
        $('#temp-rect').css('top', rect.y)
        $('#temp-rect').css('width', rect.w)
        $('#temp-rect').css('height', rect.h)

    }
}

function mouseUp(){
    //on mouse up, remove the temporary div and draw the rectangle on the canvas
    $('#temp-rect').remove()
    c.strokeStyle = strokeColor
    c.lineWidth = lineWidth
    c.strokeRect(rect.x, rect.y, rect.w, rect.h)
    drawing = false
    rect = {x:0, y:0, w:0, h:0}

}


export default Rectangle