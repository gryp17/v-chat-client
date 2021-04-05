
import API from './API';

export default {
	/**
	 * Returns all conversation
	 * @returns {Promise}
	 */
	getConversations() {
		return API.get('/conversation/all');
	},
	/**
	 * Creates a new conversation
	 * @param {Number} userId
	 * @returns {Promise}
	 */
	addConversation(userId) {
		return API.post('/conversation', {
			userId
		});
	},
	/**
	 * Marks the conversation as read
	 * @param {Number} conversationId
	 * @returns {Promise}
	 */
	markAsRead(conversationId) {
		return API.post(`/conversation/${conversationId}/read`);
	},
	/**
	 * Mutes/Unmutes the conversation
	 * @param {Number} conversationId
	 * @param {Boolean} status
	 * @returns {Promise}
	 */
	muteConversation(conversationId, status) {
		return API.post(`/conversation/${conversationId}/muted`, {
			status
		});
	}
};
