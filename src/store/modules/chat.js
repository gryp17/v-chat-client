import Vue from 'vue';
import moment from 'moment';
import MessageHttpService from '@/services/message';

const getDefaultState = () => {
	return {
		conversations: [],
		conversation: null,
		onlineUsers: {}
	};
};

const state = getDefaultState();

const getters = {
	userIsOnline(state) {
		return (userId) => {
			return state.onlineUsers.hasOwnProperty(userId);
		};
	},
	conversationMessages(state) {
		return [...state.conversation.messages].sort((a, b) => {
			return moment(a.createdAt) - moment(b.createdAt);
		});
	}
};

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
	},
	ADD_CONVERSATION_MESSAGE(state, message) {
		state.conversations.forEach((conversation) => {
			if (conversation.id === message.conversationId) {
				conversation.messages.push(message);
			}
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
	},
	sendMessage(context, { conversationId, content }) {
		return MessageHttpService.sendMessage(conversationId, content).catch(() => {
			Vue.toasted.global.apiError({
				message: 'Failed to send the message'
			});
		});
	},
	messageReceived(context, message) {
		context.commit('ADD_CONVERSATION_MESSAGE', message);

		if (context.state.conversation.id !== message.conversationId) {
			//TODO: NOTIFY THE USER ABOUT NEW MESSAGES...
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
