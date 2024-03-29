
import { app, protocol, BrowserWindow, Menu, ipcMain } from 'electron';
import {
	createProtocol,
	installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib';
import { download } from 'electron-dl';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

//needed for the application notifications
app.setAppUserModelId('com.plamen.vchat');

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

function createWindow() {
	const winUrl = process.env.WEBPACK_DEV_SERVER_URL ? process.env.WEBPACK_DEV_SERVER_URL : 'app://./index.html';

	// Create the browser window.
	win = new BrowserWindow({
		title: 'vChat',
		frame: false,
		minWidth: 450,
		minHeight: 650,
		webPreferences: {
			nodeIntegration: true
		}
	});

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		win.loadURL(winUrl);
		if (!process.env.IS_TEST) win.webContents.openDevTools();
	} else {
		createProtocol('app');
		win.loadURL(winUrl);
	}

	const menu = Menu.buildFromTemplate([
		{
			label: 'Menu',
			submenu: [
				{
					label: 'Reload',
					click() {
						win.loadURL(winUrl);
					}
				},
				{
					label: 'Change server',
					click() {
						win.webContents.send('change-server');
					}
				},
				{
					label: 'Open DevTools',
					click() {
						win.webContents.openDevTools();
					}
				},
				{
					label: 'Exit',
					click() {
						app.quit();
					}
				}
			]
		}
	]);

	Menu.setApplicationMenu(menu);

	ipcMain.on('download-url', async (event, { url, filename }) => {
		const dl = await download(BrowserWindow.getFocusedWindow(), url, {
			saveAs: true,
			filename
		});

		win.webContents.send('download-complete', dl.getSavePath());
	});

	//manually update the focused state instead of using win.isFocused() since isFocused() doesn't work properly (https://github.com/electron/electron/issues/20464)
	win.on('focus', () => {
		win.webContents.send('window-focused', true);
	});

	win.on('blur', () => {
		win.webContents.send('window-focused', false);
	});

	win.on('closed', () => {
		win = null;
	});
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow();
	}
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
	if (isDevelopment && !process.env.IS_TEST) {
		// Install Vue Devtools
		// Devtools extensions are broken in Electron 6.0.0 and greater
		// See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
		// Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
		// If you are not using Windows 10 dark mode, you may uncomment these lines
		// In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
		try {
			await installVueDevtools();
		} catch (e) {
			console.error('Vue Devtools failed to install:', e.toString());
		}
	}
	createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', (data) => {
			if (data === 'graceful-exit') {
				app.quit();
			}
		});
	} else {
		process.on('SIGTERM', () => {
			app.quit();
		});
	}
}
