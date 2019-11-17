const {
  app,
  BrowserWindow
} = require('electron')
const url = require("url");
const path = require("path");

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    frame: false,
    minWidth: 1020,
    minHeight: 450,
    icon: 'src/assets/images/nest-cloud.ico',
    webPreferences: {
      nodeIntegration: true
    },
    show: false
  });
  mainWindow.maximize();
  mainWindow.show();
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/angular-dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  mainWindow.webContents.openDevTools({
    mode: 'bottom'
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
