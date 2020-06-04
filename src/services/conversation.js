
import API from './API';

export default {
	getConversations() {
		return API.get('/conversation/all');
	}
};
