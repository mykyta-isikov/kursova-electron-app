const electron = require('electron')
const url = require('url')
const path = require('path')
const mainMenuTemplate = require('./mainMenuTemplate')

const { BrowserWindow, Menu } = electron

let mainWindow

/* Create main window */
function create () {
  /* Window properties */
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, '../assets/win/icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  /* Build menu from template */
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate.create())
  Menu.setApplicationMenu(mainMenu)

  /* Load html into window */
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../views/mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }))
  /* Garbage collection */
  mainWindow.on('close', function () {
    mainWindow = null
  })

  return mainWindow
}

module.exports = { create }
