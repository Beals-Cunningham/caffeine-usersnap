import '/jquery/js'
const $ = window.jQuery

function websiteScroll(e){
    //on scroll, scroll in the iframe with id #website
    e.preventDefault()
    let iframe = $('#website')
    iframe.scrollTop(iframe.scrollTop() + e.deltaY)
    
}

$(document).ready(function(){
    //on any scroll, call websiteScroll
    $(document).on('wheel', websiteScroll)
    $('#overlay-canvas').on('wheel', websiteScroll)

}
)