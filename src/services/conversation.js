
import API from './API';

export default {
	getConversations() {
		return API.get('/conversation/all');
	},
	addConversation(userId) {
		return API.post('/conversation', {
			userId
		});
	},
	markAsRead(conversationId) {
		return API.post('/conversation/markAsRead', {
			conversationId
		});
	}
};
