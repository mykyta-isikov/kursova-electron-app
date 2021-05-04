const electron = require('electron')
const url = require('url');
const path = require('path')
const Conscript = require('./models/Conscript')

const {app, BrowserWindow, Menu, ipcMain} = electron

const mainWindowLib = require('./app-components/mainWindow')
const searchWindowLib = require('./app-components/searchWindow')
const resultWindowLib = require('./app-components/resultWindow')

// mongoose
const mongoose = require('mongoose');
const { ipcRenderer } = require('electron');

process.env.NODE_ENV = 'production'

// Listen for the app to be ready
app.on('ready', function(){
    mainWindow = mainWindowLib.create()
})

ipcMain.on("test-signal", (event, data) => {
    console.log(`{ ${data.dateFrom}, ${data.dateTo} }`)
    event.reply("test-reply", "reply")
    //ipcMain.removeAllListeners("test-signal")
    console.log("test-signal caught")

    resultWindow = resultWindowLib.create()
/*
    if (mainWindow !== null) {
        mainWindow.destroy()
        mainWindow = null
    } 
*/
    ipcMain.on("resultWindow-ready", (event) => {
        console.log("resultWindow is ready, dates sent: " + `{ ${data.dateFrom}, ${data.dateTo} }`)
        event.reply("dates-for-search", data)
        ipcMain.removeAllListeners("resultWindow-ready")
    });
})

