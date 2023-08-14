import '/jquery/js'
const $ = window.jQuery
import Brush from '/tool/brush'
import Rectangle from '/tool/rectangle'
import Circle from '/tool/circle'
import Text from '/tool/text'
import Comment from '/tool/comment'
import Blur from '/tool/blur'
import Accept from '/tool/accept'
import Reject from '/tool/reject'
import Arrow from '/tool/arrow'
import Export from '/tool/export'
import Shortcuts from '/tool/shortcuts'

let c = null
let clicker = null
let strokeColor = '#c87832'
let lineWidth = 5
let textStyles = ["Georgia", "Arial", "Helvetica", "Times New Roman", "Times", "Courier New", "Courier", "Verdana", "Palatino", "Garamond", "Bookman", "Comic Sans MS", "Trebuchet MS", "Arial Black", "Impact"]
let fontStyle = textStyles[2]
let site = null
let hostname = null

let viewport_size = [2560,1298]

$(document).ready(function(){
    viewport_size = [$(window).width(), $(window).height()]

    let body = $('body')
    body.append('<div id="marker-top-left"></div>')
    let markerTopLeft = $('#marker-top-left')
    markerTopLeft.css('position', 'absolute')
    markerTopLeft.css('left', '4px')
    markerTopLeft.css('top', '4px')
    markerTopLeft.css('width', '1px')
    markerTopLeft.css('height', '1px')
    markerTopLeft.css('background-color', 'rgb(255,0,255)')
    markerTopLeft.css('z-index', '999')

    body.append('<div id="marker-top-right"></div>')
    let markerTopRight = $('#marker-top-right')
    markerTopRight.css('position', 'absolute')
    markerTopRight.css('right', '4px')
    markerTopRight.css('top', '4px')
    markerTopRight.css('width', '1px')
    markerTopRight.css('height', '1px')
    markerTopRight.css('background-color', 'rgb(255,0,255)')
    markerTopRight.css('z-index', '999')

    body.append('<div id="marker-bottom-left"></div>')
    let markerBottomLeft = $('#marker-bottom-left')
    markerBottomLeft.css('position', 'absolute')
    markerBottomLeft.css('left', '4px')
    markerBottomLeft.css('bottom', '4px')
    markerBottomLeft.css('width', '1px')
    markerBottomLeft.css('height', '1px')
    markerBottomLeft.css('background-color', 'rgb(255,0,255)')
    markerBottomLeft.css('z-index', '999')

    body.append('<div id="marker-bottom-right"></div>')
    let markerBottomRight = $('#marker-bottom-right')
    markerBottomRight.css('position', 'absolute')
    markerBottomRight.css('right', '4px')
    markerBottomRight.css('bottom', '4px')
    markerBottomRight.css('width', '1px')
    markerBottomRight.css('height', '1px')
    markerBottomRight.css('background-color', 'rgb(255,0,255)')

    $.ajax({
        type: "POST",
        url: window.location.protocol + "//" + window.location.hostname + ":5000/post_viewport_size",
        data: JSON.stringify(viewport_size),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data)
        },
        failure: function(errMsg) {
            console.log(errMsg);
        }
    })
    $(window).resize(function() {
        viewport_size = [$(window).width(), $(window).height()]
        $.ajax({
            type: "POST",
            url: window.location.protocol + "//" + window.location.hostname + ":5000/post_viewport_size",
            data: JSON.stringify(viewport_size),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                console.log(data)
            },
            failure: function(errMsg) {
                console.log(errMsg);
            }
        })
    })


    let url = new URL(window.location.href)
    site = url.searchParams.get("site")
    //remove http:// or https://
    hostname = site.replace(/(^\w+:|^)\/\//, '')
    // remove www.
    hostname = hostname.replace(/www./, '')
    // remove everything after first slash
    hostname = hostname.replace(/\/.*/, "")
    // remove trailing slash
    hostname = hostname.replace(/\/$/, "")
    //strip everything after first period
    hostname = hostname.replace(/\..*/, "")
    // convert periods to underscores
    hostname = hostname.replace(/\./g, "_")

    $('#website').attr('src', site)

    let grabber = $('#grabber')

    grabber.on('mousedown', function(e){
        $('#website').css('pointer-events', 'none')
    })

    let select = $('#tool-select-done')
    let brush = $('#tool-brush')
    let square = $('#tool-rectangle')
    let circle = $('#tool-circle')
    let text = $('#tool-text')
    let comment = $('#tool-comment')
    let blur = $('#tool-blur')
    let arrow = $('#tool-arrow')
    let shade = $('#tool-shade')
    let exprt = $('#tool-export')
    let tools = [select, brush, square, circle, text, comment, blur, arrow, shade, exprt]

    let strokeColorEl = $('#to-stroke')

    strokeColorEl.on('change', function(e){
        // convert e.target.value (string) to rgb (array)
        let rgb_array = e.target.value.match(/\d+/g).map(Number)
        if (rgb_array[0] > 200 && rgb_array[1] < 60 && rgb_array[2] > 200){
            strokeColor = '#ff7db4'
        } else {
            strokeColor = e.target.value}
    })

    let lineSizePlus = $('#to-plus')
    let lineSizeMinus = $('#to-minus')

    lineSizePlus.on('click', function(){
        console.log(lineWidth)
        lineWidth += 1
        if (lineWidth > 50){
            lineWidth = 50
        }
        $('#to-line-width').text(lineWidth)
        console.log(lineWidth)
    })

    lineSizeMinus.on('click', function(){
        console.log(lineWidth)
        lineWidth -= 1
        if (lineWidth < 1){
            lineWidth = 1
        }
        $('#to-line-width').text(lineWidth)
        if (lineWidth < 1){
            lineWidth = 1
        }
        console.log(lineWidth)
    })

    const canvas = document.getElementById("overlay-canvas")
    c = canvas.getContext("2d")

    //loop over key/value pairs in Shortcuts and assign the key to fire the value function onkeydown
    Object.entries(Shortcuts).forEach(([key, value]) => {
        document.addEventListener('keydown', function(e){
            if (e.key === key){
                //check if user is not currently typing in a text box or content editable div
                if (document.activeElement.tagName != "INPUT" && document.activeElement.tagName != "TEXTAREA" && document.activeElement.tagName != "DIV"){
                    value()
                }
            }
        })
    })

    tools.forEach(function(tool){

        tool.on('click', function(e){
            clicker = e
            $('#help').css('opacity', '0')
            if (c.canvas.width != $('#website').width() || c.canvas.height != $('#website').height()){
            c.canvas.width = $('#website').width()
            c.canvas.height = $('#website').height()}
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
    else if (t == 'tool-blur'){
        useBlur()
    }
    else if (t == 'tool-arrow'){
        useArrow()
    }
    else if (t == 'tool-shade'){
        useShade()
    }
    else if (t == 'tool-select-done'){
        useSelect()
    }
    else if (t == 'tool-export'){
        useExport()
    }
}

function useBrush(){
    $('#ts-p').css('display', 'none')
    $('#tool-select-done').css('width', 'calc(200% - 8px)')
    $('#tool-select-done').css('margin-right', '48px')
    $('#ts-t').css('display', '')
    $('#ts-s').css('display', '')
    Brush(c, strokeColor, lineWidth)
}

function useRectangle(){
    $('#ts-p').css('display', 'none')
    $('#tool-select-done').css('width', 'calc(200% - 8px)')
    $('#tool-select-done').css('margin-right', '48px')
    $('#ts-s').css('display', '')
    $('#ts-t').css('display', '')
    Rectangle(c, strokeColor, lineWidth)
}

function useCircle(){
    $('#ts-p').css('display', 'none')
    $('#tool-select-done').css('width', 'calc(200% - 8px)')
    $('#tool-select-done').css('margin-right', '48px')
    $('#ts-s').css('display', '')
    $('#ts-t').css('display', '')
    Circle(c, strokeColor, lineWidth)
}

function useText(){
    $('#ts-p').css('display', 'none')
    $('#tool-select-done').css('width', 'calc(200% - 8px)')
    $('#tool-select-done').css('margin-right', '48px')
    $('#ts-s').css('display', '')
    $('#ts-t').css('display', '')
    Text(c, strokeColor, lineWidth)
}

function useComment(){
    $('#ts-p').css('display', 'none')
    $('#tool-select-done').css('width', 'calc(200% - 8px)')
    $('#tool-select-done').css('margin-right', '48px')
    $('#ts-s').css('display', '')
    $('#ts-t').css('display', '')
    Comment(c, strokeColor, lineWidth)
}

function useBlur(){
    $('#tool-options').removeClass()
    $('#tool-options').addClass('tool-option-disabled')
    $('#ts-p').css('display', 'none')
    $('#tool-select-done').css('width', 'calc(200% - 8px)')
    $('#tool-select-done').css('margin-right', '48px')
    $('#ts-s').css('display', '')
    $('#ts-t').css('display', '')
    $('#overlay-canvas').off('mousedown')
    $('#overlay-canvas').off('mousemove')
    $('#overlay-canvas').off('mouseup')
    Blur(c, strokeColor, lineWidth)
}

function useArrow(){
    $('#ts-p').css('display', 'none')
    $('#tool-select-done').css('width', 'calc(200% - 8px)')
    $('#tool-select-done').css('margin-right', '48px')
    $('#ts-s').css('display', '')
    $('#ts-t').css('display', '')
    Arrow(c, strokeColor, lineWidth)

}

function useShade(){
    $('#tool-options').removeClass()
    $('#tool-options').addClass('tool-option-disabled')
    $('#ts-p').css('display', 'none')
    $('#tool-select-done').css('width', 'calc(200% - 8px)')
    $('#tool-select-done').css('margin-right', '48px')
    $('#ts-s').css('display', '')
    $('#ts-t').css('display', '')
    $('#overlay-canvas').off('mousedown')
    $('#overlay-canvas').off('mousemove')
    $('#overlay-canvas').off('mouseup')
    c.fillStyle = 'rgba(0, 0, 0, 0.25)'
    c.fillRect(0, 0, c.canvas.width, c.canvas.height)
}

function useSelect(){
    //get the element under the mouse
    let _x = clicker.originalEvent.clientX
    let boundingRect = document.getElementById('tool-select-done').getBoundingClientRect()
    let _min_x = boundingRect.left
    let _max_x = boundingRect.right
    let _dist_min = Math.abs(_x - _min_x)
    let _dist_max = Math.abs(_x - _max_x)
    if ((_dist_min < _dist_max) && ($('#ts-s').css('display') !== 'none')){
        Accept(hostname)
    }
    else{
        Clear()
    }

}

function useExport(){
    $('#tool-options').removeClass()
    $('#tool-options').addClass('tool-option-disabled')
    Export(hostname)
}

function Clear(){
    $('#website').css('pointer-events', 'auto')
    $('#ts-p').css('display', '')
    $('#tool-select-done').css('width', 'calc(100% - 8px)')
    $('#tool-select-done').css('margin-right', '0px')
    $('#ts-s').css('display', 'none')
    $('#ts-t').css('display', 'none')
    $('#tool-options').removeClass()
    $('#tool-options').addClass('tool-option-disabled')
    $('#overlay-canvas').off('mousedown')
    $('#overlay-canvas').off('mousemove')
    $('#overlay-canvas').off('mouseup')
    //select all elements with id #blur-*
    $('[id^=blur-]').remove()
    $('[id^=text-]').remove()
    $('[id^=comment-]').remove()
    $('[id^=arrow-]').remove()
    c.canvas.width = 0
    c.canvas.height = 0
}

export {strokeColor, lineWidth, fontStyle, Clear}