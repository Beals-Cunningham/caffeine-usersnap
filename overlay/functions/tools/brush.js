let c = null
import {strokeColor, lineWidth} from "/overlay/functions/tool"

const Brush = (p, strokeColor, lineWidth) => {
    c = p
    console.log('Brush', c)

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

function setPosition(e){
    x = e.pageX
    y = e.pageY
}

function mouseDown(e){
    drawing = true
    setPosition(e)
   
}

function mouseMove(e){
    //on mouse move, add a filled circle with radius lineWidth at the cursor
    if (drawing){
        c.strokeStyle = strokeColor
        c.strokeCap = 'round'
        c.beginPath()
        c.lineWidth = lineWidth
        
        c.moveTo(x, y)
        setPosition(e)
        c.lineTo(x, y)
      
        c.stroke()
    }
}

function mouseUp(){
    //on mouse up, stop drawing the circle
    drawing = false
}

export default Brush