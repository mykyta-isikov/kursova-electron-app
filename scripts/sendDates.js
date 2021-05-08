const { ipcRenderer } = require('electron')

function sendDates () {
  const dates = {
    dateFrom: document.querySelector('#dateFrom').value,
    dateTo: document.querySelector('#dateTo').value
  }

  ipcRenderer.send('form-contents', dates)
  console.log('Data is sent!')
}
