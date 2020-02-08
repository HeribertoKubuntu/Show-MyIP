const electron = require('electron');
const {
    app,
    Tray,
    Menu,
    BrowserWindow
} = electron;
const path = require('path');
const iconPath = path.join(__dirname, 'icon.png');
let appIcon = null;
let win = null;

const ip = require('ip');
const publicIp = require('public-ip');
var ExternalIP;
var ncp = require('clipboardy');

app.on('ready', () => {
    publicIp.v4().then(eip => {
        ExternalIP = eip;
        win = new BrowserWindow({
            show: false
        });
        appIcon = new Tray(iconPath);
        var contextMenu = Menu.buildFromTemplate([{
                label: "Copy LAN IP: " + ip.address("public"),
                click: function () {
                    ncp.writeSync(ip.address("public"));
                }
            },
            {
                label: "Copy Public IP: " + ExternalIP,
                click: function () {
                    ncp.writeSync(ExternalIP);
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Reload',
                role: 'reload',
                accelerator: 'CommandOrControl+Alt+R',
                click: function () {
                    app.relaunch();
                    app.exit();
                }
            }, 
            {
                label: 'Quit',
                accelerator: 'CommandOrControl+Q',
                selector: 'terminate:',
                click: function () {
                    app.quit();
                    app.exit();
                }
            }
        ]);
        appIcon.setToolTip('View your Network information');
        appIcon.setContextMenu(contextMenu);
    });
})
app.on('quit', () => {
    app.quit();
    app.exit();
})
