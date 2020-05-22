const getDefaultState = () => {
	return {
		conversations: []
	};
};

const state = getDefaultState();

const mutations = {
	RESET_STATE(state) {
		Object.assign(state, getDefaultState());
	},
	SET_CONVERSATIONS(state, conversations) {
		state.conversations = conversations;
	}
};

const actions = {
	setConversations(context, conversations) {
		context.commit('SET_CONVERSATIONS', conversations);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
