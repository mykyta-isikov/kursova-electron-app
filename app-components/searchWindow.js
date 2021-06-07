const electron = require('electron')
const url = require('url')
const path = require('path')
const mainMenuTemplate = require('./mainMenuTemplate')

const { BrowserWindow, Menu, ipcMain } = electron

let searchWindow

/* Create search window */
function create () {
  /* Window properties */
  searchWindow = new BrowserWindow({
    icon: path.join(__dirname, '../assets/win/icon.ico'),
    width: 300,
    height: 300,
    title: 'Search by date',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  /* Build menu from template */
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate.create())
  Menu.setApplicationMenu(mainMenu)

  /* Load html into window */
  searchWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../views/searchWindow.html'),
    protocol: 'file:',
    slashes: true
  }))

  ipcMain.once('form-contents', () => {
    searchWindow.close()
  })

  /* Garbage collection */
  searchWindow.on('close', function () {
    searchWindow = null
  })

  return searchWindow
}

module.exports = { create }
