let c = null
import {strokeColor, lineWidth, fontStyle} from "/overlay/functions/tool"
let randomHex = () => {
    return Math.floor(Math.random()*16777215).toString(16)
}

const Comment = (p, strokeColor, lineWidth) => {
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
let _c = null
let font = null
let fontSize = null

function mouseDown(e){
    typing = true
    x = e.pageX
    y = e.pageY
    fontSize = lineWidth * 5
    font = fontSize + "px " + fontStyle

    let _id = "comment-" + randomHex()
    $('body').append('<div id="'+_id+'">Edit text</div>')
    _c = $('#'+_id)

    $(_c).on('keydown', keyDown)
    $(_c).on('mousemove', mouseMove)

    $(_c).css('position', 'absolute')
    $(_c).css('left', x)
    $(_c).css('top', y)
    $(_c).css('width','auto')
    $(_c).css('height', 'auto')
    $(_c).css('border', '2px solid ' + strokeColor)
    $(_c).css('border-radius', '4px')
    $(_c).css('background-color', 'white')
    $(_c).css('padding', '16px')
    $(_c).css('z-index', '80')
    $(_c).css('font', font)
    $(_c).css('color', strokeColor)
    $(_c).css('outline', 'none')
    $(_c).css('overflow', 'visible')
    $(_c).css('white-space', 'nowrap')
    $(_c).css('text-align', 'left')

    $(_c).attr('contenteditable', 'true')

}

function mouseMove(e){
    fontSize = lineWidth * 5
    font = fontSize + "px " + fontStyle
    $(_c).css('font', font)
    $(_c).css('color', strokeColor)
}

function keyDown(e){
    fontSize = lineWidth * 5
    font = fontSize + "px " + fontStyle
    $(_c).css('font', font)
    $(_c).css('color', strokeColor)
        if (e.keyCode == 13){
            e.preventDefault()
            $(_c).attr('contenteditable', 'false')
            $(_c).css('pointer-events', 'none')
            _c.off('keydown')
            _c.off('mousemove')
        }
        else{
            $(_c).css('width', 'auto')
            $(_c).css('height', 'auto')

        }



}

export default Comment