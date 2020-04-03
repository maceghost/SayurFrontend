const electron = require('electron')
const { app, BrowserWindow } = electron
const url = require('url')
const path = require('path')

let win

// import { remote } from 'electron';
app.commandLine.appendSwitch('touch-events', 'enabled');


// app.on('ready', () => {
//   const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
//   win = new BrowserWindow({ width, height, fullscreen: true, kiosk: true  })
//   win.loadURL(url.format ({
//      pathname: path.join(__dirname, 'index.html'),
//      protocol: 'file:',
//      slashes: true
//   }))
//   // var window = electron.remote.getCurrentWindow();
//   // window.setFullScreen(true);
//
// })



// const electron = require('electron');
// // Module to control application life.
// const app = electron.app;
// // Module to create native browser window.
// const BrowserWindow = electron.BrowserWindow;
//
// const path = require('path');
// const url = require('url');
// let width = 1200;
// let height = 700;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {

  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    minWidth: width,
    minHeight: height,
    frame: false,
    resizable: false,
    show: true,
    center: true,
    fullscreen: true,
    kiosk: true,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png')
  });

// and load the index.html of the app.
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../www/index.html'),
    protocol: 'file:',
    slashes: true
  });
  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  // gregm, can I select this based on command line parameters?
  // mainWindow.webContents.openDevTools();

  // win = new BrowserWindow({ width, height, fullscreen: true, kiosk: true  })
  // win.loadURL(url.format ({
  //    pathname: path.join(__dirname, 'index.html'),
  //    protocol: 'file:',
  //    slashes: true
  // }))
  // var window = electron.remote.getCurrentWindow();
  // window.setFullScreen(true);

// Emitted when the window is closed.
  mainWindow.on('closed', function () {
  // Dereference the window object, usually you would store windows
  // in an array if your app supports multi windows, this is the time
  // when you should delete the corresponding element.
    mainWindow = null
  })
  // mainWindow.setSize(1200, 700);
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready',  () => {
  createWindow();
  // let argv = remote.process.argv
  // console.log('argv : ',argv);

});

app.on('ready-to-show', () => { mainWindow.maximize(); })

// Quit when all windows are closed.
app.on('window-all-closed', function () {
// On OS X it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
// On OS X it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
