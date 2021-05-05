const electron = require('electron')

const {app, ipcMain} = electron

const mainWindowLib = require('./app-components/mainWindow')
const resultWindowLib = require('./app-components/resultWindow')

process.env.NODE_ENV = 'production'

// Listen for the app to be ready
app.on('ready', function(){
    mainWindow = mainWindowLib.create()
})

ipcMain.on("test-signal", (event, data) => {
    console.log(`{ ${data.dateFrom}, ${data.dateTo} }`)
    event.reply("test-reply", "reply")

    console.log("test-signal caught")

    resultWindow = resultWindowLib.create()

    ipcMain.on("resultWindow-ready", (event) => {
        console.log("resultWindow is ready, dates sent: " + `{ ${data.dateFrom}, ${data.dateTo} }`)
        event.reply("dates-for-search", data)
        ipcMain.removeAllListeners("resultWindow-ready")
    });
})

