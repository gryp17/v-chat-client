import API from '@/services/API';
import MiscHttpService from '@/services/misc';

const getDefaultState = () => {
	return {
		server: null,
		userSession: null
	};
};

const state = getDefaultState();

const getters = {
	isLoggedIn(state) {
		return !!state.userSession;
	}
};

const mutations = {
	SET_SERVER(state, server) {
		state.server = server;
	},
	SET_USER_SESSION(state, userSession) {
		state.userSession = userSession;
	}
};

const dummySession = {
	id: 1,
	username: 'Plamen'
};

const actions = {
	setServer(context, server) {
		return MiscHttpService.handshake(server).then((res) => {
			if (!res.data || !res.data.success) {
				return false;
			}

			//set the axios base URL
			API.defaults.baseURL = server;

			context.commit('SET_SERVER', server);
			return true;
		}).catch(() => {
			return false;
		});
	},
	getUserSession(context) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				context.commit('SET_USER_SESSION', dummySession);
				resolve(dummySession);
			}, 3000);
		});
	},
	login(context, { username, password, rememberMe }) {
		context.commit('SET_USER_SESSION', dummySession);
	},
	logout(context) {
		context.commit('SET_USER_SESSION', null);
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
