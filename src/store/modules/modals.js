const getDefaultState = () => {
	return {
		profileModalOpened: false
	};
};

const state = getDefaultState();

const mutations = {
	SET_PROFILE_MODAL_OPENED(state, opened) {
		state.profileModalOpened = opened;
	}
};

const actions = {
	/**
	 * Shows the profile modal
	 * @param {Object} context
	 */
	showProfileModal(context, userId) {
		context.commit('SET_PROFILE_MODAL_OPENED', true);
		context.dispatch('chat/setSelectedUser', userId, { root: true });
	},
	/**
	 * Hides the profile modal
	 * @param {Object} context
	 */
	hideProfileModal(context) {
		context.commit('SET_PROFILE_MODAL_OPENED', false);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
