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
	},
	SET_ONLINE_USERS(state, onlineUsers) {
		state.onlineUsers = onlineUsers;
	},
	SET_CONVERSATION_USERS(state, { conversationId, users }) {
		state.conversations = state.conversations.map((conversation) => {
			if (conversation.id === conversationId) {
				conversation.users = users;
			}

			return conversation;
		});
	}
};

const actions = {
	setConversations(context, conversations) {
		context.commit('SET_CONVERSATIONS', conversations);
	},
	setConversation(context, conversation) {
		context.commit('SET_CONVERSATION', conversation);
	},
	setOnlineUsers(context, onlineUsers) {
		const users = {};

		onlineUsers.forEach((user) => {
			users[user.id] = user;
		});

		context.commit('SET_ONLINE_USERS', users);
	},
	setConversationUsers(context, data) {
		context.commit('SET_CONVERSATION_USERS', data);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	actions
};
