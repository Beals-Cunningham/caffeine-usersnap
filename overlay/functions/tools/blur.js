let c = null
let randomHex = () => {
    return Math.floor(Math.random()*16777215).toString(16)
}

const Blur = (p, strokeColor, lineWidth) => {
    c = p
    console.log('Blur', c)
    $('#overlay-canvas').off('mousedown')
    $('#overlay-canvas').off('mousemove')
    $('#overlay-canvas').off('mouseup')
    $('#overlay-canvas').on('mousedown', mouseDown)
    $('#overlay-canvas').on('mousemove', mouseMove)
    $('#overlay-canvas').on('mouseup', mouseUp)
}

let drawing = false
let rect = null
let x = 0
let y = 0
let w = 0
let h = 0
let _c = null

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

    c.strokeRect(rect.x, rect.y, rect.w, rect.h)

    //create a temporary div to show the rectangle with border set to the stroke color and line width
    //add temporary div to the document
    let _id = "blur-" + randomHex()
    $('body').append('<div id="'+_id+'"></div>')
    _c = $('#'+_id)

    console.log(_c)

    $(_c).css('position', 'absolute')
    $(_c).css('left', rect.x)
    $(_c).css('top', rect.y)
    $(_c).css('width', rect.w)
    $(_c).css('height', rect.h)
    $(_c).css('pointer-events', 'none')
    $(_c).css('background-color', 'rgba(125,125,125,0.2)')
    $(_c).css('backdrop-filter', 'blur(10px)')
    $(_c).css('z-index', '80')

}

function mouseMove(e){
    //on mouse move, update the rectangle to have the bottom right corner at the mouse position
    if (drawing){
        w = e.pageX - rect.x
        h = e.pageY - rect.y

        rect.w = w
        rect.h = h

        console.log(rect, _c)

        $(_c).css('left', rect.x)
        $(_c).css('top', rect.y)
        $(_c).css('width', rect.w)
        $(_c).css('height', rect.h)

    }
}

function mouseUp(){
    drawing = false
    rect = {x:0, y:0, w:0, h:0}

}


export default Blur