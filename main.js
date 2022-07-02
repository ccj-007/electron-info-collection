const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,         //设置窗口宽高
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      backgroundThrottling: false,   //设置应用在后台正常运行
      nodeIntegration: true,     //设置能在页面使用nodejs的API
      contextIsolation: false,  //关闭警告信息
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()  //兼容macos
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()//兼容macos
})