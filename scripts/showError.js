function showError(containerId, errorText){
    var div = document.getElementById(containerId)
    var p = document.createElement('p')
    p.appendChild(document.createTextNode(errorText))
    p.style.cssText += 'background-color:#ffcccc;border-left:5px solid red; padding: 5px'
    div.appendChild(p)
}
