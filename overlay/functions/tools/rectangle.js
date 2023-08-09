let c = null

const Rectangle = (p) => {
    c = p
    c.canvas.width = $(window).width()
    c.canvas.height = $(window).height()
    console.log('Rectangle', c)
    $('#overlay-canvas').on('mousedown', mouseDown)
    $('#overlay-canvas').on('mousemove', mouseMove)
    $('#overlay-canvas').on('mouseup', mouseUp)
    $('#tool-options').addClass('tool-option-enabled')
    $('#tool-options').removeClass('tool-option-disabled')
}

function getMousePos(canvas, evt) {
    var r = canvas.getBoundingClientRect()
    return {
      x: evt.pageX - r.left,
      y: evt.pageY - r.top
    }
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
    rect = {x:x, y:x, w:w, h:h}
    console.log(rect)
    drawing = true
    //draw the rectangle on the canvas with a red fill
    c.fillStyle = 'red'
    c.fillRect(rect.x, rect.y, rect.w, rect.h)
}

function mouseMove(e){
    //on mouse move, update the rectangle to have the bottom right corner at the mouse position
    if (drawing){
        c.clearRect(0, 0, c.canvas.width, c.canvas.height)
        x = e.pageX
        y = e.pageY
        w = x - rect.x
        h = y - rect.y
        rect.w = w
        rect.h = h
        //draw the rectangle on the canvas with a red fill
        c.fillStyle = 'red'
        c.fillRect(rect.x, rect.y, rect.w, rect.h)
    }
}

function mouseUp(){
    //on mouse up, stop drawing the rectangle
    drawing = false
}


export default Rectangle