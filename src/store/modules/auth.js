import Vue from 'vue';
import { setApiBaseURL } from '@/services/API';
import UserHttpService from '@/services/user';
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
	},
	async setServer(context, server) {
		let url = server;

		if (url && !/^(https?:\/\/|\/\/)/i.test(url)) {
			url = `http://${url}`;
		}

		try {
			const { data } = await MiscHttpService.handshake(url);

			if (!data || !data.success) {
				return false;
			}

			//set the axios base URL
			setApiBaseURL(url);

			context.commit('SET_SERVER', url);
			return true;
		} catch (err) {
			Vue.toasted.global.apiError({
				message: 'Failed to connect to the specified server'
			});

			return false;
		}
	},
	async getUserSession(context) {
		context.commit('SET_USER_SESSION', null);

		try {
			const { data } = await UserHttpService.getSession();
			if (data && data.user) {
				context.commit('SET_USER_SESSION', data.user);
			}
			return data;
		} catch (err) {
			return false;
		}
	},
	async login(context, { email, password }) {
		try {
			const { data } = await UserHttpService.login(email, password);
			if (data && data.user) {
				context.commit('SET_USER_SESSION', data.user);
			}
			return data;
		} catch (err) {
			Vue.toasted.global.apiError({
				message: `Login failed: ${err}`
			});
		}
	},
	async signup(context, { email, displayName, password, repeatPassword }) {
		try {
			const { data } = await UserHttpService.signup(email, displayName, password, repeatPassword);
			if (data && data.user) {
				context.commit('SET_USER_SESSION', data.user);
			}
			return data;
		} catch (err) {
			Vue.toasted.global.apiError({
				message: `Signup failed: ${err}`
			});
		}
	},
	/**
	 * Updates the user data
	 * @param {Object} context
	 * @param {Object} formData
	 * @returns {Promise}
	 */
	async updateUser(context, formData) {
		try {
			const { data } = await UserHttpService.updateUser(formData);
			return data;
		} catch (err) {
			Vue.toasted.global.apiError({
				message: `Update user failed: ${err}`
			});
		}
	},
	async logout(context) {
		try {
			await UserHttpService.logout();
			context.commit('SET_USER_SESSION', null);
		} catch (err) {
			Vue.toasted.global.apiError({
				message: `Logout failed: ${err}`
			});
		}
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
