const electron = require('electron')
const url = require('url');
const path = require('path')
const mainMenuTemplate = require('./mainMenuTemplate')

const {BrowserWindow, Menu} = electron

let resultWindow;

// Handle create result window
function create(){
        // Create new window
        resultWindow = new BrowserWindow({
            icon: path.join(__dirname, '../assets/win/icon.ico'),
            width: 1000,
            height: 700,
            webPreferences:{
                nodeIntegration: true,
                contextIsolation: false
            }
        })

        // Build menu from template
        const mainMenu = Menu.buildFromTemplate(mainMenuTemplate.create())
        // Insert menu
        Menu.setApplicationMenu(mainMenu);

        // Load html into window
        resultWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../views/resultWindow.html'),
            protocol: 'file:',
            slashes: true
        }))

        // Garbage collection handler
        resultWindow.on('close', function(){
            resultWindow = null
        })

        return resultWindow
}

module.exports = { create };