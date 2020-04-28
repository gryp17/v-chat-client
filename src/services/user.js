
import API from './API';

export default {
	/**
	 * Logs in the user with the provided credentials
	 * @param {String} email
	 * @param {String} password
	 * @returns {Promise}
	 */
	login(email, password) {
		return API.post('/auth/login', {
			email,
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
