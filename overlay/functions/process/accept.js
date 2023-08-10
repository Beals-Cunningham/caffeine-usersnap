const Accept = (c) => {
    postToPython()
}

import {Clear} from '/overlay/functions/tool'

function postToPython(){
    let url = window.location.protocol + "//" + window.location.hostname + ":5000"
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
}


export default Accept