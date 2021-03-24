import Vue from 'vue';
import SettingsHttpService from '@/services/settings';

const getDefaultState = () => {
	return {
		showMessageNotifications: false,
		showOnlineStatusNotifications: false
	};
};

const state = getDefaultState();

const mutations = {
	SET_SHOW_MESSAGE_NOTIFICATIONS(state, value) {
		state.showMessageNotifications = value;
	},
	SET_SHOW_ONLINE_STATUS_NOTIFICATIONS(state, value) {
		state.showOnlineStatusNotifications = value;
	}
};

const actions = {
	async getSettings(context) {
		try {
			const { data } = await SettingsHttpService.getSettings();
			context.commit('SET_SHOW_MESSAGE_NOTIFICATIONS', data.showMessageNotifications);
			context.commit('SET_SHOW_ONLINE_STATUS_NOTIFICATIONS', data.showOnlineStatusNotifications);

			return data;
		} catch (error) {
			Vue.toasted.global.apiError({
				message: `get settings failed - ${error}`
			});
		}
	},
	async updateSettings(context, { showMessageNotifications, showOnlineStatusNotifications }) {
		try {
			const { data } = await SettingsHttpService.updateSettings(showMessageNotifications, showOnlineStatusNotifications);
			context.commit('SET_SHOW_MESSAGE_NOTIFICATIONS', data.showMessageNotifications);
			context.commit('SET_SHOW_ONLINE_STATUS_NOTIFICATIONS', data.showOnlineStatusNotifications);

			return data;
		} catch (error) {
			Vue.toasted.global.apiError({
				message: `update settings failed - ${error}`
			});
		}
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
