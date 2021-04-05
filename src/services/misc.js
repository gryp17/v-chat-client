
import API from './API';

export default {
	/**
	 * Sends a ping/handshake request
	 * @param {String} serverURL
	 * @returns {Promise}
	 */
	handshake(serverURL) {
		return API.get(`${serverURL}/auth/handshake`);
	}
};
