import Vue from 'vue';
import moment from 'moment';
import ConversationHttpService from '@/services/conversation';
import UserHttpService from '@/services/user';
import MessageHttpService from '@/services/message';

const getDefaultState = () => {
	return {
		conversations: [],
		selectedConversation: null,
		users: {}
	};
};

const state = getDefaultState();

const getters = {
	conversations(state) {
		return state.conversations.map((conversation) => {
			const users = conversation.users.map((userId) => {
				return state.users[userId];
			});

			return {
				...conversation,
				users
			};
		});
	},
	conversation(state, getters) {
		return getters.conversations.find((conversation) => {
			return conversation.id === state.selectedConversation;
		});
	},
	conversationMessages(state, getters) {
		return [...getters.conversation.messages].sort((a, b) => {
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
	SET_SELECTED_CONVERSATION(state, conversationId) {
		state.selectedConversation = conversationId;
	},
	SET_USERS(state, users) {
		state.users = users;
	},
	UPDATE_ONLINE_USERS(state, onlineUsers) {
		Object.keys(state.users).forEach((userId) => {
			const online = onlineUsers.includes(parseInt(userId));

			const updatedUser = {
				...state.users[userId],
				online
			};

			Vue.set(state.users, userId, updatedUser);
		});
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
	getConversations(context) {
		return ConversationHttpService.getConversations().then((res) => {
			const conversations = res.data;

			context.commit('SET_CONVERSATIONS', conversations);

			if (conversations && conversations.length > 0) {
				context.commit('SET_SELECTED_CONVERSATION', conversations[0].id);
			}
		}).catch(() => {
			Vue.toasted.global.apiError({
				message: 'Failed to fetch the conversations'
			});
		});
	},
	getUsers(context) {
		return UserHttpService.getUsers().then((res) => {
			const users = res.data ? res.data : [];
			const usersMap = {};

			users.forEach((user) => {
				usersMap[user.id] = user;
			});

			context.commit('SET_USERS', usersMap);
		}).catch(() => {
			Vue.toasted.global.apiError({
				message: 'Failed to fetch the users'
			});
		});
	},
	setSelectedConversation(context, conversationId) {
		context.commit('SET_SELECTED_CONVERSATION', conversationId);
	},
	updateOnlineUsers(context, onlineUsers) {
		context.commit('UPDATE_ONLINE_USERS', onlineUsers);
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

		if (context.state.selectedConversation !== message.conversationId) {
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
