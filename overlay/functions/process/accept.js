const Accept = (c) => {
    postToPython()
}

import {Clear} from '/overlay/functions/tool'

function postToPython(){
    let url = window.location.protocol + "//" + window.location.hostname + ":5000"
    $('#loading-toast').css('width', 'auto')
    $('#loading-toast').css('opacity', '.6')
    $('#loading-toast-p').css('opacity', '1')
    $.ajax({
        url: url,
        type: 'GET',
        success: callback,
        error: function(error){
            console.log(error)
        }
    })
}

function callback(data){
    Clear()
    $('#loading-toast').css('width', '0vw')
    $('#loading-toast').css('opacity', '0')
    $('#loading-toast-p').css('opacity', '0')
}


export default Accept