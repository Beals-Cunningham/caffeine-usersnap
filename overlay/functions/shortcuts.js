const Shortcuts =
{"d": function(){
    $('#tool-brush').trigger('click')
    $('#help').css('opacity', '0')
},
"r": function(){
    $('#tool-rectangle').trigger('click')
    $('#help').css('opacity', '0')
},
"c": function(){
    $('#tool-circle').trigger('click')
    $('#help').css('opacity', '0')
},
"t": function(){
    $('#tool-text').trigger('click')
    $('#help').css('opacity', '0')
},
"x": function(){
    $('#tool-comment').trigger('click')
    $('#help').css('opacity', '0')
},
"b": function(){
    $('#tool-blur').trigger('click')
    $('#help').css('opacity', '0')
},
"a": function(){
    $('#tool-arrow').trigger('click')
    $('#help').css('opacity', '0')
},
"s": function(){
    $('#tool-shade').trigger('click')
    $('#help').css('opacity', '0')
},
"e": function(){
    $('#tool-export').trigger('click')
    $('#help').css('opacity', '0')
},
"=": function(){
    $('#to-plus').trigger('click')
    $('#help').css('opacity', '0')
},
"-": function(){
    $('#to-minus').trigger('click')
    $('#help').css('opacity', '0')
},
"h": function(){
    if ($("#help").css('opacity') == '0'){
        $("#help").css('opacity', '1')
    } else {
        $("#help").css('opacity', '0')
    }
}
}

export default Shortcuts