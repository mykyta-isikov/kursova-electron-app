function showError (containerId, errorText) {
  const div = document.getElementById(containerId)
  const p = document.createElement('p')

  p.appendChild(document.createTextNode(errorText))
  p.style.cssText += 'background-color:#ffcccc;border-left:5px solid red; padding: 5px'

  div.appendChild(p)

  document.getElementById('table-and-debug').style.display = 'block'
  document.getElementById('preloader').style.display = 'none'
}
