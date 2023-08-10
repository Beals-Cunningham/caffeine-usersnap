import '/jquery/js'
const $ = window.jQuery

function websiteScroll(e){
    let iframe = $('#website')
    iframe.scrollTop(iframe.scrollTop() + e.deltaY)
    
}

$(document).ready(function(){
    $(document).on('wheel', websiteScroll)
    $('#overlay-canvas').on('wheel', websiteScroll)
    }
)