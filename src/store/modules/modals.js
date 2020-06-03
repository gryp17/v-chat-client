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

		//TODO: call an action from the chat module that will fetch the user data for this ID
		//TODO: think of a way to fetch all user accounts and map them instead of fetching them every time...
		console.log(userId);
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
