
import API from './API';

export default {
	getSettings() {
		return API.get('/settings');
	},
	updateSettings(showMessageNotifications, showOnlineStatusNotifications) {
		return API.put('/settings', {
			showMessageNotifications,
			showOnlineStatusNotifications
		});
	}
};
