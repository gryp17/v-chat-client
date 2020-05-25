const getDefaultState = () => {
	return {
		conversations: [],
		conversation: null,
		onlineUsers: {}
	};
};

const state = getDefaultState();

const mutations = {
	RESET_STATE(state) {
		Object.assign(state, getDefaultState());
	},
	SET_CONVERSATIONS(state, conversations) {
		state.conversations = conversations;
	},
	SET_CONVERSATION(state, conversation) {
		state.conversation = conversation;
	}
};

const actions = {
	setConversations(context, conversations) {
		context.commit('SET_CONVERSATIONS', conversations);
	},
	setConversation(context, conversation) {
		context.commit('SET_CONVERSATION', conversation);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
