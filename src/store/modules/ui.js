const getDefaultState = () => {
	return {
		activeProcesses: 0,
		focused: true
	};
};

const state = getDefaultState();

const getters = {
	loading(state) {
		return state.activeProcesses > 0;
	}
};

const mutations = {
	ADD_ACTIVE_PROCESS(state) {
		state.activeProcesses++;
	},
	REMOVE_ACTIVE_PROCESS(state) {
		if (state.activeProcesses > 0) {
			state.activeProcesses--;
		}
	},
	SET_FOCUSED(state, focused) {
		state.focused = focused;
	}
};

const actions = {
	/**
	 * Sets the loading state
	 * @param {Object} context
	 * @param {Boolean} loading
	 */
	setLoading(context, loading) {
		const mutation = loading ? 'ADD_ACTIVE_PROCESS' : 'REMOVE_ACTIVE_PROCESS';
		context.commit(mutation);
	},
	/**
	 * Sets the focused state
	 * @param {Object} context
	 * @param {Boolean} focused
	 */
	setFocused(context, focused) {
		context.commit('SET_FOCUSED', focused);
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
