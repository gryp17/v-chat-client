
import API from './API';

export default {
	sendMessage(conversationId, content) {
		return API.post('/message', {
			conversationId,
			content
		});
	},
	sendFileMessage(formData) {
		return API.post('/message/file', formData);
	},
	getMessages(conversationId, limit, offset) {
		return API.get(`/message?conversationId=${conversationId}&limit=${limit}&offset=${offset}`);
	}
};
