import '/jquery/js'
const $ = window.jQuery

function drag(e){
    //move the toolbar to the mouse position
    let max_x = $(window).width() - ($('.overlay-toolbar-right-container').width())
    if (e.pageX > 0 && e.pageX < max_x ){
    $('.overlay-toolbar-right-container').css('left', e.pageX)
    }
    let max_y = $(window).height() - ($('.overlay-toolbar-right-container').height())
    if (e.pageY > 0 && e.pageY < max_y ){
    $('.overlay-toolbar-right-container').css('top', e.pageY)
    }

}

$(document).ready(function(){
    $('#grabber').on('drag', drag)
}
)

