function showError (containerId, errorText) {
  const div = document.getElementById(containerId)
  const p = document.createElement('p')

  p.appendChild(document.createTextNode(errorText))
  p.style.cssText += 'background-color:#ffcccc;border-left:5px solid red; padding: 5px'

  div.appendChild(p)
}
