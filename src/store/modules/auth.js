import Vue from 'vue';
import { setApiBaseURL, setApiToken } from '@/services/API';
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
	RESET_STATE(state) {
		Object.assign(state, getDefaultState());
	},
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
	resetState(context) {
		context.commit('RESET_STATE');
		setApiBaseURL('');
		setApiToken('');
	},
	setServer(context, server) {
		let url = server;

		if (url && !/^(https?:\/\/|\/\/)/i.test(url)) {
			url = `//${url}`;
		}

		return MiscHttpService.handshake(url).then((res) => {
			if (!res.data || !res.data.success) {
				return false;
			}

			//set the axios base URL
			setApiBaseURL(url);

			context.commit('SET_SERVER', url);
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
				setApiToken(res.data.token);

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
	signup(context, { email, displayName, password, repeatPassword }) {
		return UserHttpService.signup(email, displayName, password, repeatPassword).then((res) => {
			if (res.data && res.data.token) {
				//set the axios token header
				setApiToken(res.data.token);

				context.commit('SET_TOKEN', res.data.token);
				context.commit('SET_USER_SESSION', res.data.user);
			}
			return res;
		}).catch((error) => {
			Vue.toasted.global.apiError({
				message: `signup failed - ${error}`
			});
		});
	},
	logout(context) {
		context.commit('SET_USER_SESSION', null);
		context.commit('SET_TOKEN', null);
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
