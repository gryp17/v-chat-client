
import API from './API';

export default {
	/**
	 * Sends a new message
	 * @param {Number} conversationId
	 * @param {String} content
	 * @returns {Promise}
	 */
	sendMessage(conversationId, content) {
		return API.post('/message', {
			conversationId,
			content
		});
	},
	/**
	 * Sends a new file message
	 * @param {Object} formData
	 * @returns {Promise}
	 */
	sendFileMessage(formData) {
		return API.post('/message/file', formData);
	},
	/**
	 * Gets messages from the conversation
	 * @param {Number} conversationId
	 * @param {Number} limit
	 * @param {Number} offset
	 * @returns {Promise}
	 */
	getMessages(conversationId, limit, offset) {
		return API.get(`/message?conversationId=${conversationId}&limit=${limit}&offset=${offset}`);
	}
};
