/* Import */
const electron = require('electron')
const { app, ipcMain } = electron

const mainWindowLib = require('./app-components/mainWindow')
const resultWindowLib = require('./app-components/resultWindow')

/* Production mode switch */
//process.env.NODE_ENV = 'production'

/* Listen for the app to be ready */
app.on('ready', function () {
  mainWindowLib.create()
})

/* Catching searchWindow exports */
ipcMain.on('form-contents', (event, dates) => {
  console.log(`{ ${dates.dateFrom}, ${dates.dateTo} }`)

  console.log('form-contents caught')

  resultWindowLib.create()

  ipcMain.on('resultWindow-ready', (event) => {
    console.log('resultWindow is ready, dates sent: ' + `{ ${dates.dateFrom}, ${dates.dateTo} }`)
    event.reply('dates-for-search', dates)
    ipcMain.removeAllListeners('resultWindow-ready')
  })
})
