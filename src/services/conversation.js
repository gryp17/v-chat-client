
import API from './API';

export default {
	getConversations() {
		return API.get('/conversation/all');
	},
	markAsRead(conversationId) {
		return API.post('/conversation/markAsRead', {
			conversationId
		});
	}
};
