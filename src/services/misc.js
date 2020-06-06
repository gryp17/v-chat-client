
import API from './API';

export default {
	handshake(serverURL) {
		return API.get(`${serverURL}/auth/handshake`);
	}
};
