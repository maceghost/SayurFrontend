// const startUrl = process.env.ELECTRON_START_URL || url.format({
//   pathname: path.join(__dirname, '/../www/index.html'),
//   protocol: 'file:',
//   slashes: true
// });
//
// // Open the DevTools.
// // mainWindow.webContents.openDevTools();

const electron = require('electron')
const { app, BrowserWindow } = electron
const url = require('url')
const path = require('path')

let win

app.commandLine.appendSwitch(‘touch-events’, ‘enabled’);

app.on('ready', () => {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({ width, height, fullscreen: true, kiosk: true  })
  win.loadURL(url.format ({
     pathname: path.join(__dirname, 'index.html'),
     protocol: 'file:',
     slashes: true
  }))
  var window = electron.remote.getCurrentWindow();
  window.setFullScreen(true);

})
