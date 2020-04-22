const getDefaultState = () => {
	return {
		loading: false
	};
};

const state = getDefaultState();

const mutations = {
	SET_LOADING(state, loading) {
		state.loading = loading;
	}
};

const actions = {
	setLoading(context, loading) {
		context.commit('SET_LOADING', loading);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
