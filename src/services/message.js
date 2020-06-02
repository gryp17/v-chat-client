
import API from './API';

export default {
	sendMessage(conversationId, content) {
		return API.post('/message', {
			conversationId,
			content
		});
	}
};
