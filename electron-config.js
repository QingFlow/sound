const {
  app,
  BrowserWindow
} = require('electron')
const url = require("url");
const path = require("path");

let mainWindow

function createWindow() {
  console.log('createWindow');
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true, // 隐藏头部菜单
    show: false,
    minWidth: 1500,
    minHeight: 800,
    icon: 'src/assets/images/nest-cloud.ico'
  });
  mainWindow.maximize();
  mainWindow.show();

  mainWindow.setFullScreen = true;
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/angular-dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  // Open the DevTools.
  // mainWindow.webContents.openDevTools({mode: 'bottom'})

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
