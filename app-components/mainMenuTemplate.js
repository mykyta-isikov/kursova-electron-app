const electron = require('electron')
const { app } = electron

function create () {
  const searchWindowLib = require('./searchWindow')
  const browseWindowLib = require('./browseWindow')
  const mainWindowLib = require('./mainWindow')

  const mainMenuTemplate = [
    {
      label: 'Інструменти',
      submenu: [
        {
          label: 'Пошук',
          accelerator: 'CmdOrCtrl+S',
          click () {
            searchWindowLib.create()
          }
        },
        {
          label: 'Відобразити всіх',
          accelerator: 'CmdOrCtrl+G',
          click () {
            browseWindowLib.create()
          }
        },
        {
          label: 'Вікно привітання',
          accelerator: 'CmdOrCtrl+E',
          click () {
            mainWindowLib.create()
          }
        },
        {
          label: 'Вийти з програми',
          accelerator: 'Shift+CmdOrCtrl+Q',
          click () {
            app.quit()
          }
        }
      ]
    }
  ]

  // If mac, add empty object to menu
  if (process.platform === 'darwin') {
    mainMenuTemplate.unshift({})
  }

  // Add developer tools item if not in production
  if (process.env.NODE_ENV !== 'production') {
    const devtools = {
      label: 'Developer Tools',
      submenu: [
        {
          label: 'Toggle Devtools',
          accelerator: 'F12',
          click (item, focusedWindow) {
            focusedWindow.toggleDevTools()
          }
        },
        {
          role: 'reload'
        }
      ]
    }
    mainMenuTemplate.push(devtools)
  }

  return mainMenuTemplate
}

module.exports = { create }
