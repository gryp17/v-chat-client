
import API from './API';

export default {
	/**
	 * Fetches the user settings
	 * @returns {Promise}
	 */
	getSettings() {
		return API.get('/settings');
	},
	/**
	 * Updates the user settings
	 * @param {Boolean} showMessageNotifications
	 * @param {Boolean} showOnlineStatusNotifications
	 * @returns {Promise}
	 */
	updateSettings(showMessageNotifications, showOnlineStatusNotifications) {
		return API.put('/settings', {
			showMessageNotifications,
			showOnlineStatusNotifications
		});
	}
};
