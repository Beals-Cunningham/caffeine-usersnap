const Export = (hostname) => {
    console.log(hostname)
    $('#loading-toast').css('width', 'auto')
    $('#loading-toast').css('opacity', '1')
    $('#loading-toast-p').css('opacity', '1')
    $.ajax({
        url: window.location.protocol + "//" + window.location.hostname + ":5000/export_to_pdf",
        type: 'POST',
        data: JSON.stringify(hostname),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback(),
        error: function(error){
            console.log(error)
        }
    })
}

function callback(){
    $('#loading-toast').css('width', '0vw')
    $('#loading-toast').css('opacity', '0')
    $('#loading-toast-p').css('opacity', '0')
    //delay one second
    setTimeout(function(){
        $('#loading-toast').css('width', 'auto')
        $('#loading-toast').css('opacity', '1')
        $('#loading-toast-p').css('opacity', '1')
        $('#loading-toast-p').text('Your PDF is ready!')
        $('#tool-export').removeClass('active')
        setTimeout(function(){
            $('#loading-toast').css('width', '0vw')
            $('#loading-toast').css('opacity', '0')
            $('#loading-toast-p').css('opacity', '0')
            $('#loading-toast-p').text('Loading...')
        }, 1000)
    }, 1000)
    
}

export default Export