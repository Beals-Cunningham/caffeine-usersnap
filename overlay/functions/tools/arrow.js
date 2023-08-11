let c = null
let randomHex = () => {
    return Math.floor(Math.random()*16777215).toString(16)
}
import {strokeColor, lineWidth} from "/overlay/functions/tool"

const Arrow = (p, strokeColor, lineWidth) => {
    c = p
    console.log('Arrow', c)
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
let startX = null
let startY = null
let endX = null
let endY = null
let _c = null

function mouseDown(e){
    console.log('mouseDown')
    startX = e.pageX
    startY = e.pageY
    drawing = true
    c.strokeStyle = strokeColor
    c.lineWidth = lineWidth * 2

    //create a temporary div to hold an arrow (made with a triangle element where the base is the line width and the fill color is strokeColor, and a line element where the stroke color is strokeColor and the stroke width is lineWidth)
    let _id = "arrow-" + randomHex()
    $('body').append('<div id="'+_id+'"></div>')
    _c = $('#'+_id)
    $(_c).css('position', 'absolute')
    $(_c).css('left', 0)
    $(_c).css('top', 0)
    $(_c).css('width', '100%')
    $(_c).css('height', '100%')
    $(_c).css('pointer-events', 'none')
    $(_c).css('z-index', '120')
}

function mouseMove(e){
    if (drawing){
    //First, create an SVG line from the start point to the current mouse position
    let endX = e.pageX
    let endY = e.pageY
    //find the endpoint of a line going from (startX, startY) to most of the way to (endX, endY), short by lineWidth
    let xDiff = endX - startX
    let yDiff = endY - startY
    let xDiffLineWidth = xDiff * (1 - (lineWidth / Math.sqrt(xDiff * xDiff + yDiff * yDiff)))
    let yDiffLineWidth = yDiff * (1 - (lineWidth / Math.sqrt(xDiff * xDiff + yDiff * yDiff)))
    let tendX = startX + xDiffLineWidth
    let tendY = startY + yDiffLineWidth

    c.strokeStyle = strokeColor
    c.lineWidth = lineWidth * 2
    let svg = '<svg height="100%" width="100%">'
    svg += '<line x1="' + startX + '" y1="' + startY + '" x2="' + tendX + '" y2="' + tendY + '" style="stroke:' + strokeColor + ';stroke-width:' + lineWidth + '" />'
    //Then, add an arrow to the end of the line using a triangle in SVG
    //First, find the angle of the line
    let angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI
    //Then, find the coordinates of the end of the line
    let endX2 = endX - c.lineWidth * Math.cos(angle * Math.PI / 180)
    let endY2 = endY - c.lineWidth * Math.sin(angle * Math.PI / 180)
    //Then, find the coordinates of the two points of the triangle
    let point1X = endX2 - c.lineWidth * Math.cos((angle + 30) * Math.PI / 180)
    let point1Y = endY2 - c.lineWidth * Math.sin((angle + 30) * Math.PI / 180)
    let point2X = endX2 - c.lineWidth * Math.cos((angle - 30) * Math.PI / 180)
    let point2Y = endY2 - c.lineWidth * Math.sin((angle - 30) * Math.PI / 180)
    //Then, create the SVG triangle
    svg += '<polygon points="' + endX2 + ',' + endY2 + ' ' + point1X + ',' + point1Y + ' ' + point2X + ',' + point2Y + '" style="fill:' + strokeColor + ';stroke:' + strokeColor + ';stroke-width:' + c.lineWidth + '" />'
    svg += '</svg>'

    $(_c).html(svg)}
}

function mouseUp(e){
    drawing = false
}

export default Arrow