import Vue from 'vue';
import API from '@/services/API';
import UserHttpService from '@/services/user';
import MiscHttpService from '@/services/misc';

const getDefaultState = () => {
	return {
		server: null,
		token: null,
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
	SET_TOKEN(state, token) {
		state.token = token;
	},
	SET_USER_SESSION(state, userSession) {
		state.userSession = userSession;
	}
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
			Vue.toasted.global.apiError({
				message: 'Failed to connect to the specified server'
			});

			return false;
		});
	},
	getUserSession(context) {
		context.commit('SET_USER_SESSION', null);

		return UserHttpService.getSession().then((res) => {
			if (res.data && res.data.user) {
				context.commit('SET_USER_SESSION', res.data.user);
			}
			return res;
		}).catch(() => {
			return false;
		});
	},
	login(context, { email, password }) {
		return UserHttpService.login(email, password).then((res) => {
			if (res.data && res.data.token) {
				//set the axios token header
				API.defaults.headers.common.token = res.data.token;

				context.commit('SET_TOKEN', res.data.token);
				context.commit('SET_USER_SESSION', res.data.user);
			}
			return res;
		}).catch((error) => {
			Vue.toasted.global.apiError({
				message: `login failed - ${error}`
			});
		});
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
