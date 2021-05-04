const electron = require('electron')
const url = require('url');
const path = require('path')
const mainMenuTemplate = require('./mainMenuTemplate')

const {BrowserWindow, Menu} = electron

let mainWindow

// Handle create main window
function create(){
    // Create new window
    mainWindow = new BrowserWindow({
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
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../views/mainWindow.html'),
        protocol: 'file:',
        slashes: true        
    }))
    // Garbage collection handler
    mainWindow.on('close', function(){
        mainWindow = null
    })

    return mainWindow
}

module.exports = { create };