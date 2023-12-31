const Export = (hostname) => {
    console.log(hostname)
    $('#loading-toast').css('width', 'auto')
    $('#loading-toast').css('opacity', '1')
    $('#loading-toast-p').css('opacity', '1')
    $.ajax({
        url: window.location.protocol + "//" + window.location.hostname + ":8669/export_to_pdf",
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

    var xhr = new XMLHttpRequest()
    xhr.open('POST', window.location.protocol + "//" + window.location.hostname + ":8669/get_exported_pdf")
    xhr.responseType = 'blob'
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(JSON.stringify(window.location.hostname))
    xhr.onload = function(e) {
        if (this.status == 200) {
          var blob = new Blob([this.response], {type: 'application/pdf'})
        var url = URL.createObjectURL(blob)
        window.location = url
        }
    }
}

export default Export