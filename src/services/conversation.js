
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
		return API.post(`/conversation/${conversationId}/read`);
	},
	muteConversation(conversationId, status) {
		return API.post(`/conversation/${conversationId}/muted`, {
			status
		});
	}
};
