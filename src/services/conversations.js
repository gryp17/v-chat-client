
import API from './API';

export default {
	/**
	 * Returns all the user conversations
	 * @returns {Promise}
	 */
	getConversations() {
		return API.get('/conversations');
	}
};
