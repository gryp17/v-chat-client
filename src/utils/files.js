import { ipcRenderer } from 'electron';

/**
 * Opens a save file dialog and downloads the file
 * @param {String} link
 * @param {String} name
 */
async function download(link, name) {
	ipcRenderer.send('download-url', {
		url: link,
		filename: name
	});
}

/**
 * Opens the file (image) in a new window
 * @param {String} link
 */
function openFile(link) {
	window.open(link, '_blank', 'frame=true,nodeIntegration=no');
}

export {
	download,
	openFile
};
