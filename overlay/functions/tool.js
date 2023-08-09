import '/jquery/js'
const $ = window.jQuery
import Brush from '/tool/brush'
import Rectangle from '/tool/rectangle'

let c = null

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

function setActiveTool(p){
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
    Brush(c)
}

function useRectangle(){
    Rectangle(c)
}

function useCircle(){

}

function useText(){

}

function useComment(){

}

function useCounter(){

}

function useArrow(){

}

function useSelect(){

}