
import API from './API';

export default {
	sendMessage(conversationId, content) {
		return API.post('/message', {
			conversationId,
			content
		});
	},
	getMessages(conversationId, limit, offset) {
		return API.get(`/message?conversationId=${conversationId}&limit=${limit}&offset=${offset}`);
	}
};
