
import API from './API';

export default {
	/**
	 * Logs in the user with the provided credentials
	 * @param {String} username
	 * @param {String} password
	 * @returns {Promise}
	 */
	login(username, password) {
		return API.post('/auth/login', {
			username,
			password
		});
	},
	/**
	 * Returns the current user session
	 * @returns {Promise}
	 */
	getSession() {
		return API.get('/auth/session');
	}
};
