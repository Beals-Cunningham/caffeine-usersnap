import '/jquery/js'
const $ = window.jQuery
import Brush from '/tool/brush'
import Rectangle from '/tool/rectangle'
import Circle from '/tool/circle'
import Text from '/tool/text'

let c = null
let strokeColor = '#c87832'
let lineWidth = 3
let textStyles = ["Georgia", "Arial"]
let fontStyle = textStyles[0]

$(document).ready(function(){
    let select = $('#tool-select-done')
    let brush = $('#tool-brush')
    let square = $('#tool-rectangle')
    let circle = $('#tool-circle')
    let text = $('#tool-text')
    let comment = $('#tool-comment')
    let counter = $('#tool-counter')
    let arrow = $('#tool-arrow')
    let tools = [select, brush, square, circle, text, comment, counter, arrow]

    let strokeColorEl = $('#to-stroke')

    strokeColorEl.on('change', function(e){
        strokeColor = e.target.value
    })

    let lineSizePlus = $('#to-plus')
    let lineSizeMinus = $('#to-minus')

    lineSizePlus.on('click', function(){
        lineWidth += 2
        $('#to-line-width').text(lineWidth)
        console.log(lineWidth)
    })

    lineSizeMinus.on('click', function(){
        lineWidth -= 2
        $('#to-line-width').text(lineWidth)
        if (lineWidth < 1){
            lineWidth = 1
        }
        console.log(lineWidth)
    })

    let textStyleEl = $('#to-text')
    textStyleEl.on('click', function(e){
        if (fontStyle == "Georgia"){
            fontStyle = "Arial"
            $('#to-text').css('display', 'none')
            $('#to-text2').css('display', 'block')
        } else {
            fontStyle = "Georgia"
            $('#to-text').css('display', 'block')
            $('#to-text2').css('display', 'none')
        }
    })

    let textStyleEl2 = $('#to-text2')
    textStyleEl2.on('click', function(e){
        if (fontStyle == "Georgia"){
            fontStyle = "Arial"
            $('#to-text').css('display', 'none')
            $('#to-text2').css('display', 'block')
        } else {
            fontStyle = "Georgia"
            $('#to-text').css('display', 'block')
            $('#to-text2').css('display', 'none')
        }
    })

    const canvas = document.getElementById("overlay-canvas")
    c = canvas.getContext("2d")

    tools.forEach(function(tool){
        tool.on('click', function(){
            tool.addClass('active')
            setActiveTool(tool)
            tools.forEach(function(tool2){
                if (tool2 != tool){
                    tool2.removeClass('active')
                }
            })
        })
    })
})

function setActiveTool(p, strokeColor){
    let t = p.attr('id')
    if (t == 'tool-brush'){
        useBrush()
    }
    else if (t == 'tool-rectangle'){
        useRectangle()
    }
    else if (t == 'tool-circle'){
        useCircle()
    }
    else if (t == 'tool-text'){
        useText()
    }
    else if (t == 'tool-comment'){
        useComment()
    }
    else if (t == 'tool-counter'){
        useCounter()
    }
    else if (t == 'tool-arrow'){
        useArrow()
    }
    else if (t == 'tool-select-done'){
        useSelect()
    }
}

function useBrush(){
    Brush(c, strokeColor, lineWidth)
}

function useRectangle(){
    Rectangle(c, strokeColor, lineWidth)
}

function useCircle(){
    Circle(c, strokeColor, lineWidth)

}

function useText(){
    Text(c, strokeColor, lineWidth)

}

function useComment(){

}

function useCounter(){

}

function useArrow(){

}

function useSelect(){
    $('#tool-options').removeClass()
    $('#tool-options').addClass('tool-option-disabled')
    $('#overlay-canvas').off('mousedown')
    $('#overlay-canvas').off('mousemove')
    $('#overlay-canvas').off('mouseup')
}

export {strokeColor, lineWidth, fontStyle}