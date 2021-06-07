const electron = require('electron')
const url = require('url')
const path = require('path')
const mainMenuTemplate = require('./mainMenuTemplate')

const { BrowserWindow, Menu } = electron

let browseWindow

/* Create browse window */
function create () {
  /* Window properties */
  browseWindow = new BrowserWindow({
    icon: path.join(__dirname, '../assets/win/icon.ico'),
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  /* Build menu from template */
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate.create())
  Menu.setApplicationMenu(mainMenu)

  /* Load html into window */
  browseWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../views/browseWindow.html'),
    protocol: 'file:',
    slashes: true
  }))

  /* Garbage collection */
  browseWindow.on('close', function () {
    browseWindow = null
  })

  return browseWindow
}

module.exports = { create }
