const electron = require('electron')
const url = require('url');
const path = require('path')
const mainMenuTemplate = require('./mainMenuTemplate')

const {BrowserWindow, Menu, ipcMain} = electron

let searchWindow

// Handle create search window
function create(){
    // Create new window
    searchWindow = new BrowserWindow({
        width: 300,
        height: 300,
        title: 'Search by date',
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
    searchWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../views/searchWindow.html'),
        protocol: 'file:',
        slashes: true
    }))

    ipcMain.once("test-signal", () => {
        searchWindow.close()
    })
    
    // Garbage collection handler
    searchWindow.on('close', function(){
        searchWindow = null
    })

    return searchWindow
}

module.exports = { create };