const getDefaultState = () => {
	return {
		activeProcesses: 0
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
	}
};

const actions = {
	setLoading(context, loading) {
		const mutation = loading ? 'ADD_ACTIVE_PROCESS' : 'REMOVE_ACTIVE_PROCESS';
		context.commit(mutation);
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
