let c = null
import {strokeColor, lineWidth, fontStyle} from "/overlay/functions/tool"

const Text = (p, strokeColor, lineWidth) => {
    c = p
    console.log('Text', c)
    $('#overlay-canvas').off('mousedown')
    $('#overlay-canvas').off('mousemove')
    $('#overlay-canvas').off('mouseup')
    $('#overlay-canvas').on('mousedown', mouseDown)
    $('#overlay-canvas').on('keydown', keyDown)
    $('#tool-options').removeClass()
    $('#tool-options').addClass('tool-option-enabled')
    $('#tool-options').addClass('to-text')
    $('#to-stroke').val(strokeColor)
    $('#to-line-width').text(lineWidth)
}

let typing = false
let x = 0
let y = 0

function mouseDown(e){
    //create a text box at the mouse position on the canvas
    typing = true
    x = e.pageX
    y = e.pageY
    let fontSize = lineWidth * 2
    let font = fontSize + "px " + fontStyle
    c.font = font
    c.fillStyle = strokeColor


}

function keyDown(e){
    //add text to the text box
    if (typing){
        if (e.keyCode == 13){
            //if enter is pressed, stop typing
            typing = false
        } else {
            //if any other key is pressed, add it to the text box
            $('#text-box').val($('#text-box').val() + e.key)
        }
    }


}

export default Text