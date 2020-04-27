
import API from './API';

export default {
	handshake(serverURL) {
		return API({
			method: 'get',
			url: `${serverURL}/auth/handshake`
		});
	}
};
